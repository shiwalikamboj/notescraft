const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');

const router = express.Router();

// ROUTE 1:
// login fetch all notes
router.get('/fetchnotes',fetchuser, async (req,res) => {
    try {
        const notes = await Note.find({user: req.user.id});
        res.status(200).send(notes);
    }
    catch (error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router;