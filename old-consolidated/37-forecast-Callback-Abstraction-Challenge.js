// Import npm libraries
const request = require('postman-request');

const accessKey = '2cfb220feffc136cfeded7206f438228'
const units = 'm'

const forecast = (longitude, latitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=${accessKey}&query=${latitude},${longitude}&units=${units}`

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to weather service', undefined)
    } else if (response.body.error) {
      callback('Unable to find location', undefined)
    } else {
      callback(undefined, {
        description: response.body.current.weather_descriptions[0],
        temp: response.body.current.temperature,
        feelsLike: response.body.current.feelslike
      })
    }
  })
}

module.exports = forecast