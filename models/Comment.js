var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
  body: String,
  author: String,
  tags: { type: Array, default: [] },
  fact: { type: mongoose.Schema.Types.ObjectId, ref: 'Fact' }
});

mongoose.model('Comment', CommentSchema);