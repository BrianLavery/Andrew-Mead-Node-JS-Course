const socket = io() // We use this to connect to the server

// event name below must match the server event name exactly
// Callback takes in variables we can send
socket.on('countUpdated', (count) => {
    console.log('The count has been updated')
    console.log(`Count: ${count}`)
})

document.querySelector('#increment').addEventListener('click', () => {
    console.log('clicked')
    socket.emit('increment') // Don't need to send data across here
})