// Node does not support the import keyword
const chalk = require('chalk');
const getNotes = require('./notes')

// process.argv arguments
// '/home/bpl888/.nvm/versions/node/v14.15.0/bin/node' => location of my node executable
// '/home/bpl888/code/courses/20210906-a-mead-node-js/01-Notes-App/app.js' => location of file I'm running
// 'Andrew' => other arguments we pass in (optional)

console.log(process.argv)

const command = process.argv[2]

if (command === 'add') {
	console.log('Adding a note!')
} else if (command === 'remove') {
	console.log('Removing note!')
}
