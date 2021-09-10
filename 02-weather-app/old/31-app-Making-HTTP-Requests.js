// Import npm libraries
const request = require('postman-request');

const accessKey = '2cfb220feffc136cfeded7206f438228'
const latitude = '37.8267'
const longitude = '-122.4233'
const units = 'm'

const url = `http://api.weatherstack.com/current?access_key=${accessKey}&query=${latitude},${longitude}&units=${units}`

request({ url: url }, (error, response) => {
  const data = JSON.parse(response.body)
  console.log(data.current)
})