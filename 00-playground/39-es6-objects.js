// Object property shorthand
// name is the example below

const name = 'Andrew'
const userAge = 27

const user = {
  name,
  age: userAge,
  location: 'Philadelphia'
}

console.log(user)

// Object destructuring
// Useful when want to access properties from an object

const product = {
  label: 'Red notebook',
  price: 3,
  stock: 201,
  salePrice: undefined
}

// Naming of the variables matters
// Can rename (colon syntax)
// Can set up a default value in case no matching value (see rating)
const { label: productLabel, stock, rating = 5 } = product
console.log(productLabel)
console.log(stock)
console.log(rating)

// Can destructure in the function line
const transaction = (type, { label, stock }) => {
  console.log(type, label, stock)
}

transaction('order', product)