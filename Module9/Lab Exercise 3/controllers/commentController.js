"use strict";
const Models = require("../models");

// finds all comments
const getComments = (res) => {
  Models.Comment.findAll({
    include: [
      {
        model: Models.User,
        as: "user",
        attributes: ["id", "username", "email"],
      },
      {
        model: Models.Post,
        as: "post",
        attributes: ["id", "title"],
      },
    ],
    order: [["created_timestamp", "DESC"]],
  })
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

// finds a comment by ID
const getCommentById = (req, res) => {
  Models.Comment.findByPk(req.params.id, {
    include: [
      {
        model: Models.User,
        as: "user",
        attributes: ["id", "username", "email"],
      },
      {
        model: Models.Post,
        as: "post",
        attributes: ["id", "title"],
      },
    ],
  })
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

// creates a new comment
const createComment = (data, res) => {
  // Check if post exists
  Models.Post.findByPk(data.post_id)
    .then((post) => {
      if (!post) {
        return res.send({ result: 404, error: "Post not found" });
      }

      // Create new comment
      Models.Comment.create(data)
        .then((comment) => {
          // Return comment with populated information
          Models.Comment.findByPk(comment.id, {
            include: [
              {
                model: Models.User,
                as: "user",
                attributes: ["id", "username", "email"],
              },
              {
                model: Models.Post,
                as: "post",
                attributes: ["id", "title"],
              },
            ],
          }).then((populatedComment) => {
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

// updates a comment by ID
const updateComment = (req, res) => {
  Models.Comment.update(req.body, {
    where: { id: req.params.id },
  })
    .then((rowsAffected) => {
      if (rowsAffected[0] > 0) {
        // Return updated comment with populated information
        Models.Comment.findByPk(req.params.id, {
          include: [
            {
              model: Models.User,
              as: "user",
              attributes: ["id", "username", "email"],
            },
            {
              model: Models.Post,
              as: "post",
              attributes: ["id", "title"],
            },
          ],
        }).then((updatedComment) => {
          res.send({ result: 200, data: updatedComment });
        });
      } else {
        res.send({ result: 404, error: "Comment not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

// deletes a comment by ID
const deleteComment = (req, res) => {
  Models.Comment.findByPk(req.params.id)
    .then((comment) => {
      if (!comment) {
        return res.send({ result: 404, error: "Comment not found" });
      }

      // Delete related likes first, then delete comment
      Models.Like.destroy({ where: { comment_id: req.params.id } })
        .then(() => {
          Models.Comment.destroy({ where: { id: req.params.id } })
            .then(() => {
              res.send({ result: 200, data: comment });
            });
        });
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
