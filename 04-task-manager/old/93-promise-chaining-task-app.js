require('../src/db/mongoose')
const User = require('../src/models/user')


// There are a few methods to update - some return object, some do not. find returns object
// We don't need to use the set operator to update in Mongoose
  User.findByIdAndUpdate('6144462cda3eb921e3463d3b', { age: 18 }).then((user) => {
    console.log(user)
    // We return a Promise to keep chaining
    return User.countDocuments({ age: 18 })
  }).then((result) => {
    console.log(result)
  }).catch((e) => {
    console.log(e)
  })