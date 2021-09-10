console.log('Starting')

// Because node is non-blocking it can execute the rest of the code below
// while waiting for these pieces of code to execute
setTimeout(() => {
  console.log('2 second timer')
}, 2000)

// This prints out after the stopping console log
// Look into it in the next video
setTimeout(() => {
  console.log('0 second timer')
}, 0)

console.log('Stopping')