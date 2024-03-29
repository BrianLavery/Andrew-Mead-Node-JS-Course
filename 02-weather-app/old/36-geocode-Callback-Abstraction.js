// Import npm libraries
const request = require('postman-request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1IjoiYnJpYW5sYXZlcnkiLCJhIjoiY2txdnZoc3FkMGljeTJ2bzV3NXkzcW0zZiJ9.o5Z3rvHc18L3s_j63EHs-A&limit=1`
  
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to location services.', undefined)
    } else if (response.body.features.length === 0) {
      callback('Unable to find location. Try another search', undefined)
    } else {  
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name
      })
    }
  })
}

module.exports = geocode