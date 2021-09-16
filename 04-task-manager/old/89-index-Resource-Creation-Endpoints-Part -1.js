const express = require('express')
require('./db/mongoose') //ensures file runs and mongoose connects to database
const User = require('./models/user')

const app = express()
const port = process.env.PORT || 3000

// This one line automatically parses incoming JSON to an object (req.body)
app.use(express.json())

app.post('/users', (req, res) => {
  const user = new User(req.body)

  user.save().then(() => {
    res.send(user)
  }).catch((e) => {
    // We will change the status code in event of an error
    // Need to change status prior to calling res.send
    res.status(400).send(e)
  })
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})
