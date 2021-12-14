const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const Notes = require("../models/Notes");
const { body, validationResult } = require('express-validator');


//ROUTE:1 Fetch all Notes using GET "api/notes/fetchallnotes" Login Reqd
//fetchuser is a middleware
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
})


//ROUTE:2 Add Notes using POST "api/notes/addnotes" Login Reqd
//fetchuser is a middleware
router.post('/addnotes', fetchuser, [
    body('title', 'Enter a valid Title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {

    try {
        const { title, description, tag, } = req.body;
        //Bad Request then return Error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();
        res.json(savedNote);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
})

//ROUTE:3 Update Notes using POST "api/notes/updatenote" Login Reqd
//fetchuser is a middleware
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;

    //now create a new note object for new npte
    const newNote = {};
    if (title) { newNote.title = title };
    if (description) { newNote.description = description };
    if (tag) { newNote.tag = tag };

    // now find user by id and then update it
    let note = await Notes.findById(req.params.id);

    if (!note) { return res.status(404).send("Not Found") };

    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
    res.json({ note });



})

module.exports = router;