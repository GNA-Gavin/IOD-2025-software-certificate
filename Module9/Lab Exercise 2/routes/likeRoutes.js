let express = require("express");
let router = express.Router();
let Controllers = require("../controller"); // index.js

// Adds a GET route to return all likes
router.get("/", (req, res) => {
  Controllers.likeController.getLikes(res);
});

// Adds a GET route to return a like by ID
router.get("/:id", (req, res) => {
  Controllers.likeController.getLikeById(req, res);
});

// Adds a POST route to create a new like
router.post("/create", (req, res) => {
  Controllers.likeController.createLike(req.body, res);
});

// Delete a like (unlike) by like ID
router.delete("/:id", (req, res) => {
  Controllers.likeController.deleteLike(req, res);
});

// Get likes for a specific post
router.get("/post/:postId", (req, res) => {
  Controllers.likeController.getLikesByPost(req, res);
});

// Get likes for a specific comment
router.get("/comment/:commentId", (req, res) => {
  Controllers.likeController.getLikesByComment(req, res);
});

module.exports = router;
