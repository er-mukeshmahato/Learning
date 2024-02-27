const express = require("express");
const fetchUserDetail = require("../middleware/fetchuserdetail");
const Notes = require("../models/Notes");
const router = express.Router();
const { body, validationResult } = require("express-validator");

// Route 1: Get all notes based on user - GET "/api/note/fetchallnote". Require Auth.
router.get("/fetchallnote", fetchUserDetail, async (req, res) => {
  try {
    // Fetch all notes for the authenticated user
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route 2: Create a note - POST "/api/note/addnote". Require Auth.
router.post(
  "/addnote",
  fetchUserDetail,
  [
    body("title")
      .exists()
      .isLength({ min: 4 })
      .withMessage("Title cannot be blank and must be valid."),
    body("description")
      .isLength({ min: 6 })
      .withMessage("Description must be at least 6 characters."),
  ],
  async (req, res) => {
    try {
      // Validate request body
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.error("Validation Errors:", errors.array());
        return res.status(400).json({
          errors: errors.array().map((error) => ({ msg: error.msg })),
        });
      }

      // Destructure the properties from req.body
      const { title, description, tag } = req.body;

      // Create a new note for the authenticated user
      const newNote = await Notes.create({
        title,
        description,
        tag,
        user: req.user.id,
      });

      res.json(newNote);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);



// Route 3: Update a note - Update "/api/note/updatenote/:id". Require Auth.
router.put(
  "/updatenote/:id",
  fetchUserDetail,
  [
    body("title")
      .exists()
      .isLength({ min: 4 })
      .withMessage("Title cannot be blank and must be valid."),
    body("description")
      .isLength({ min: 6 })
      .withMessage("Description must be at least 6 characters."),
  ],
  async (req, res) => {
    try {
      // Validate request body
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.error("Validation Errors:", errors.array());
        return res.status(400).json({
          errors: errors.array().map((error) => ({ msg: error.msg })),
        });
      }

      // Destructure the properties from req.body
      const { title, description, tag } = req.body;

      // Create an object to store the updated note properties
      const updatedNote = {};

      // Populate the updatedNote object with non-empty properties
      if (title) updatedNote.title = title;
      if (description) updatedNote.description = description;
      if (tag) updatedNote.tag = tag;

      // Find the note by ID
      let note = await Notes.findById(req.params.id);

      // Check if the note exists
      if (!note) {
        return res.status(404).send("Note Not Found");
      }

      // Check if the authenticated user owns the note
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
      }

      // Update the note in the database and get the updated document
      note = await Notes.findByIdAndUpdate(
        req.params.id,
        { $set: updatedNote },
        { new: true }
      );

      // Respond with the updated note
      res.json(note);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// Route 4: Delete an existing note - Delete "/api/note/deletenote/:id". Require Auth.
router.delete(
  "/deletenote/:id",
  fetchUserDetail,
  async (req, res) => {
    try {
      // Find the note by ID
      let note = await Notes.findById(req.params.id);

      // Check if the note exists
      if (!note) {
        return res.status(404).json({ error: "Note Not Found" });
      }

      // Check if the authenticated user owns the note
      if (note.user.toString() !== req.user.id) {
        return res.status(401).json({ error: "Not Allowed" });
      }

      // Delete the note from the database
      await Notes.findByIdAndDelete(req.params.id);

      // Respond with a success message
      res.json({ success: "Note has been deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

module.exports = router;
