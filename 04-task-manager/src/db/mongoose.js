const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true, // Means mongoose creates indexes (indices?) for us
    useFindAndModify: false // Prevents a repeat warning showing up constantly
})
