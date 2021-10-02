// Import npm libraries
const request = require('postman-request');
const geocode = require('./utils/geocode')

// const accessKey = '2cfb220feffc136cfeded7206f438228'
// const latitude = '37.8267'
// const longitude = '-122.4233'
// const units = 'm'

// const url = `http://api.weatherstack.com/current?access_key=${accessKey}&query=${latitude},${longitude}&units=${units}`

// request({ url: url, json: true }, (error, response) => {
//   if (error) {
//     console.log('Unable to connect to weather service')
//   // Check if we don't have body
//   } else if (response.body.error) {
//     console.log('Unable to find location')
//   } else {
//     const description = response.body.current.weather_descriptions[0]
//     const temp = response.body.current.temperature
//     const feelsLike = response.body.current.feelslike
    
//     console.log(`${description}. It is currently ${temp} degrees out. It feels like ${feelsLike} degrees out.`)
//   }
// })

// const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/los%20angeles.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1IjoiYnJpYW5sYXZlcnkiLCJhIjoiY2txdnZoc3FkMGljeTJ2bzV3NXkzcW0zZiJ9.o5Z3rvHc18L3s_j63EHs-A&limit=1'

// request({ url: geocodeURL, json: true }, (error, response) => {
//   if (error) {
//     console.log('Unable to connect to location services')
//   } else if (response.body.features.length === 0) {
//     console.log('Unable to find location')
//   } else {
//     const latitude = response.body.features[0].geometry.coordinates[1]
//     const longitude = response.body.features[0].geometry.coordinates[0]
  
//     console.log(`Latitude: ${latitude}`)
//     console.log(`Longitude: ${longitude}`)
//   }
// })


// Common with callback you will pass in 2 arguments -a) error, and b) data
geocode('Greenwich london', (error, data) => {
  console.log('Error: ', error)
  console.log('Data: ', data)
})