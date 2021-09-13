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
  
  // updateOne returns a promise if no callback passed in
  // We don't update fields directly in the second argument - we do via operators
  const updatePromise = db.collection('users').updateOne({ _id: new ObjectID('613f5dcc8ef9b922cff7711f') }, {
    $set: {
      name: 'Mike'
    }
  })
  
  updatePromise.then((result) => {
    console.log(result)
  }).catch((error) => {
    console.log(error)
  })
  
  // We can also chain all of this together
  // Increment operator allows us to do all of it at once
  db.collection('users').updateOne({ _id: new ObjectID('613f5dcc8ef9b922cff7711f') }, {
    $inc: {
      age: 1
    }
  }).then((result) => {
    console.log(result)
  }).catch((error) => {
    console.log(error)
  })
  
  // CHALLENGE - updateMany
  db.collection('tasks').updateMany({ 
    completed: true
  }, { 
    $set: { 
      completed: false 
    }
  }).then((result) => {
    console.log(result.modifiedCount)
  }).catch((error) => {
    console.log(error)
  })

})
  