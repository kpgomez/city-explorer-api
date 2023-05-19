'use strict'

const axios = require('axios');
const cache = require('./cache'); // I remmbered, yay!

//because locationiq was moved to backend
function getLocation(req, res, next) {
    const { searchQuery } = req.query;
    const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.LOCATIONIQ_KEY}&q=${searchQuery}&format=json`;

    //unique identifier for the cache
    const key = 'location' + searchQuery;

    console.log(cache);

    //checking if cache with key exists
    if (cache[key] && (Date.now() - cache[key].timestamp < 900000)) {
        console.log('cache hit - sending data from cache');
        res.status(200).send(cache[key].data)
    } else {
        console.log('cache miss - making a new request to the API');
        let config = { headers: { Referer: process.env.SERVER_URL } }; //got help from Roger
        axios.get(url, config)
            .then(response => {
                cache[key] = {};
                cache[key].data = response.data[0];
                cache[key].timestamp = Date.now();
                res.status(200).send(response.data) //help from instructor
                console.log(cache[key].data)
            })
            .catch(error => next(error));
    }

}

module.exports = getLocation;