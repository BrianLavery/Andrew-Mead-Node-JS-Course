// async function always return a promise
// The promise is fulfilled by what we define in the function
const doWorkBasic = async () => {
  return 'Andrew' // 
  throw new Error('Testing error')
}

doWorkBasic().then((result) => {
  console.log('Result:', result)
}).catch((e) => {
  console.log('Error:', e)
})


const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (a < 0 || b < 0) {
        return reject('Numbers must be non-negative')
      }
      
      resolve(a + b)
    }, 2000)
  })
}

// Compare this with file 93-promise-chaining.js to see how work without async await
// This below is much simpler, less function calls, much clearer syntax
// This also allows you to have all the values in the same scope (e.g. sum2, sum 3 at same time)
const doWork = async () => {
  // I can simply assign the result to a function
  const sum = await add(1, 99)
  const sum2 = await add(sum, 50)
  const sum3 = await add(sum2, 10)
  return sum3
}

doWork().then((result) => {
  console.log('Result:', result)
}).catch((e) => {
  console.log('Error:', e)
})