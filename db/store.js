const fs = require('fs');
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
const uuid = require('uuid');

class Store {
    read() {
        return readFileAsync('db/db.json', 'utf-8')
    };

    write(note){
        return writeFileAsync('db/db.json', JSON.stringify(note))
    };

    allNotes(){
        return this.read()
        .then((readNotes) => {
            return JSON.parse(readNotes);
        });
    };
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

};

module.exports = new Store()