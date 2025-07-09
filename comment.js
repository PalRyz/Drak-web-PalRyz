const express = require('express');
const router = express.Router();
const Comment = require('./Comment');

// Get all comments
router.get('/', async (req, res) => {
  try {
    const comments = await Comment.find().sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Post new comment
router.post('/', async (req, res) => {
  const { name, comment } = req.body;
  const newComment = new Comment({ name, comment });
  try {
    const saved = await newComment.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
