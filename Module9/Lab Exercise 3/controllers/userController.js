"use strict";
const Models = require("../models");

// finds all users in DB, then sends array as response
const getUsers = (res) => {
  Models.User.findAll({})
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

// finds a user by ID
const getUserById = (req, res) => {
  Models.User.findByPk(req.params.id)
    .then((data) => {
      if (data) {
        res.send({ result: 200, data: data });
      } else {
        res.send({ result: 404, error: "User not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

// uses JSON from request body to create new user in DB
const createUser = (data, res) => {
  Models.User.create(data)
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

// updates a user by ID
const updateUser = (req, res) => {
  console.log("Update request for user ID:", req.params.id);
  console.log("Update data:", req.body);

  Models.User.update(req.body, {
    where: { id: req.params.id },
  })
    .then((rowsAffected) => {
      console.log("Rows affected result:", rowsAffected);
      if (rowsAffected[0] > 0) {
        // Fetch the updated user to return it
        Models.User.findByPk(req.params.id).then((updatedUser) => {
          console.log("Updated user found:", updatedUser);
          res.send({ result: 200, data: updatedUser });
        });
      } else {
        res.send({ result: 404, error: "User not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

// deletes a user by ID
const deleteUser = (req, res) => {
  Models.User.destroy({
    where: { id: req.params.id },
  })
    .then((deletedRows) => {
      if (deletedRows > 0) {
        res.send({ result: 200, data: "User deleted successfully" });
      } else {
        res.send({ result: 404, error: "User not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
