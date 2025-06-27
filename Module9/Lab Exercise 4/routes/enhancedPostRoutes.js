const express = require("express");
const router = express.Router();
const Controllers = require("../controller");

// Create post with weather
// POST /api/enhanced-posts/create-with-weather
router.post("/create-with-weather", (req, res) => {
  Controllers.enhancedPostController.createPostWithWeather(req.body, res);
});

// the following endpoints provide the same functionality as the regular posts endpoints
// this was mainly for practice

// Get enhanced post by ID
// GET /api/enhanced-posts/:id
router.get("/:id", (req, res) => {
  Controllers.enhancedPostController.getEnhancedPostById(req, res);
});

// Update enhanced post
// PUT /api/enhanced-posts/:id
router.put("/:id", (req, res) => {
  Controllers.enhancedPostController.updateEnhancedPost(req, res);
});

// Delete enhanced post
// DELETE /api/enhanced-posts/:id
router.delete("/:id", (req, res) => {
  Controllers.enhancedPostController.deleteEnhancedPost(req, res);
});

module.exports = router;
