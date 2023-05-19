'use strict'

//allows us to use environment variables within our application "require" is specific to node.
require('dotenv').config();

//brings in express library and assigns to variable "express". Framework to manage our server, provides all of the functionality to create routes for our API
const express = require('express');

//brings in cors library and assigns to variable "cors". CORS stands for CROSS ORIGIN RESOURCE SHARING. Provides security for requests, controlls access to resources
const cors = require('cors');

const axios = require('axios');

const getLiveWeather = require('./modules/weather');
const getMovies = require('./modules/movies');
const getLocation = require('./modules/location');

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

//route for live weather
app.get('/weather', getLiveWeather);

//route for live movies
app.get('/movies', getMovies);

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
