const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=d1c1a2729615eba805b928bdfba98e5c&query=' + latitude + ',' + longitude
    // + '&units=f'

    //here url is the shortand syntax as variable and value both are same name
    request({ url, json: true }, (error, { body } = {}) => {

        // request({ url: weather_url, json: true }, (error, { body } = {}) => {

        if (error) {
            callback('unable to connect to weatherstack services', undefined)
        }
        else if (body.error) {
            callback('unable to fetch location', undefined)
        }
        else {
            const { current } = body

            callback(undefined, current.weather_descriptions[0] + '. Its currently ' + current.temperature + ' degrees out. It feels like ' + current.feelslike + ' degrees out')

        }

    })
}

module.exports = forecast