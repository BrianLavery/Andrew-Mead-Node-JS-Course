// Import core modules
const path = require('path')

// Require npm modules and set up express function as app
const express = require('express')

// Express function setup
const app = express()

// Set a path for public director
// Can define a custom views path
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates')

// We connect express to handlebars for dynamic templates
// Set a custom location for the views
app.set('view engine', 'hbs')
app.set('views', viewsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// Route for homepage - dynamic
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Andrew Mead'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Andrew Mead'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'This is the help page. Send a message for help'
  })
})

app.get('/weather', (req, res) => {
  res.send({
    location: 'Philadelphia',
    forecast: 'Overcast: Temp is 18 degrees outside. It feels like 18 degrees'
  })
})


// Start server using this one app
// We pass in the port as the argument
app.listen(3000, () => {
  // Message is for person running the app
  console.log('Server started on port 3000')
})