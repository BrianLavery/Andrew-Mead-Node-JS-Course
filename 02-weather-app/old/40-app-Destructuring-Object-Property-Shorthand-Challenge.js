// Import npm libraries
const chalk = require('chalk')

// Import local files / functions
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Get user input from command line argument
const address = process.argv[2]

if (!address) {
  console.log(chalk.red.bold('Please provide an address'))
} else {
  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      // Use return here to stop the function at this point if an error
      return console.log(chalk.red.bold('Error: ', error))
    } 
      
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return console.log(chalk.red.bold('Error: ', error))
      }
      
      console.log(location)
      console.log(forecastData)
    })
  })
}
