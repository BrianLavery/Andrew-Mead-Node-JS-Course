const express = require('express')
require('./db/mongoose') //ensures file runs and mongoose connects to database
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

// This one line automatically parses incoming JSON to an object (req.body)
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


//**********************************
// PLAYGROUND FILES

const multer = require('multer')
const upload = multer({
  dest: 'images',
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) { // Documentation here https://www.npmjs.com/package/multer
    if (!file.originalname.match(/\.(doc|docx)$/)) {
      return cb(new Error('Please upload a Word document'))
    }

    cb(undefined, true)
  }
})

const errorMiddleware = (req, res, next) => { // We could use this as second argument in app.post to test error throwing
  throw new Error('From my middleware')
}

app.post('/upload', upload.single('upload'), (req, res) => {
  res.send()
}, (error, req, res, next) => { // This is a function to handle errors so we get JSON
  res.status(400).send({ error: error.message })
})


// PLAYGROUND FILES
//**********************************


app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})
