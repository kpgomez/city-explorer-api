'use strict'

//allows us to use environment variables within our application "require" is specific to node.
require('dotenv').config();

//brings in express library and assigns to variable "express". Framework to manage our server, provides all of the functionality to create routes for our API
const express = require('express');

//brings in cors library and assigns to variable "cors". CORS stands for CROSS ORIGIN RESOURCE SHARING. Provides security for requests, controlls access to resources
const cors = require('cors');

//brings in json data
const weatherData = require('./data/weather.json');

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

//second route to read the static data
//for netlify as our front-end, replace localhost:3001 with http://render-app-name/weatherData (render is our host)
app.get('/weather', (request, response) => {
    // console.log(lat, lon, searchQuery);
    //destructuring lns 34-39 represent a more dynamic request/response
    // const {lat, lon, searchQuery} = request.query;
    // // // const searchQuery = request.query.searchQuery; same as above
    
    // const cityData = weatherData.find(data => data.city_name === searchQuery);
    // // console.log(cityData);
    // response.status(200).send(cityData);

    // const latData = weatherData.find(data => data.lat === lat);
    // console.log(latData);
    // response.status(200).send(latData);

    // const lonData = weatherData.find(data => data.lon === lon);
    // response.status(200).send(lonData);

    // const latData = weatherData.find(lattitude => )
    // if(searchQuery === 'Seattle'){
    //     response.status(200).send(weatherData[0].city_name)
    // }
    // } else if(searchQuery === 'Paris') {
    //     response.status(200).send(weatherData[0].city_name)
    // } else if(searchQuery === 'Amman'){
    //     response.status(200).send(weatherData[0].city_name)
    // } else {
    //     response.status(404).send('We do not have that data')
    // }
    // console.log(request.query); //grabs request object, and reaching into object and retrieving values within query property


    // response.status(200).send(weatherData);

    // ln 65-74 represent static request/responses
    const {lat,lon,searchQuery} = request.query;
    if(searchQuery === 'Seattle'){
        const formattedData = weatherData[0].data.map(obj => new Forecast(obj));
        response.status(200).send(formattedData);
    } 
    if(searchQuery === 'Paris'){
        const formattedData = weatherData[1].data.map(obj => new Forecast(obj));
        response.status(200).send(formattedData);
    }
    if(searchQuery === 'Amman'){
        const formattedData = weatherData[2].data.map(obj => new Forecast(obj));
        response.status(200).send(formattedData);
    }
})

//this class is used for format the data
class Forecast {
    constructor(obj) {
        this.date = obj.valid_date;
        this.description = obj.weather.description;
    }
}

//tells the app which port to listen on
app.listen(port, () => console.log(`listening on ${port}`));

//next test thunderclient next http://localhost:3001/ look for message on ln 26
// const city = weatherData.find(city => city.city_name === searchQuery)