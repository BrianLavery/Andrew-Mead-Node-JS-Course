// Import in Mongo Objects
const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
  console.log()

  if (error) {
    return console.log('Unable to connect to database')
  }

  // This gives us the database reference
  db = client.db(databaseName)

  // findOne takes two arguments - an object and a function
  // Object used to specify search criteria
  // We either get back an error or the document
  db.collection('users').findOne({ name: 'Jen' }, (error, user) => {
    if (error) {
      return console.log('Unable to find user')
    }

    console.log(user)
  })

  // If we try to search but do not find we get returned null
  db.collection('users').findOne({ age: 1 }, (error, user) => {
    if (error) {
      return console.log('Unable to find user')
    }

    console.log(user)
  })

  // Find by ID - can't just paste in a string - need an objectID
  db.collection('users').findOne({ _id: new ObjectID("613f5dcc8ef9b922cff7711a") }, (error, user) => {
    if (error) {
      return console.log('Unable to find user')
    }

    console.log(user)
  })

  // Find will return multiple users - doesn't take a callback
  // it returns a cursor that points to places in memory
  // MongoDB assumes that just cause you call it doesn't mean you want the array
  // Find returns a cursor. You can call other methods on that
  // These other methods will take the callback function
  db.collection('users').find({ age: 27 }).toArray((error, users) => {
    console.log(users)
  })

  // Below we have the same find method but different use for cursor
  db.collection('users').find({ age: 27 }).count((error, count) => {
    console.log(count)
  })

  // CHALLENGE
  db.collection('tasks').findOne({ _id: new ObjectID("613f4d743f983d2e51341825") }, (error, task) => {
    console.log(task)
  })

  db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
    console.log(tasks)
  })

})
