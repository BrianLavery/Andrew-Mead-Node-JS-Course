const Task = require('../src/models/task')
const User = require('../src/models/user')
require('../src/db/mongoose') //ensures file runs and mongoose connects to database

const main = async () => {
  const task = await Task.findById('61498d00d183c230f7aeef25')
  await task.populate('user').execPopulate() // This takes the id and returns the whole instance
  console.log(task.user)

  console.log()
  console.log()

  const user = await User.findById('61498c4408412e2fcf337fb0')
  await user.populate('tasks').execPopulate() 
  console.log(user.tasks)
}

main()