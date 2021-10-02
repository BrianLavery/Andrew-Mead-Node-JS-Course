const express = require('express')
require('./db/mongoose') //ensures file runs and mongoose connects to database
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

// This one line automatically parses incoming JSON to an object (req.body)
app.use(express.json())

// Create User
app.post('/users', (req, res) => {
  const user = new User(req.body)
  
  user.save().then(() => {
    // Status 201 is created
    res.status(201).send(user)
  }).catch((e) => {
    // We will change the status code in event of an error
    // Need to change status prior to calling res.send
    res.status(400).send(e)
  })
})

// Users index
app.get('/users', (req, res) => {
  User.find({}).then((users) => {
    res.send(users)
  }).catch((e) => {
    res.status(500).send()
  })
})

// Show user
app.get('/users/:id', (req, res) => {
  const _id = req.params.id
  
  // Mongoose automatically converts string IDs into object IDs
  User.findById(_id).then((user) => {
    if (!user) {
      return res.status(404).send()
    }
    
    res.send(user)
  }).catch((e) => {
    res.status(500).send()
  })
})

// Create Task
app.post('/tasks', (req, res) => {
  const task = new Task(req.body)
  
  task.save().then((task) => {
    // Status 201 is created
    res.status(201).send(task)
  }).catch((e) => {
    res.status(400).send(e)
  })
})

// Tasks index
app.get('/tasks', (req, res) => {
  Task.find({}).then((tasks) => {
    res.send(tasks)
  }).catch((e) => {
    res.status(500).send(e)
  })
})

// Show tasks
app.get('/tasks/:id', (req, res) => {
  const _id = req.params.id

  Task.findById(_id).then((task) => {
    if (!task) {
      return res.status(404).send()
    }

    res.send(task)
  }).catch((e) => {
    res.status(500).send(e)
  })
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})
