// Require NPM Libraries
const chalk = require('chalk');
const yargs = require('yargs')

// Require local files
const getNotes = require('./notes')

// NOTES COMMANDS: Add, remove, read, list
// Create add command
yargs.command({
	command: 'add',
	describe: 'Add a new note',
	builder: {
		title: {
			describe: 'Note title',
			// Determines if argument optional or required. Default value is false
			demandOption: true,
			// Enforce value that title value is passed in as
			type: 'string'
		},
		body: {
			describe: 'Note body',
			demandOption: true,
			type: 'string'
		}
	},
	handler: function (argv) {
		console.log('Title: ' + argv.title)
		console.log('Body: ' + argv.body)
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

// Need something like these to get output
// Either works but Andrew used yargs.pase()
yargs.parse()
// yargs.argv
