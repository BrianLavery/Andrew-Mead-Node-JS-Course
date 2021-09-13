// We create a new promise like this - typically libraries create them not the developer
// Promise takes a single argument - a function that is called by the Promise API
const doWorkPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        const num = Math.random()
        if (num > 0.5) {
            resolve([7, 4, 1])
        } else {
            reject('Shit went wrong in this promise')
        }
    }, 2000)
})

// A promise is an object with methods available to it
// .then() is the common method. It has access to the data the promise was resolved with
// We use then for the result and catch will take in any errors
doWorkPromise.then((result) => {
    console.log('Success! ', result)
}).catch((error) => {
    console.log('Error: ', error)
})

// Promises make it easier to write the conditional logic in the functions after
// Promises we provide separate functions for different tasks
// In Promises we can't call both reject and resolve
// In Promises we can't call a reject or a resolve more than once