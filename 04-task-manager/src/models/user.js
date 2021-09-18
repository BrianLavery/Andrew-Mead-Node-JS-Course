const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

// We need schema for a bunch of custom methods, e.g. to use bcrypt prior to save, to define custom methodds
const userSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true,
      trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure we have unique values - need to drop database, then restart app for this to work
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

// We are defining a custom method for the model
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })

  if (!user) {
    throw new Error('Unable to login') // Don't be too specific on the error for login
  }

  // Check if passwords match
  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    throw new Error('Unable to login') // Don't be too specific on the error for login
  }

  return user
}

// Have 2 methods available on the Schema
// Pre for pre-event (e.g. validation/ saving), post for post-event
// 2 arguments - a) name of event, b) function to run
// Function needs to be standard not arrow as we bind 'this' => means the document to be saved
// We have access to an argument called next in the function
// Next allows us to know when the process is over so can save user
// can't be when function is over because could have an asyncrhonous process running
userSchema.pre('save', async function (next) {
  const user = this // optional - makes easier to read

  // This if statement checks if we're modifying the password property of user
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }

  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User