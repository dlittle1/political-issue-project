const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const issueSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  upvotes: {
    type: Number,
    default: 0,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  comments: [
    {
      body: String,
      user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
