const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true // Means mongoose creates indexes (indices?) for us
})

const User = mongoose.model('User', {
    name: {
        type: String,
        // Validate as required
        required: true,
        trim: true
    },
    // Mongoose doesn't have a lot of in-built validation methods
    // But can create custom validation methods ourselves using a validate function
    // We throw errors for issues
    age: {
        type: Number,
        default: 0,
        validate(value) {
          if (value < 0) {
            throw new Error('Age must be a positive number')
          }
        }
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Enter a valid email')
        }
      }
    }
})

// Here we create an instance of user
const me = new User({
  name: '   Andrew    ',
  email: 'MYEMAIL@MEAD.IO      '
})

// To save to database use methods on instance
// save() takes no arguments and returns a promise
// If successful it returns the instance
me.save().then((instance) => {
    console.log(instance)
}).catch((error) => {
    console.log('Error: ', error)
})


// CHALLENGE
const Task = mongoose.model('Task', {
  description: {
    type: String
  },
  completed: {
    type: Boolean
  }
})

// const task = new Task({
//   description: 'Complete this challenge',
//   completed: false
// })

// task.save().then((instance) => {
//   console.log(instance)
// }).catch((error) => {
//   console.log(error)
// })
