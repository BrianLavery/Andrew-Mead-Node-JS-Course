const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()

// Create User
router.post('/users', async (req, res) => {
  const user = new User(req.body)
  
  // Use try/ catch as any error in await means rest of code doesn't run
  try {
    await user.save()
    const token = await user.generateAuthToken()
    res.status(201).send(user)
  } catch (e) {
    res.status(400).send(e)
  }
})

// User sign in
router.post('/users/login', async (req, res) => {
  try {
    // This is a custom function we define
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    res.send({ user, token })
  } catch (e) {
    res.status(400).send()
  }
})

// Users index
// We pass in auth as a function to get it to be run on this route
router.get('/users', auth, async (req, res) => {
  try {
    const users = await User.find({})
    res.send(users)
  } catch (e) {
    res.status(500).send()
  }
})

// Show user
router.get('/users/:id', async (req, res) => {
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
router.patch('/users/:id', async (req, res) => {
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
    // findByIdAndUpdate method bypasses middleware and Mongoose - that's why we had to set runValidators
    // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    // We use the 3 lines of code below to get middleware to run

    const user = await User.findById(req.params.id)

    updates.forEach(update => user[update] = req.body[update])

    await user.save() // This is where middleware gets executed

    if (!user) {
      return res.status(404).send()
    }

    res.send(user)
  } catch (e) {
    res.status(400).send(e)
  }
})

router.delete('/users/:id', async (req, res) => {
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

module.exports = router