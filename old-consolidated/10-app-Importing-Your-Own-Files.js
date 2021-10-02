// When we require we need to assign to a variable
// People typically use the same variabel name each time to make it simpler
const fs = require('fs')

// Require relative file
const add = require('./utils')
const getNotes = require('./notes')

fs.writeFileSync('notes.txt', 'This file was created by Brian!')

// Challenge: Append a message to notes.txt
// appendFileSync is the method

fs.appendFileSync('notes.txt', '\n\nI added in some additional text')

// All files have thier own namespace even if we use require
// Need to export it first
console.log(add(1, 33))

console.log(getNotes())