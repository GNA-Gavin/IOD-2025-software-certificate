const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// I was considering a schemaless approach that would allow both regular and enhanched posts in the same collection
// It seems like that is probably not the best practice? 

const postSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  title: { type: String, trim: true, required: true, maxlength: 255 },
  description: { type: String, trim: true, required: true },
  image_url: { type: String, trim: true, default: "" },
  // Weather integration fields
  city: { type: String, trim: true, default: "" },
  weather_temperature: { type: String, trim: true, default: "" },
  weather_description: { type: String, trim: true, default: "" },
  weather_wind: { type: String, trim: true, default: "" },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("post", postSchema);
