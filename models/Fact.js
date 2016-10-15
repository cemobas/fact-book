var mongoose = require('mongoose');

var FactSchema = new mongoose.Schema({
  id: Number,
  title: String,
  imp: {type: Number, default: 0},
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

FactSchema.methods.upvote = function(cb) {
  this.imp += 1;
  this.save(cb);
};

mongoose.model('Fact', FactSchema);