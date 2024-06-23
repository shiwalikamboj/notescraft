const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

const router = express.Router();

// ROUTE 1:
// login: fetch all notes
router.get("/fetchnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.status(200).send(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// ROUTE 2:
// login: create new note
router.post(
  "/addnote",
  fetchuser,
  [
    // body data validation
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Enter a valid description").isLength({ min: 4 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      // if there are errors, return bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        user: req.user.id,
        title: title,
        description: description,
        tag: tag,
      });

      const savedNote = await note.save();
      res.status(201).send(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ error: "Internal Server Error" });
    }
  }
);

// ROUTE 3:
// login: update note
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  // extract the title, description and tag from the request body
  const { title, description, tag } = req.body;
  try {
    // create a newNote object
    const newNote = {};
    // if title is not empty, add it to the newNote object
    if (title) {
      newNote.title = title;
    }
    // if description is not empty, add it to the newNote object
    if (description) {
      newNote.description = description;
    }
    // if tag is not empty, add it to the newNote object
    if (tag) {
      newNote.tag = tag;
    }

    // find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    // if note does not exist
    if (!note) {
      return res.status(404).send({ error: "Note Not Found" });
    }

    // check if the requested userId and the note's userId are the same
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send({ error: "Not Authorized" });
    }

    // update the note
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.status(200).send(note);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// ROUTE 4:
// login: delete note
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    // find the note to be deleted and delete it
    let note = await Note.findById(req.params.id);
    // if note does not exist
    if (!note) {
      return res.status(404).send({ error: "Note Not Found" });
    }

    // check if the requested userId and the note's userId are the same
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send({ error: "Not Authorized" });
    }

    // delete the note
    note = await Note.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "Note has been deleted", noteId: note.id });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// ROUTE 5:
// login: delete all notes for a user
router.delete("/deleteallnotes", fetchuser, async (req, res) => {
  try {
    // Delete all notes for the authenticated user
    await Note.deleteMany({ user: req.user.id });
    res.status(200).send({ message: "All notes have been deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

module.exports = router;
