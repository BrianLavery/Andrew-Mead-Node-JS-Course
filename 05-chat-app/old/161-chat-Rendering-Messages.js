const socket = io()

// Elements ($ just means we know it's a DOM element - convention)
const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $sendLocationButton = document.querySelector('#share-location')
const $messages = document.querySelector('#messages')

// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML

socket.on('message', (message) => {
    console.log(message)
    const html = Mustache.render(messageTemplate, { message })
    $messages.insertAdjacentHTML('beforeend', html)
})

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault()

    $messageFormButton.setAttribute('disabled', 'disabled')

    const message = e.target.elements.message.value // We second last value references the 'name' attribute
    
    // Emit - we provide event name, data (as many as want), then function to run as event acknowledgement
    socket.emit('sendMessage', message, (error) => {
        $messageFormButton.removeAttribute('disabled') // Re-enable submit button
        $messageFormInput.value = '' // Clear input
        $messageFormInput.focus() // Brings focus back to input
        
        if (error) {
            return console.log(error)
        }
            
        console.log('Message delivered')
    })
})

$sendLocationButton.addEventListener('click', () => {
    
    // If navigator geolocation exists then user can access it
    // If it does not exist they cannot share their location - so we use an if statement
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser')
    }
    
    $sendLocationButton.setAttribute('disabled', 'disabled') // disable button

    // getCurrentPosition is asynchronous but doesn't support the promise API
    // So we use a callback function that gets access to "position" object
    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, () => {
            $sendLocationButton.removeAttribute('disabled') // re-enable button

            console.log('Location shared!')
        })
    }) 
})