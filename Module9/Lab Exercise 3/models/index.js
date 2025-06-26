"use strict";
const User = require("./user");
const Post = require("./post");
const Comment = require("./comment");
const Like = require("./like");

// Define associations
// User has many Posts
User.hasMany(Post, { foreignKey: "user_id", as: "posts" });
Post.belongsTo(User, { foreignKey: "user_id", as: "user" });

// User has many Comments
User.hasMany(Comment, { foreignKey: "user_id", as: "comments" });
Comment.belongsTo(User, { foreignKey: "user_id", as: "user" });

// Post has many Comments
Post.hasMany(Comment, { foreignKey: "post_id", as: "comments" });
Comment.belongsTo(Post, { foreignKey: "post_id", as: "post" });

// User has many Likes
User.hasMany(Like, { foreignKey: "user_id", as: "likes" });
Like.belongsTo(User, { foreignKey: "user_id", as: "user" });

// Post has many Likes
Post.hasMany(Like, { foreignKey: "post_id", as: "likes" });
Like.belongsTo(Post, { foreignKey: "post_id", as: "post" });

// Comment has many Likes (optional)
Comment.hasMany(Like, { foreignKey: "comment_id", as: "likes" });
Like.belongsTo(Comment, { foreignKey: "comment_id", as: "comment" });

async function init() {
  await User.sync();
  await Post.sync();
  await Comment.sync();
  await Like.sync();
}

init();

module.exports = {
  User,
  Post,
  Comment,
  Like,
};
