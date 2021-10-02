require('../src/db/mongoose')
const User = require('../src/models/user')


// OLD APPROACH
// User.findByIdAndUpdate('6144462cda3eb921e3463d3b', { age: 18 }).then((user) => {
//   console.log(user)
//   // We return a Promise to keep chaining
//   return User.countDocuments({ age: 18 })
// }).then((result) => {
//   console.log(result)
// }).catch((e) => {
//   console.log(e)
// })

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age }) // Seems like the variable is assigned to value prior to update
  const count = await User.countDocuments({ age })
  return { user, count }
}

updateAgeAndCount('6144462cda3eb921e3463d3b', 21).then((data) => {
  console.log(data)
}).catch((e) => {
  console.log(e)
})