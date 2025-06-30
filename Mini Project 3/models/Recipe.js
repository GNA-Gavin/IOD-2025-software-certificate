const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  // Core recipe data - shared by both APIs
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: "",
  },
  instructions: {
    type: String,
    required: true,
  },
  ingredients: [
    {
      name: String,
      amount: String,
    },
  ],
  category: {
    type: String,
    default: "General",
  },
  cuisine: {
    type: String,
    default: "International",
  },
  image: {
    type: String,
    default: "",
  },
  video: {
    type: String,
    default: "",
  },

  // Source tracking - shared by both APIs
  source: {
    type: String,
    enum: ["TheMealDB", "SampleAPIs", "Manual"],
    required: true,
  },
  sourceId: {
    type: String,
    default: "",
  },
  tags: [String],

  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field before saving
recipeSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Index for better search performance
recipeSchema.index({
  title: "text",
  description: "text",
  category: 1,
  cuisine: 1,
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
