const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    lowercase: true,
    maxlength: 100,
  },
  password: { type: String, required: true },
  profile_picture_url: { type: String, trim: true, default: "" },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("user", userSchema);
