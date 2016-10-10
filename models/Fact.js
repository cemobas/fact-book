var mongoose = require('mongoose');

var FactSchema = new mongoose.Schema({
  id: Number,
  title: String,
  imp: {type: Number, default: 0},
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

mongoose.model('Fact', FactSchema);