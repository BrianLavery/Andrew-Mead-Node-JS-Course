const express = require('express')
require('./db/mongoose') //ensures file runs and mongoose connects to database
const User = require('./models/user')
const Task = require('./models/task')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

// Express Middleware allows us to do something in between getting a request and the route handler
// Could do authentication in that part
// We can pass a custom function to app use
// app.use((req, res, next) => {
//   if (req.method === 'GET') {
//     res.send('GET requests are disabled')
//   } else {
//     next()
//   }
// })

// CHALLENGE
// app.use((req, res, next) => {
//   res.status(503).send('The site is updating...we will be back soon')
// })

// This one line automatically parses incoming JSON to an object (req.body)
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})
