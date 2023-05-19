'use strict'

const axios = require('axios');
const cache = require('./cache');

function getLiveWeather(req, res, next) {
    const { lat, lon } = req.query;
    const url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}`;

    const key = `lat${lat}-lon${lon}`;

    console.log(cache);

    if (cache[key] && (Date.now() - cache[key].timestamp < 30000)) {
        console.log('cache hit - sending data from cache');
        res.status(200).send(cache[key].data);
    } else {
        console.log('cache miss - making a new request to the API');
        axios.get(url)
            .then(response => {
                cache[key] = {};
                cache[key].data = response.data;
                cache[key].timestamp = Date.now();
                response.data.data.map(day => new Forecast(day));
                console.log(cache[key].data);
            })
            // .then(response => response.data.data.map(day => new Forecast(day)))
            .then(formattedWeatherResponse => res.status(200).send(formattedWeatherResponse))
            .catch(error => next(error))
    }
}

//this class is used to format the weather data
class Forecast {
    constructor(obj) {
        this.date = obj.datetime;
        this.description = `Low of ${obj.low_temp}, high of ${obj.high_temp} with ${obj.weather.description}`;

    }
}

module.exports = getLiveWeather;