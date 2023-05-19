'use strict'

const axios = require('axios');
const cache = require('./cache');

function getMovies(req, res, next) {
    const { searchQuery } = req.query;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`;

    //unique identifier for the cache
    const key = 'movie' + searchQuery;

    console.log(cache);

    if (cache[key] && (Date.now() - cache[key].timestamp < 2629800000)) {
        console.log('cache hit - sending data from cache');
        res.status(200).send(cache[key].data)
    } else {
        console.log('cache miss - making a new request to the API');
        axios.get(url)
            .then(response => {
                cache[key] = {};
                cache[key].data = response.data;
                cache[key].timestamp = Date.now();
                response.data.results.map(movie => new Movie(movie));
                console.log(cache[key].data);
            })
            .then(formattedMoviesResponse => res.status(200).send(formattedMoviesResponse))
            .catch(error => next(error));
            // .then(response => response.data.results.map(movie => new Movie(movie)))
    }
}

//this class is used to format the movie data
class Movie {
    constructor(obj) {
        this.title = obj.title;
        this.overview = obj.overview;
        this.average_votes = obj.vote_average;
        this.total_votes = obj.vote_count;
        this.image_url = `https://image.tmdb.org/t/p/w500${obj.poster_path}`;
        this.popularity = obj.popularity;
        this.released_on = obj.release_date;
    }
}

module.exports = getMovies;