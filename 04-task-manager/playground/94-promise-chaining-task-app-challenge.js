require('../src/db/mongoose')
const Task = require('../src/models/task')

Task.findByIdAndDelete('6144328e4a392815474f5f92').then((task) => {
  console.log(task)
  return Task.countDocuments({ completed: false })
}).then((result) => {
  console.log(result)
}).catch((e) => {
  console.log(e)
})