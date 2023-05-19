'use strict'

const axios = require('axios');

function getLiveWeather(req, res, next) {
    const {lat, lon} = req.query;
    const url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}`;
    axios.get(url)
        .then(response => response.data.data.map(day => new Forecast(day)))
        .then(formattedWeatherResponse => res.status(200).send(formattedWeatherResponse))
        .catch(error => next(error))
}

//this class is used to format the weather data
class Forecast {
    constructor(obj) {
        this.date = obj.datetime;
        this.description = `Low of ${obj.low_temp}, high of ${obj.high_temp} with ${obj.weather.description}`;

    }
}

module.exports = getLiveWeather;