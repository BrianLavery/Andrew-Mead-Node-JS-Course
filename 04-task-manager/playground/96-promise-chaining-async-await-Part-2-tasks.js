require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('6144328e4a392815474f5f92').then((task) => {
//   console.log(task)
//   return Task.countDocuments({ completed: false })
// }).then((result) => {
//   console.log(result)
// }).catch((e) => {
//   console.log(e)
// })

const deleteTaskAndCount = async (id) => {
  const task = await Task.findByIdAndDelete(id) // We don't need the variable here - could just call RHS
  const count = await Task.countDocuments({ completed: false })
  return { task, count }
}

deleteTaskAndCount('6144c7165ba83f195990c608').then((data) => {
  console.log(data)
}).catch((e) => {
  console.log(e)
})
 