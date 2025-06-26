"use strict";
let Models = require("../models"); // matches index.js

const getComments = (res) => {
  // finds all comments
  Models.Comment.find({})
    .populate("user_id", "username email")
    .populate("post_id", "title")
    .sort({ created_timestamp: -1 })
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const getCommentById = (req, res) => {
  // finds a comment by ID
  Models.Comment.findById(req.params.id)
    .populate("user_id", "username email")
    .populate("post_id", "title")
    .then((data) => {
      if (data) {
        res.send({ result: 200, data: data });
      } else {
        res.send({ result: 404, error: "Comment not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const createComment = (data, res) => {
  // creates a new comment using JSON data POSTed in request body
  console.log(data);
  
  // Check if post exists
  Models.Post.findById(data.post_id)
    .then((post) => {
      if (!post) {
        return res.send({ result: 404, error: "Post not found" });
      }
      
      // Create new comment
      new Models.Comment(data)
        .save()
        .then((comment) => {
          // Populate comment information and return
          Models.Comment.findById(comment._id)
            .populate("user_id", "username email")
            .populate("post_id", "title")
            .then((populatedComment) => {
              res.send({ result: 200, data: populatedComment });
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

const updateComment = (req, res) => {
  // updates the comment matching the ID from the param using JSON data POSTed in request body
  console.log(req.body);
  Models.Comment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
    .populate("user_id", "username email")
    .populate("post_id", "title")
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const deleteComment = (req, res) => {
  // deletes the comment matching the ID from the param
  Models.Comment.findByIdAndDelete(req.params.id)
    .then((data) => {
      if (data) {
        res.send({ result: 200, data: data });
      } else {
        res.send({ result: 404, error: "Comment not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

module.exports = {
  getComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
};
