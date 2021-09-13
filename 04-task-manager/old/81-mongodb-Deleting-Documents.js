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
  
  // remove is deprecated
  // deleteMany and deleteOne are the key ones now
  // Just provide search criteria
  // Can add multiple criteria into the deleteMany
  db.collection('users').deleteMany({
    age: 27
  }).then((result) => {
    console.log(result.deletedCount)
  }).then((error) => {
    console.log(error)
  })

  // CHALLENGE - DELETE ONE TASK BY DESCRIPTION
  db.collection('tasks')
    .deleteOne({ description: 'Complete video' })
    .then((result) => { console.log(result.deletedCount) })
    .catch((error) => { console.log(error) })

})
  