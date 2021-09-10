// Require NPM Libraries
const chalk = require('chalk');
const yargs = require('yargs')

// Require local files
const notes = require('./notes')

// NOTES COMMANDS: Add, remove, read, list
// Create add command
yargs.command({
	command: 'add',
	describe: 'Add a new note',
	builder: {
		title: {
			describe: 'Note title',
			demandOption: true,
			type: 'string'
		},
		body: {
			describe: 'Note body',
			demandOption: true,
			type: 'string'
		}
	},
	handler: (argv) => {
		notes.addNote(argv.title, argv.body)
	}
})

// Create remove comamnd
yargs.command({
	command: 'remove',
	describe: 'Remove a note',
	builder: {
		title: {
			describe: 'Note title',
			demandOption: true,
			type: 'string'
		}
	},
	handler: (argv) => {
		notes.removeNote(argv.title)
	}
})

// Create list command
yargs.command({
	command: 'list',
	describe: 'List all notes',
	handler: () => {
		notes.listNotes()
	}
})

// Create read command
yargs.command({
	command: 'read',
	describe: 'Read a note',
	builder: {
		title: {
			describe: 'Note title',
			demandOption: true,
			type: 'string'
		}
	},
	handler: (argv) => {
		notes.readNote(argv.title)
	}
})

// Need something like these to get output
// Either works but Andrew used yargs.pase()
yargs.parse()
// yargs.argv
