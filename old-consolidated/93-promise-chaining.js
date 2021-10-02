const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b)
    }, 2000)
  })
}

// Basic promise usage
add(1, 2).then((sum) => {
  console.log(sum)
}).catch((e) => {
  console.log(e)
})

// Can do chaining by reusing add again
// More tasks means more nesting, more complex
add(1, 2).then((sum) => {
  add(sum, 5).then((sum2) => {
    console.log(sum2)
  }).catch((e) => {
    console.log(e)
  })
}).catch((e) => {
  console.log(e)
})

// Promise chaining
add(1, 1).then((sum) => {
  return add(sum, 4)
}).then((sum2) => {
  return add(sum2, 4)
}).then((sum3) => {
  console.log(sum3)
}).catch((e) => {
  console.log(e)
})