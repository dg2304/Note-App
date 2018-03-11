const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

var titltOption ={
  describe :'title of Note',
  demand: true,
  alias :'t'
} ;
var bodyOption= {
  describe : 'Body of Note',
  demand : true,
  alias : 'b'
};
const argv = yargs
   .command('add','Add a new note', {
     title : titltOption,
     body : bodyOption
   })
   .command('list','list all note')
   .command('read','Read a note',{
     title : titltOption
   })
   .command('remove','Remove to note',{
     title: titltOption
   })
   .help()
.argv;
var command = argv._[0];
if (command === 'add') {
var note=  notes.addNote(argv.title, argv.body);
if(note){
  console.log('Note Created');
  notes.logNote(note);
} else {
  console.log('note not created');
}
} else if (command === 'list') {
    var note=  notes.getAll();
    console.log(`printinf ${note.length} note(s).`);
    note.forEach((note)=> notes.logNote(note));
} else if (command === 'read') {
         var note= notes.getNote(argv.title);

    if(note){
      console.log('note found');
      notes.logNote(note);

    }else {
      console.log('note not found');
    }
} else if (command === 'remove') {
  var notes1=  notes.removeNote(argv.title);
  var message= notes1 ? 'note was removed': 'note not found';
  console.log(message);
} else {
  console.log('Command not recognized');
}
