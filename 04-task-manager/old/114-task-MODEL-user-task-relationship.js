const mongoose = require('mongoose')

const Task = mongoose.model('Task', {
  description: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, // We use this to say it's an ObjectID
    required: true,
    ref: 'User' // This is how we set up an association
  }
})

module.exports = Task