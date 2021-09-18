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

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})
