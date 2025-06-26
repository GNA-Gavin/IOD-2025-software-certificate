"use strict";
const Models = require("../models");
const { Sequelize } = require("sequelize");

// finds all posts with like and comment counts
const getPosts = (res) => {
  Models.Post.findAll({
    include: [
      {
        model: Models.User,
        as: "user",
        attributes: ["id", "username", "email"],
      },
    ],
    order: [["created_timestamp", "DESC"]],
  })
    .then(async (posts) => {
      // Add like and comment counts to each post
      const postsWithCounts = await Promise.all(
        posts.map(async (post) => {
          const likeCount = await Models.Like.count({
            where: { post_id: post.id, comment_id: null },
          });
          const commentCount = await Models.Comment.count({
            where: { post_id: post.id },
          });

          return {
            ...post.toJSON(),
            likeCount,
            commentCount,
          };
        })
      );

      res.send({ result: 200, data: postsWithCounts });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

// finds a post by ID with like and comment counts
const getPostById = (req, res) => {
  Models.Post.findByPk(req.params.id, {
    include: [
      {
        model: Models.User,
        as: "user",
        attributes: ["id", "username", "email"],
      },
    ],
  })
    .then(async (post) => {
      if (!post) {
        return res.send({ result: 404, error: "Post not found" });
      }

      // Add like and comment counts
      const likeCount = await Models.Like.count({
        where: { post_id: post.id, comment_id: null },
      });
      const commentCount = await Models.Comment.count({
        where: { post_id: post.id },
      });

      const postWithCounts = {
        ...post.toJSON(),
        likeCount,
        commentCount,
      };

      res.send({ result: 200, data: postWithCounts });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

// creates a new post
const createPost = (data, res) => {
  // Check if user exists
  Models.User.findByPk(data.user_id)
    .then((user) => {
      if (!user) {
        return res.send({ result: 404, error: "User not found" });
      }

      // Create new post
      Models.Post.create(data)
        .then((post) => {
          // Return post with user information
          Models.Post.findByPk(post.id, {
            include: [
              {
                model: Models.User,
                as: "user",
                attributes: ["id", "username", "email"],
              },
            ],
          }).then((populatedPost) => {
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

// updates a post by ID
const updatePost = (req, res) => {
  Models.Post.update(req.body, {
    where: { id: req.params.id },
  })
    .then((rowsAffected) => {
      if (rowsAffected[0] > 0) {
        // Return updated post with user information
        Models.Post.findByPk(req.params.id, {
          include: [
            {
              model: Models.User,
              as: "user",
              attributes: ["id", "username", "email"],
            },
          ],
        }).then((updatedPost) => {
          res.send({ result: 200, data: updatedPost });
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

// deletes a post by ID and related comments and likes
const deletePost = (req, res) => {
  Models.Post.findByPk(req.params.id)
    .then((post) => {
      if (!post) {
        return res.send({ result: 404, error: "Post not found" });
      }

      // Delete related comments and likes first
      Promise.all([
        Models.Comment.destroy({ where: { post_id: req.params.id } }),
        Models.Like.destroy({ where: { post_id: req.params.id } }),
      ])
        .then(() => {
          // Delete the post
          Models.Post.destroy({ where: { id: req.params.id } })
            .then(() => {
              res.send({ result: 200, data: post });
            });
        });
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
