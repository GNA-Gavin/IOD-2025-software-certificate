const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "post",
    required: true,
  },
  content: { type: String, trim: true, required: true },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("comment", commentSchema);
