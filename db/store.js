// fs allows us to read and write to different files.
const fs = require('fs');
// We are using the readFile and writeFile methods from the util package that will help us read and write files.
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
// The uuid package will help us assign unique identifiers to code.
const uuid = require('uuid');


// This class will store all the functions we will need to refer to in other files.
class Store {
    // Will read a note when called. Good for GET requests
    read() {
        return readFileAsync('db/db.json', 'utf-8')
    };
    // Will write a note when called. Good for POST requests
    write(note){
        return writeFileAsync('db/db.json', JSON.stringify(note))
    };
    // Returns all notes currently written
    allNotes(){
        return this.read()
        .then((readNotes) => {
            return JSON.parse(readNotes);
        });
    };
    // Pushes new data to the note array, and assigns it a unique ID. 
    postNote(note){
        note.id = uuid.v4();
        return this.allNotes()
        .then ((data) => {
            data.push(note)
            return data;
        }) .then((updatedData) => {
            return this.write(updatedData);
        }) .then (() => {
            return note
        });
    };
    // Deletes a note using a specific ID that was assigned using uuid.
    deleteNote(noteId){
        return this.allNotes()
        .then((allNotesResult) => {
            return allNotesResult.filter((note) => {
                return note.id !== noteId
            })
        }) .then((updatedData) => {
            return this.write(updatedData);
        })
    }

};

module.exports = new Store()