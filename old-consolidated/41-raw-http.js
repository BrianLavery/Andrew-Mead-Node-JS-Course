// Load core modules
const http = require('http')
const url = `http://api.weatherstack.com/current?access_key=2cfb220feffc136cfeded7206f438228&query=40,-75&units=m`

const request = http.request(url, (response) => {
  let data = ''

  // This is a handler/ listener as http could come in chunks
  // This is the beginning event - could happen one or multiple times
  response.on('data', (chunk) => {
    data = data + chunk.toString()
  })

  // This listens for the response completing with all chunks together
  response.on('end', () => {
    const body = JSON.parse(data)
    console.log(body)
  })
})

// This is our listener for an error
request.on('error', (error) => {
  console.log('An error: ', error)
})

// This is where the reuqest gets fired
request.end()