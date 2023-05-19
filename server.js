'use strict'

//allows us to use environment variables within our application "require" is specific to node.
require('dotenv').config();

//brings in express library and assigns to variable "express". Framework to manage our server, provides all of the functionality to create routes for our API
const express = require('express');

//brings in cors library and assigns to variable "cors". CORS stands for CROSS ORIGIN RESOURCE SHARING. Provides security for requests, controlls access to resources
const cors = require('cors');

const axios = require('axios');

//brings in json data
// const weatherData = require('./data/weather.json');

const getLiveWeather = require('./modules/weather');
const getMovies = require('./modules/movies');

//initializes express
const app = express();

//middleware required to use cors aka the bodyguard/gatekeeper. allows open access with cors
app.use(cors());

//sets up the PORT we want our server to run on. here we assign the env variable from .env file to a variable here in our application
const port = process.env.PORT;

//creates default route which includes the / and callback function. request is from our front-end client and response is from back-end to front-end
app.get('/', (request, response) => {
    response.status(200).send('Hey your default route is working')
});

//route for locationIQ
app.get('/search', getLocation)

//because locationiq was moved to backend
async function getLocation(req, res, next) {
    try {
        const { searchQuery } = req.query;
        const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.LOCATIONIQ_KEY}&q=${searchQuery}&format=json`;
        let config = { headers: { Referer: process.env.SERVER_URL } }; //got help from Roger
        const locationResponse = await axios.get(url, config); //help from instructor
        res.send(locationResponse.data);
    }
    catch (error) {
        next(error);
    }
}
//route for live weather
app.get('/weather', getLiveWeather);

//route for live movies
app.get('/movies', getMovies);

// async function getMovies(req, res, next) {
//     try {
//         const { searchQuery } = req.query;
//         const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`;
//         const moviesResponse = await axios.get(url);
//         const formattedMovieData = moviesResponse.data.results.map(movie => new Movie(movie));
//         res.status(200).send(formattedMovieData);
//     }
//     catch (error) {
//         next(error)
//     }
// }



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

//catch-all route
app.get('*', (request, response) => {
    response.status(404).send('Not found');
})

//middleware for error-handling
app.use((error, request, response, next) => {
    response.status(500).send(error.message);
})

//tells the app which port to listen on
app.listen(port, () => console.log(`listening on ${port}`));

//next test thunderclient next http://localhost:3001/ look for message on ln 26
// const city = weatherData.find(city => city.city_name === searchQuery)