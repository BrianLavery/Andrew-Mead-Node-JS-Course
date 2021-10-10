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

    socket.emit('message', 'Welcome!')

    socket.on('sendMessage', (message) => {
      io.emit('message', message)
    })

})

server.listen(port, () => {
  console.log(`Server is up on port ${port}!`)
})