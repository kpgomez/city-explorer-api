'use strict'

const axios = require('axios');

function getMovies(req, res, next) {
    const {searchQuery} = req.query;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`;
    axios.get(url)
        .then(response => response.data.results.map(movie => new Movie(movie)))
        .then(formattedMoviesResponse => res.status(200).send(formattedMoviesResponse))
        .catch(error => next(error))
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