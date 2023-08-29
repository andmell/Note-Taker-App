const express = require('express');

const PORT = 3001;
const app = express();
const noteData = require('./db/db.json');

app.get('/', (req, res) => res.send('Visit http://localhost:3001/api'));

app.get('/api', (req, res) => res.json(noteData));

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
