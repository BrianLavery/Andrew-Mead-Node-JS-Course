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

  // // Need to pick a collection to insert documents into
  // db.collection('users').insertOne({
  //   name: 'Andrew',
  //   age: 27
  // }, (error, result) => {
  //   if (error) {
  //     return console.log('Unable to insert user')
  //   }

  //   // Result is an object. Ops has array of things inserted
  //   console.log(result.ops)
  // })

  // db.collection('users').insertMany([
  // {
  //   name: 'Jen',
  //   age: 28
  // }, {
  //   name: 'Gunther',
  //   age: 27
  // }
  // ], (error, result) => {
  //   if (error) {
  //     return console.log('Unable to insert documents')
  //   }

  //   console.log(result.ops)
  // })

  // CHALLENGE
  db.collection('tasks').insertMany([
    {
      description: 'Complete video',
      completed: false
    }, {
      description: 'Call mum',
      completed: false
    }, {
      description: 'Go to gym',
      completed: false
    }], (error, result) => {
      if (error) {
        return console.log('Could not insert into tasks')
      }

      console.log(result.ops)
    })

})
