"use strict";
const Models = require("../models");

// finds all likes
const getLikes = (res) => {
  Models.Like.findAll({
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
      {
        model: Models.Comment,
        as: "comment",
        attributes: ["id", "content"],
        required: false, // LEFT JOIN for optional comment
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

// finds a like by ID
const getLikeById = (req, res) => {
  Models.Like.findByPk(req.params.id, {
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
      {
        model: Models.Comment,
        as: "comment",
        attributes: ["id", "content"],
        required: false, // LEFT JOIN for optional comment
      },
    ],
  })
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

// creates a new like
const createLike = (data, res) => {
  // Check if user and post exist
  Promise.all([
    Models.User.findByPk(data.user_id),
    Models.Post.findByPk(data.post_id),
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
        comment_id: data.comment_id || null,
      };

      Models.Like.findOne({ where: likeQuery }).then((existingLike) => {
        if (existingLike) {
          const likeType = data.comment_id ? "comment" : "post";
          return res.send({
            result: 400,
            error: `User already liked this ${likeType}`,
          });
        }

        // Create new like
        Models.Like.create(data)
          .then((like) => {
            // Return like with populated information
            Models.Like.findByPk(like.id, {
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
                {
                  model: Models.Comment,
                  as: "comment",
                  attributes: ["id", "content"],
                  required: false,
                },
              ],
            }).then((populatedLike) => {
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

// deletes a like by ID
const deleteLike = (req, res) => {
  Models.Like.findByPk(req.params.id)
    .then((like) => {
      if (!like) {
        return res.send({ result: 404, error: "Like not found" });
      }

      Models.Like.destroy({ where: { id: req.params.id } }).then(() => {
        res.send({ result: 200, data: like });
      });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

// gets all likes for a specific post
const getLikesByPost = (req, res) => {
  Models.Like.findAll({
    where: { post_id: req.params.postId, comment_id: null },
    include: [
      {
        model: Models.User,
        as: "user",
        attributes: ["id", "username", "email"],
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

// gets all likes for a specific comment
const getLikesByComment = (req, res) => {
  Models.Like.findAll({
    where: { comment_id: req.params.commentId },
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

module.exports = {
  getLikes,
  getLikeById,
  createLike,
  deleteLike,
  getLikesByPost,
  getLikesByComment,
};
