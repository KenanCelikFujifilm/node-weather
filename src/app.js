const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars and views
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

// Home Page
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Kenan',
    });
});

// About Page
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Kenan',
    });
});

// Help Page
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'There is no helping you',
        name: 'Kenan',
    });
});

// Weather page
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send('You must provide an address');
    }

    geocode(req.query.address, (error, { lat, lng, location } = {}) => {
        if (error) {
            return res.send({ error });
        }

        forecast(lat, lng, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address,
            });
        });
    });

    // console.log(data);
    // res.send({
    //     forecast: '',
    //     location: '',
    //     address: req.query.address,
    // });
});

// app.get('/products', (req, res) => {
//     if (!req.query.search) {
//         return res.send({
//             error: 'You must provide a search term',
//         });
//     }

//     res.send({
//         products: [],
//     });
// });

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        name: 'Kenan',
        message: 'Help article not found.',
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        name: 'Kenan',
        message: 'Page not found.',
    });
});

//start server
app.listen(3000, () => {
    console.log('Server is up on port 3000!');
});
