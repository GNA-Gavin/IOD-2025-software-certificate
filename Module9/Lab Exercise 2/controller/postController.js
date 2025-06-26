"use strict";
let Models = require("../models"); // matches index.js

const getPosts = (res) => {
  // finds all posts
  Models.Post.find({})
    .populate("user_id", "username email")
    .sort({ created_timestamp: -1 })
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const getPostById = (req, res) => {
  // finds a post by ID with like and comment counts
  Models.Post.findById(req.params.id)
    .populate("user_id", "username email")
    .then(async (post) => {
      if (!post) {
        return res.send({ result: 404, error: "Post not found" });
      }
      
      // Add like and comment counts
      const likeCount = await Models.Like.countDocuments({ post_id: post._id });
      const commentCount = await Models.Comment.countDocuments({ post_id: post._id });
      
      const postWithCounts = {
        ...post.toObject(),
        likeCount,
        commentCount
      };
      
      res.send({ result: 200, data: postWithCounts });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const createPost = (data, res) => {
  // creates a new post using JSON data POSTed in request body
  console.log(data);
  
  // Check if user exists
  Models.User.findById(data.user_id)
    .then((user) => {
      if (!user) {
        return res.send({ result: 404, error: "User not found" });
      }
      
      // Create new post
      new Models.Post(data)
        .save()
        .then((post) => {
          // Populate user information and return
          Models.Post.findById(post._id)
            .populate("user_id", "username email")
            .then((populatedPost) => {
              res.send({ result: 200, data: populatedPost });
            });
        })
        .catch((err) => {
          console.log(err);
          res.send({ result: 500, error: err.message });
        });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const updatePost = (req, res) => {
  // updates the post matching the ID from the param using JSON data POSTed in request body
  console.log(req.body);
  Models.Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
    .populate("user_id", "username email")
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const deletePost = (req, res) => {
  // deletes the post matching the ID from the param
  Models.Post.findByIdAndDelete(req.params.id)
    .then((data) => {
      if (data) {
        // Also delete related comments and likes
        Models.Comment.deleteMany({ post_id: data._id }).then(() => {
          Models.Like.deleteMany({ post_id: data._id }).then(() => {
            res.send({ result: 200, data: data });
          });
        });
      } else {
        res.send({ result: 404, error: "Post not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

module.exports = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
