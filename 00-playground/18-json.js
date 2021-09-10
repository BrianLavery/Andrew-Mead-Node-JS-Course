const fs = require('fs')

const book = {
  title: 'Ego is the Enemy',
  author: 'Ryan Holiday'
}

const bookJSON = JSON.stringify(book)
console.log(bookJSON)

const parsedData = JSON.parse(bookJSON)
console.log(parsedData.author)

// This return binary data
// fs.writeFileSync('18-json.json', bookJSON)

// const dataBuffer = fs.readFileSync('18-json.json')
// const dataJSON = dataBuffer.toString()
// const data = JSON.parse(dataJSON)

const personBuffer = fs.readFileSync('18-json.json')
const personJSON = personBuffer.toString()
const person = JSON.parse(personJSON)

person.name = 'Mike'
person.age = 28
person.planet = 'Mars'

outputJSON = JSON.stringify(person)
fs.writeFileSync('18-json.json', outputJSON)

