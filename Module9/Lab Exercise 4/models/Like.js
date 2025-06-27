const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const likeSchema = new Schema({
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
  comment_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "comment",
    required: false,
  },
  created_at: { type: Date, default: Date.now },
});

// Compound index to prevent duplicate likes
// This allows: 1 post like + multiple comment likes per user per post
likeSchema.index({ user_id: 1, post_id: 1, comment_id: 1 }, { unique: true });

module.exports = mongoose.model("like", likeSchema);
