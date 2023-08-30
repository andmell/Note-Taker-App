const router = require('express').Router();
const store = require('../db/store');

router.get('/notes', (req, res) => {
    store.allNotes()
    .then((allNotes) => {
        return res.json(allNotes);
    })
    .catch((err) => {
        return res.status(500).json(err);
    });
});

router.post('/notes', (req, res) => {
    store.postNote(req.body)
    .then(note => res.json(note))
    .catch((err) => {
        return res.status(500).json(err);
    });
});

module.exports = router;