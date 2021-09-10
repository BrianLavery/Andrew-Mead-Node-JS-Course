// Import module
const fs = require('fs')

// Import npm libraries
const chalk = require('chalk');

const addNote = (title, body) => {
  const notes = loadNotes()
  // Find returns as soon as it finds a duplicate - doesn't do entire loop unless can't find
  const duplicateNote = notes.find(note => note.title === title)
  
  // If we use filter we will loop through entire array even once we find duplicate
  // const duplicateNotes = notes.filter(note => note.title === title)

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body
    })
  
    saveNotes(notes)
    
    console.log(chalk.bgGreen('New note added'))
  } else {
    console.log(chalk.bgRed('Note title taken'))
  }
}

const removeNote = (title) => {
  const notes = loadNotes()

  const notesToKeep = notes.filter(note => note.title !== title)

  // Check if arrays are same length - if they are no note removed, else we know a note was removed
  if (notesToKeep.length === notes.length) {
    console.log(chalk.bgRed('No note found'))
  } else {
    saveNotes(notesToKeep)
    console.log(chalk.bgGreen('Note successfully removed'))
  }
}

const listNotes = () => {
  const notes = loadNotes()
  
  console.log(chalk.blue.bold.underline('Your notes'))

  notes.forEach((note) => {
    console.log(note.title)
  })
}

const readNote = (title) => {
  const notes = loadNotes()
  const note = notes.find(note => note.title === title)

  if (note) {
    console.log(`${chalk.blue.bold.underline(note.title)}: ${note.body}`)
  } else {
    console.log(chalk.red.bold('No note found.'))
  }
}

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes)
  fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  } catch (e) {
    return []
  }
}

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
}