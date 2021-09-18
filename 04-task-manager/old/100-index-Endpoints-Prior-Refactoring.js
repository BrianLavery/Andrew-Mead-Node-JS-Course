const express = require('express')
require('./db/mongoose') //ensures file runs and mongoose connects to database
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

// This one line automatically parses incoming JSON to an object (req.body)
app.use(express.json())

// Create User
app.post('/users', async (req, res) => {
  const user = new User(req.body)

  // Use try/ catch as any error in await means rest of code doesn't run
  try {
    await user.save()
    res.status(201).send(user)
  } catch (e) {
    res.status(400).send(e)
  }
})

// Users index
app.get('/users', async (req, res) => {
  try {
    const users = await User.find({})
    res.send(users)
  } catch (e) {
    res.status(500).send()
  }
})

// Show user
app.get('/users/:id', async (req, res) => {
  const _id = req.params.id
  
  try {
    const user = await User.findById(_id)
    if (!user) {
      return res.status(404).send()
    }

    res.send(user)
  } catch (e) {
    res.status(500).send()
  }
})

// Update User
app.patch('/users/:id', async (req, res) => {
  // When try to update a property that cannot, e.g. _id
  const updates = Object.keys(req.body) // takes in object and returns array of strings
  const allowedUpdates = ["name", "email", "password", "age"] // Our allowed updates
  // User .every which takes a callback function called on every array item and returns true or false
  // if any item in array is false then function returns false
  const isValidOperation = updates.every(update => allowedUpdates.includes(update))
  
  if (!isValidOperation) {
    return res.status(400).send({error: 'Invalid update(s)!'})
  }
  
  try {
    // The new option returns the new instance of user as opposed to existing one before update
    // runValidators ensures we validate the data
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

    if (!user) {
      return res.status(404).send()
    }

    res.send(user)
  } catch (e) {
    res.status(400).send(e)
  }
})

app.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)

    if (!user) {
      return res.status(404).send()
    }

    res.send(user)
  } catch (e) {
    res.status(500).send()
  }
})

// Create Task
app.post('/tasks', async (req, res) => {
  const task = new Task(req.body)
  
  try {
    await task.save()
    res.status(201).send(task)
  } catch (e) {
    res.status(400).send(e)
  }
})

// Tasks index
app.get('/tasks', async (req, res) => {
  
  try {
    const tasks = await Task.find({})
    res.send(tasks)
  } catch (e) {
    res.status(500).send(e)
  }
})

// Show task
app.get('/tasks/:id', async (req, res) => {
  const _id = req.params.id

  try {
    const task = await Task.findById(_id)

    if (!task) {
      return res.status(404).send()
    }

    res.send(task)
  } catch (e) {
    res.status(500).send(e)
  }
})

app.patch('/tasks/:id', async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['description', 'completed']
  const isValidOperation = updates.every(update => allowedUpdates.includes(update))

  if (!isValidOperation) {
    return res.status(400).send({error: 'Not a valid update'})
  }

  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

    if (!task) {
      return res.status(404).send()
    }

    res.send(task)
  } catch (e) {
    res.status(400).send(e)
  }
})

app.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id)

    if (!task) {
      return res.status(404).send()
    }

    res.send(task)
  } catch (e) {
    res.status(500).send()
  }
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})
