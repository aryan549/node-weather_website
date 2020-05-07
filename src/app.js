const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000 // this port is set by the heroku

//define paths for Express config 
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views locations
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup the static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Anil'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Anil'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Anil',
        message: 'please call to my number for any help'
    })
})
app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Anil',
        error: 'Help article not found'
    })
})

app.get('/weather', (req, res) => {

    //req.query will contail all the queary string values
    if (!req.query.address) {
        return res.send({
            error: 'Please provide some location to search'
        })
    }

    geocode(req.query.address, (error, { latitude, longidue, location } = {}) => { //={} sets to avoid the errors when no data found

        if (error) {
            return res.send({
                error
            })
        }

        forecast(latitude, longidue, (error, forecastdata = 'no weather found') => {

            if (error) {
                return res.send({
                    error
                })
            }


            res.send({
                forecast: forecastdata,
                location: location,
                address: req.query.address
            })


            // res.render('weather', {
            //     title: 'Weather Results',
            //     name: 'Anil',
            //     forecast: forecastdata,
            //     location,
            //     address: req.query.address,
            // })

        })

    })


})


app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Anil',
        error: 'page not found'
    })
})




app.listen(port, () => {
    console.log('server is listening on port ' + port)
})

