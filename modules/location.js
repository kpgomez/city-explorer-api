'use strict'

const axios = require('axios');

//because locationiq was moved to backend
async function getLocation(req, res, next) {
    // try {
    //     const { searchQuery } = req.query;
    //     const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.LOCATIONIQ_KEY}&q=${searchQuery}&format=json`;
    //     let config = { headers: { Referer: process.env.SERVER_URL } }; //got help from Roger
    //     const locationResponse = await axios.get(url, config); //help from instructor
    //     res.send(locationResponse.data);
    // }
    // catch (error) {
    //     next(error);
    // }

    const { searchQuery } = req.query;
    const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.LOCATIONIQ_KEY}&q=${searchQuery}&format=json`;
    let config = { headers: { Referer: process.env.SERVER_URL } }; //got help from Roger
    await axios.get(url, config)
    .then(response => res.status(200).send(response.data[0])); //help from instructor
}

module.exports = getLocation;