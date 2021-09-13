const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    return console.log('Unable to connect to database')
  }

  // This gives us the database reference
  db = client.db(databaseName)

  // Need to pick a collection to insert documents into
  db.collection('users').insertOne({
    name: 'Andrew',
    age: 27
  })
})
