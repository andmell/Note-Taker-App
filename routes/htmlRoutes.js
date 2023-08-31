const router = require('express').Router();
const path = require('path');

// A get request is made to /notes
router.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '../public/notes.html'))
);
// A get request is made to all files
router.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '../public/index.html'))
);


module.exports = router;