const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true // Means mongoose creates indexes (indices?) for us
})

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
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
    },
    password: {
      type: String,
      required: true,
      minlength: 7,
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes('password')) {
          throw new Error('Your password cannot contain the phrase "password"')
        }
      }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
          if (value < 0) {
            throw new Error('Age must be a positive number')
          }
        }
    }
})

// const me = new User({
//   name: '   Andrew    ',
//   email: 'MYEMAIL@MEAD.IO      ',
//   password: 'rhin'
// })

// me.save().then((instance) => {
//     console.log(instance)
// }).catch((error) => {
//     console.log('Error: ', error)
// })

const Task = mongoose.model('Task', {
  description: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  }
})

const task = new Task({
  description: 'Eat dinner',
  // completed: false
})

task.save().then((instance) => {
  console.log(instance)
}).catch((error) => {
  console.log(error)
})
