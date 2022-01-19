const request = require('request');

const forecast = function (lat, lng, callback) {
    const url = `http://api.weatherstack.com/current?access_key=e103942094070ebcd664839068be76cd&units=f&query=${lat},${lng}`;

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weather services.', undefined);
        } else if (body.error) {
            callback('Unable to find location. Try another search.', undefined);
        } else {
            const data = body.current;
            callback(
                undefined,
                `${data.weather_descriptions[0]}. It is currently ${data.temperature} degress. It feels like ${data.feelslike}.`
            );
        }
    });
};

module.exports = forecast;
