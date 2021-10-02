const bcrypt = require('bcryptjs')

const myFunction = async () => {
  const password = 'Red12345!'
  // hashedPassword is a bcrypt function that returns a promise
  // Number of rounds is how many rounds of encryption we use - more rounds = more secure, but slower
  // 8 is recommended value
  const hashedPassword = await bcrypt.hash(password, 8)

  console.log(password)
  console.log(hashedPassword)

  // This below is how we authenticate
  // We would enter in the typed in password with hashed value from our database
  const isMatch = await bcrypt.compare('Red12345!', hashedPassword)
  console.log(isMatch)
}

myFunction()

// With encryption algorithms we can get the value back
// With hashing algorithms we cannot get the original value back - by design they are reversible
// Hashing algorithms allow you to hash the password and compare that with the hash