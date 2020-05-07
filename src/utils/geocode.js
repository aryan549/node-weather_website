const request = require('request')

const getGeoCode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYW5pbHRodW1tYSIsImEiOiJjazlqeWdqOHkxcGl1M2ZvMWppNzM4N2p1In0.dw_aziTvdVJQgtmwLmVe_g&limit=1'

    request({ url, json: true }, (error, { body } = {}) => { //es6 object destructuring method
        if (error) {
            callback('unable to connect location services', undefined)
        } else if (body.features.length === 0) {
            callback('unable to find the location. pls try another', undefined)
        } else {
            const { features } = body
            callback(undefined, {
                latitude: features[0].center[1],
                longitude: features[0].center[0],
                location: features[0].place_name,
            })
        }

    })

    //basic method 
    // request({ url: map_url, json: true }, (error, response) => { 
    //     if (error) {
    //         callback('unable to connect location services', undefined)
    //     } else if (response.body.features.length === 0) {
    //         callback('unable to find the location. pls try another', undefined)
    //     } else {
    //         callback(undefined, {
    //             latitude: response.body.features[0].center[1],
    //             longitude: response.body.features[0].center[0],
    //             location: response.body.features[0].place_name,
    //         })
    //     }

    // })


}

module.exports = getGeoCode
