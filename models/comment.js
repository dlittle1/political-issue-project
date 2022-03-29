const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  body: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Comment', commentSchema);
