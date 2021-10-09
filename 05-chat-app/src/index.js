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

let count = 0

// We are listening for an event
io.on('connection', (socket) => {
    console.log('New WebSocket connection')

    // Sends an event from server to client(s)
    // We typically create custom event names
    // We pass additional variables/ events as additional arguments after event name
    // These variables are available in the callback (client side)
    // Name for these can differ between server and client but order matters
    socket.emit('countUpdated', count) 

    // We are listening for the increment event here - call within bigger function so 
    // specific to individual client it comes from
    socket.on('increment', () => {
        count++
        // socket.emit would only emit to a specific connection. To broadcast we use io.emit
        io.emit('countUpdated', count)
    })
})

server.listen(port, () => {
  console.log(`Server is up on port ${port}!`)
})
