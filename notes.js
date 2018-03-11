const fs = require('fs');
var fetchnotes =()=>{
  try {
    var noteString= fs.readFileSync('note-data.json');
    return JSON.parse(noteString);

  }catch(e){
      return[];
  }
};

var saveNotes =(notes)=>{
   fs.writeFileSync('note-data.json',JSON.stringify(notes));

};

var addNote   =(title,body)=>{
  var notes=fetchnotes();
  var note ={
    title,
    body
  };




    var duplicate = notes.filter((note) => note.title===title);

    if(duplicate.length===0)
    {
  notes.push(note);
  saveNotes(notes);
  return note;

}
};
var getAll = () => {
  return fetchnotes();

};

var getNote = (title) => {
 var notes = fetchnotes();
 var filterread= notes.filter((note) => note.title === title);
  return filterread[0];
};

var removeNote = (title) => {
  var notes=fetchnotes();
  var filternotes= notes.filter((note)=>note.title!==title);
  saveNotes(filternotes);
   return notes.length!==filternotes.length;
};

 var logNote =(note) =>{
   debugger;
   console.log('-------');
   console.log(`title: ${note.title}`);
     console.log(`body: ${note.body}`);
 };

module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
  logNote
};
