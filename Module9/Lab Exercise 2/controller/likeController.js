"use strict";
let Models = require("../models"); // matches index.js

const getLikes = (res) => {
  // finds all likes
  Models.Like.find({})
    .populate("user_id", "username email")
    .populate("post_id", "title")
    .sort({ created_timestamp: -1 })
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const getLikeById = (req, res) => {
  // finds a like by ID
  Models.Like.findById(req.params.id)
    .populate("user_id", "username email")
    .populate("post_id", "title")
    .populate("comment_id", "content")
    .then((data) => {
      if (data) {
        res.send({ result: 200, data: data });
      } else {
        res.send({ result: 404, error: "Like not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const createLike = (data, res) => {
  // creates a new like using JSON data POSTed in request body
  console.log(data);
  
  // Check if user and post exist
  Promise.all([
    Models.User.findById(data.user_id),
    Models.Post.findById(data.post_id)
  ])
    .then(([user, post]) => {
      if (!user) {
        return res.send({ result: 404, error: "User not found" });
      }
      if (!post) {
        return res.send({ result: 404, error: "Post not found" });
      }
      
      // Check if like already exists (including comment_id for proper uniqueness)
      const likeQuery = { 
        user_id: data.user_id, 
        post_id: data.post_id,
        comment_id: data.comment_id || null 
      };
      
      Models.Like.findOne(likeQuery)
        .then((existingLike) => {
          if (existingLike) {
            const likeType = data.comment_id ? "comment" : "post";
            return res.send({ result: 400, error: `User already liked this ${likeType}` });
          }
          
          // Create new like
          new Models.Like(data)
            .save()
            .then((like) => {
              // Populate like information and return
              Models.Like.findById(like._id)
                .populate("user_id", "username email")
                .populate("post_id", "title")
                .then((populatedLike) => {
                  res.send({ result: 200, data: populatedLike });
                });
            })
            .catch((err) => {
              console.log(err);
              res.send({ result: 500, error: err.message });
            });
        });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const deleteLike = (req, res) => {
  // deletes the like matching the ID from the param
  Models.Like.findByIdAndDelete(req.params.id)
    .then((data) => {
      if (data) {
        res.send({ result: 200, data: data });
      } else {
        res.send({ result: 404, error: "Like not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const getLikesByPost = (req, res) => {
  // gets all likes for a specific post
  Models.Like.find({ post_id: req.params.postId })
    .populate("user_id", "username email")
    .sort({ created_timestamp: -1 })
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const getLikesByComment = (req, res) => {
  // gets all likes for a specific comment
  Models.Like.find({ comment_id: req.params.commentId })
    .populate("user_id", "username email")
    .populate("post_id", "title")
    .sort({ created_timestamp: -1 })
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

module.exports = {
  getLikes,
  getLikeById,
  createLike,
  deleteLike,
  getLikesByPost,
  getLikesByComment,
};
