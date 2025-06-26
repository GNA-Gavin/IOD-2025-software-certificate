const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

// Adds a GET route to return all posts
router.get("/", (req, res) => {
  Controllers.postController.getPosts(res);
});

// Adds a GET route to return a post by ID
router.get("/:id", (req, res) => {
  Controllers.postController.getPostById(req, res);
});

// Adds a POST route to create a new post
router.post("/create", (req, res) => {
  Controllers.postController.createPost(req.body, res);
});

router.put("/:id", (req, res) => {
  Controllers.postController.updatePost(req, res);
});

router.delete("/:id", (req, res) => {
  Controllers.postController.deletePost(req, res);
});

module.exports = router;
