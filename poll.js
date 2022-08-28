const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const pollSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  totalVote: {
    type: Number,
    default: 0
  },
  option: {
    type: [
      {
        name: String,
        vote: Number,
      },
    ],
  },
});

let poll = mongoose.model("Poll", pollSchema);
module.exports = poll;
