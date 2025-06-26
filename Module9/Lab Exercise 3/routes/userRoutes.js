const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

// Adds a GET route to return all users
router.get("/", (req, res) => {
  Controllers.userController.getUsers(res);
});

// Adds a GET route to return a user by ID
router.get("/:id", (req, res) => {
  Controllers.userController.getUserById(req, res);
});

// Adds a POST route to create a new user
router.post("/create", (req, res) => {
  Controllers.userController.createUser(req.body, res);
});

router.put("/:id", (req, res) => {
  Controllers.userController.updateUser(req, res);
});

router.delete("/:id", (req, res) => {
  Controllers.userController.deleteUser(req, res);
});

module.exports = router;
