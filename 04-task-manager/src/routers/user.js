const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()

// Create User
router.post('/users', async (req, res) => {
  const user = new User(req.body)
  
  try {
    await user.save()
    const token = await user.generateAuthToken()
    res.status(201).send({ user, token })
  } catch (e) {
    res.status(400).send(e)
  }
})

// User sign in
router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    res.send({ user, token })
  } catch (e) {
    res.status(400).send()
  }
})

// User log out
router.post('/users/logout', auth, async (req, res) => {
  try {
    // Loop through tokens array and filter so we exclude the current token being used for logout
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token
    })
    // Then we save
    await req.user.save()

    res.send() // Will send back a 200
  } catch (e) {
    res.status(500).send() // Send back 500 if didn't work
  }
})

// User logout all sessions
router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = [] // Wipe all tokens
    await req.user.save() // Save user
    res.send() // Send back 200 status
  } catch (e) {
    res.status(500).send() // Send
  }
})

// Show user
router.get('/users/me', auth, async (req, res) => {
  console.log('In the users/me route')
  res.send(req.user)
})

// Update User
router.patch('/users/me', auth, async (req, res) => {
  const updates = Object.keys(req.body) // takes in object and returns array of strings
  const allowedUpdates = ["name", "email", "password", "age"] // Our allowed updates
  const isValidOperation = updates.every(update => allowedUpdates.includes(update))
  
  if (!isValidOperation) {
    return res.status(400).send({error: 'Invalid update(s)!'})
  }
  
  try {
    updates.forEach(update => req.user[update] = req.body[update])
    await req.user.save() // This is where middleware gets executed
    res.send(req.user)
  } catch (e) {
    res.status(400).send(e)
  }
})

// One option is to delete tasks from here but in general better to use middleware
router.delete('/users/me', auth, async (req, res) => {
  try {
    await req.user.remove() // This removes the authenticated user in one command (Mongoose method)
    res.send(req.user)
  } catch (e) {
    res.status(500).send()
  }
})

module.exports = router
