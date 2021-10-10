const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server) 

// Set port and public directory path
const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// Key event listeners
io.on('connection', (socket) => {
    console.log('New WebSocket connection')

    // socket.emit sends only to this connection
    socket.emit('message', 'Welcome!')
    // socket.broadcast.emit sends only to all connections except this one
    socket.broadcast.emit('message', 'A new user has joined!') 

    socket.on('sendMessage', (message) => {
      // io.emit sends to all connections including this one
      io.emit('message', message)
    })

    socket.on('sendLocation', (coords) => {
      io.emit('message', `https://google.com/maps?q=${coords.latitude},${coords.longitude}`)
    })

    // Use code below for a disconnection - it's a built in event
    socket.on('disconnect', () => {
      io.emit('message', 'A user has left')
    })
})

server.listen(port, () => {
  console.log(`Server is up on port ${port}!`)
})
