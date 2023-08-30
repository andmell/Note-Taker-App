const fs = require('fs');
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

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
};

module.exports = new Store()