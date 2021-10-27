const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words') // npm module to check for profanity
const { generateMessage, generateLocationMessage } = require('./utils/messages')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users')

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

    socket.on('join', ({ username, room }, callback) => {
      const { error, user } = addUser({ id: socket.id, username, room })

      if (error) {
        return callback(error)
      }

      // Can only use join method on survey somehow
      // Now we can emit events to only this room
      // io.to.emit - sends to everyone in this room
      socket.join(user.room) // We take this from the cleaned addUser return value
      
      // socket.emit sends only to this connection
      socket.emit('message', generateMessage('Welcome!'))
      // socket.broadcast.emit sends only to all connections except this one
      // socket.broadcast.to.emit - sends to everyone in this room except client sending
      socket.broadcast.to(user.room).emit('message', generateMessage(`${user.username} has joined!`)) 

      callback() // We call this at bottom as acknowlegement if not error
    })

    // We add on the acknowledgement function from the client as a callback here
    socket.on('sendMessage', (message, callback) => {
      const filter = new Filter()

      if (filter.isProfane(message)) {
        return callback('Profanity is not allowed!') // End function if profanity; return error message
      }

      // io.emit sends to all connections including this one
      io.to('Gen').emit('message', generateMessage(message))
      callback() // Can pass in argument
    })

    socket.on('sendLocation', (coords, callback) => {
      io.emit('locationMessage', generateLocationMessage(coords))
      callback()
    })

    // Use code below for a disconnection - it's a built in event
    socket.on('disconnect', () => {
      io.emit('message', generateMessage('A user has left'))
    })
})

server.listen(port, () => {
  console.log(`Server is up on port ${port}!`)
})
