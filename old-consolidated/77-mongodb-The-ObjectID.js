// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// // To get object IDs
// const ObjectID = mongodb.ObjectID

// Destructured version of things above
const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

// ObjectID is a constructor function - new is optional
// Object IDs are global and are unique across databases
// a) 4-bytes representing Unix epoch
// b) 5-byte random value
// 3-byte counter, starting with a random value
const id = new ObjectID()
// ID has an id property that gives the binary value - length shows is 12 bytes
console.log(id.id.length)
// We can compare with the string representation length - it is 24 vs. 12
console.log(id.toHexString().length)

console.log(id.getTimestamp())

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    return console.log('Unable to connect to database')
  }

  // This gives us the database reference
  db = client.db(databaseName)

  // Need to pick a collection to insert documents into
  db.collection('users').insertOne({
    // We can generate our own id but convention is to leave this off
    // IDs are stored as binary data because requires less space than a string
    _id: id,
    name: 'Vikram',
    age: 27
  }, (error, result) => {
    if (error) {
      return console.log('Unable to insert user')
    }

    // Result is an object. Ops has array of things inserted
    console.log(result.ops)
  })

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
  // db.collection('tasks').insertMany([
  //   {
  //     description: 'Complete video',
  //     completed: false
  //   }, {
  //     description: 'Call mum',
  //     completed: false
  //   }, {
  //     description: 'Go to gym',
  //     completed: false
  //   }], (error, result) => {
  //     if (error) {
  //       return console.log('Could not insert into tasks')
  //     }

  //     console.log(result.ops)
  //   })

})
