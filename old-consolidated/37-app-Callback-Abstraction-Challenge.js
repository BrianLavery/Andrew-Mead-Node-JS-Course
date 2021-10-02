// Import local files / functions
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

geocode('Greenwich london', (error, data) => {
  console.log('Error: ', error)
  console.log('Data: ', data)
})

forecast(-0.0118, 51.4778, (error, data) => {
  console.log('Error: ', error)
  console.log('Data: ', data)
})
