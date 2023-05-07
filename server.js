'use strict'

//allows us to use environment variables within our application require" is specific to node
require('dotenv').config();

//brings in express library and assigns to variable "express"
const express = require('express');

//brings in cors library and assigns to variable "cors"
const cors = require('cors');

//brings in json data
const weatherData = require('./data/weather.json');

//initializes express
const app = express();

//middleware required to use cors aka the bodyguard. allows open access with cors
app.use(cors());

//sets up the PORT we want our server to run on. here we assign the env variable from .env file to a variable here in our application
const port = process.env.PORT;

//creates default route which includes the / and callback function
app.get('/', (request, response) => {
    response.status(200).send('Hey your default route is working')
});

//second route
app.get('/weather', (request, response) => {
    // const {lat, lon, searchQuery} = request.query
    // console.log(lat, lon, searchQuery);
    // if(searchQuery === 'Seattle'){
    //     response.status(200).send(weatherData[0].city_name)
    // } else if(searchQuery === 'Paris') {
    //     response.status(200).send(weatherData[0].city_name)
    // } else if(searchQuery === 'Amman'){
    //     response.status(200).send(weatherData[0].city_name)
    // } else {
    //     response.status(404).send('We do not have that data')
    // }
    response.status(200).send(weatherData);
} )

class Forecast {
    constructor(obj){
        this.date = obj.date;
        this.description = obj.description;
    }
}

//tells the app which port to listen on
app.listen(port, () => console.log(`listening on ${port}`));

//next test thunderclient next http://localhost:3001/ look for message on ln 26
// const city = weatherData.find(city => city.city_name === searchQuery)