// Require NPM Libraries
const chalk = require('chalk');
const yargs = require('yargs')

// Require local files
const getNotes = require('./notes')

// Customise yargs version
yargs.version('1.1.0')

// NOTES COMMANDS: Add, remove, read, list
// Create add command
yargs.command({
	command: 'add',
	describe: 'Add a new note',
	builder: {
		title: {
			describe: 'Note title',
		}
	},
	handler: function (argv) {
		console.log('Adding a new note!', argv)
	}
})

// Create remove comamnd
yargs.command({
	command: 'remove',
	describe: 'Remove a note',
	handler: function () {
		console.log('Removing a note')
	}
})

// Create list command
yargs.command({
	command: 'list',
	describe: 'List all notes',
	handler: function () {
		console.log('Listing out all notes')
	}
})

// Create read command
yargs.command({
	command: 'read',
	describe: 'Read a note',
	handler: function () {
		console.log('Reading a note')
	}
})

// Comparison of running: node app.js add --title="Things to buy"
console.log(process.argv) // [  '/home/bpl888/.nvm/versions/node/v14.15.0/bin/node',   '/home/bpl888/code/courses/20210906-a-mead-node-js/01-Notes-App/app.js', 'add', '--title=Things to buy' ]
console.log(yargs.argv) // { _: [ 'add' ], title: 'Things to buy', '$0': 'app.js' }
