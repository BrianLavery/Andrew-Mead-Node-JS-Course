// Import npm libraries
const request = require('postman-request');

const accessKey = '2cfb220feffc136cfeded7206f438228'
const latitude = '37.8267'
const longitude = '-122.4233'
const units = 'm'

const url = `http://api.weatherstack.com/current?access_key=${accessKey}&query=${latitude},${longitude}&units=${units}`

// json: true parses this as json for us
request({ url: url, json: true }, (error, response) => {
  const description = response.body.current.weather_descriptions[0]
  const temp = response.body.current.temperature
  const feelsLike = response.body.current.feelslike
    
  console.log(`${description}. It is currently ${temp} degrees out. It feels like ${feelsLike} degrees out.`)
})
