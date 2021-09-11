// Require npm modules
const express = require('express')

// Express is just one function
const app = express()

// GET method takes in 2 arguments - 1) route, 2) function
// Function arguments: a) Request info, b) Response methods
// These are commonly called a) req and b) res
app.get('', (req, res) => {
  res.send('Hello express!')
})

app.get('/help', (req, res) => {
  res.send('HELP PAGE')
})

app.get('/about', (req, res) => {
  res.send('ABOUT Page')
})

app.get('/weather', (req, res) => {
  res.send('View Weather')
})

// Start server using this one app
// We pass in the port as the argument
app.listen(3000, () => {
  // Message is for person running the app
  console.log('Server started on port 3000')
})