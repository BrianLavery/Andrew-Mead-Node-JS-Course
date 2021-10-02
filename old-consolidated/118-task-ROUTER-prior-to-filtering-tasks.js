const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()

// Create Task
router.post('/tasks', auth, async (req, res) => {
  const task = new Task({
    ...req.body, // Spread operator copies over attributes from req.body
    user: req.user._id // get this from authentication
  })
  
  try {
    await task.save()
    res.status(201).send(task)
  } catch (e) {
    res.status(400).send(e)
  }
})

// Tasks index
router.get('/tasks', auth, async (req, res) => {
  
  try {
    await req.user.populate('tasks').execPopulate()
    res.send(req.user.tasks)
  } catch (e) {
    res.status(500).send(e)
  }
})

// Show task
router.get('/tasks/:id', auth, async (req, res) => {
  const _id = req.params.id

  try {
    const task = await Task.findOne({ _id, user: req.user._id })

    if (!task) {
      return res.status(404).send()
    }

    res.send(task)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.patch('/tasks/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['description', 'completed']
  const isValidOperation = updates.every(update => allowedUpdates.includes(update))

  if (!isValidOperation) {
    return res.status(400).send({error: 'Not a valid update'})
  }

  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id })

    if (!task) {
      return res.status(404).send()
    }

    updates.forEach(update => task[update] = req.body[update])
    await task.save()

    res.send(task)
  } catch (e) {
    res.status(400).send(e)
  }
})

router.delete('/tasks/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id })

    if (!task) {
      return res.status(404).send()
    }

    res.send(task)
  } catch (e) {
    res.status(500).send()
  }
})

module.exports = router