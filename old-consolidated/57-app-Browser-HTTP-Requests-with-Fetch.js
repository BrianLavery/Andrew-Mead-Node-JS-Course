// Fetch is not accessible in Node.js - it's a browser based API
console.log('Client side JavaScript file is loaded')

// Fetch kicks off an asynchronous function much like request in node
// Then is part of promises API
fetch('http://puzzle.mead.io/puzzle').then((response) => {
  response.json().then((data) => {
    console.log(data)
  })
})

fetch('http://localhost:3000/weather?address=Boston').then((response) => {
  response.json().then((data) => {
    if (data.error) {
      console.log(data.error)
    } else {
      console.log(data.location)
      console.log(data.forecast)
    }
  })
})
