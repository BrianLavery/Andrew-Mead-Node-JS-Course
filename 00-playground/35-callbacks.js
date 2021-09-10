// Callback function is a function (C) we pass to another function (A) with intention that
// A calls C at some point (now or in the future)
setTimeout(() => {
  console.log('Two seconds are up')
}, 2000)

// Callback functions aren't always used in syncrhonous examples - see below
const names = ['Andrew', 'Jen', 'Jess']
const shortNames = names.filter((name) => {
  return name.length <= 4
})

console.log(shortNames)

// We are defining a function here that takes another callback function
// For function below if everything is asyncrhonous then we would not use a callback, just return
// But with an asynchronous code it won't work
const geocode = (address, callback) => {
  setTimeout(() => {
    const data = {
      latitutde: 0,
      longitude: 0
    }

    // This doesn't even return to the console - just to the function it is nested in
    // return data
    // instead we call the callback
    callback(data)
  }, 2000)
}

// const data = geocode('Philadelphia')
// console.log(data) // This will log undefined as geocode does not return anything

// Instead we provide a function as a second argument
geocode('Philadelphia', (data) => {
  console.log(data)
})

// CHALLENGE from 'https://links.mead.io/callback'
// Goal: Mess around with the callback pattern
// 1. Define an add function that accepts the correct arguments
// 2. Use setTimeout to simulate a 2 second delay
// 3. After 2 seconds are up, call the callback function with the sum
// 4. Test your work!

const add = (a, b, callback) => {
  const sum = a + b

  setTimeout(() => {
    callback(sum)
  }, 2000)
}

add(1, 4, (sum) => {
  console.log(sum) // Should print: 5
})

add(2, 8, (sum) => {
  const double = sum * 2

  console.log(`${double} = ${sum} x 2`)
})