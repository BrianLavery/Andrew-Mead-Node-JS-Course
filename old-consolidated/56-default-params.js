const greeter = (name = 'user') => {
  console.log(`Hello ${name}`)
}

greeter('Andrew')
greeter()

// We always want default parameters when we destructure in a function
const product = {
  label: 'Red notebook',
  price: 3,
  stock: 201,
  salePrice: undefined
}

product2 = undefined

const transaction = (type, { label, stock } = {}) => {
  console.log(type, label, stock)
}

transaction('order', product) // works as product is an object
transaction('order', product2) // Crashes as it is undefined except we have the default params