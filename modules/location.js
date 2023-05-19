'use strict'

const axios = require('axios');

//because locationiq was moved to backend
function getLocation(req, res, next) {
    const { searchQuery } = req.query;
    const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.LOCATIONIQ_KEY}&q=${searchQuery}&format=json`;
    let config = { headers: { Referer: process.env.SERVER_URL } }; //got help from Roger
    axios.get(url, config)
    .then(response => res.status(200).send(response.data)); //help from instructor
}

module.exports = getLocation;