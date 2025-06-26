const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    title: { type: String, trim: true, required: true, maxlength: 255 },
    description: { type: String, trim: true, required: true },
    image_url: { type: String, trim: true, default: "" },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("post", postSchema);
