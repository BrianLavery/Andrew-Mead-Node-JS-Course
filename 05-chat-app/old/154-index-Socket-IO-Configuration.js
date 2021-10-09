const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
 // Create new server and pass app to it (express normally does this behind scenes).
 // We need access to pass to socket io
const server = http.createServer(app)
// We Call the function to configure socket io to work with this server
// It also provides now a file that our client can access
const io = socketio(server) 

// Set port and public directory path
const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// We are listening for an event
io.on('connection', () => {
    console.log('New WebSocket connection')
})

server.listen(port, () => {
  console.log(`Server is up on port ${port}!`)
})
