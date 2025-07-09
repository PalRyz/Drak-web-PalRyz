const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  name: String,
  comment: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Comment', CommentSchema);
