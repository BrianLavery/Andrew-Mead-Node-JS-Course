const socket = io()

socket.on('message', (message) => {
    console.log(message)
})

document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault()

    const message = e.target.elements.message.value // We second last value references the 'name' attribute
    
    socket.emit('sendMessage', message)
})

document.querySelector('#share-location').addEventListener('click', () => {
    // If navigator geolocation exists then user can access it
    // If it does not exist they cannot share their location - so we use an if statement
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser')
    }

    // getCurrentPosition is asynchronous but doesn't support the promise API
    // So we use a callback function that gets access to "position" object
    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }) 
})