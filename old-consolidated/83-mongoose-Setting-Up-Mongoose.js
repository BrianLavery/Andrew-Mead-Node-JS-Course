const mongoose = require('mongoose')

// We add databaseName into the connection url in this one
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true // Means mongoose creates indexes (indices?) for us
})

// We create a model with a capital letter
// Mongoose.model takes 2 arguments
// a) name as string - this impacts the table it saves to (amongst other things?)
// b) definitions, e.g. fields that we pass in as objects that we customise
const User = mongoose.model('User', {
    name: {
        type: String
    },
    age: {
        type: Number
    }
})

// Here we create an instance of user
const me = new User({
    name: 'Andrew',
    age: 27
})

// To save to database use methods on instance
// save() takes no arguments and returns a promise
// If successful it returns the instance
me.save().then((instance) => {
    console.log(instance)
}).catch((error) => {
    console.log('Error: ', error)
})

// --v comes from mongoose and refers to version