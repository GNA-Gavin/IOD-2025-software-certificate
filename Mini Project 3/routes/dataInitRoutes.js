const express = require("express");
const router = express.Router();
const dataInitController = require("../controllers/dataInitController");

// POST /api/data-init/populate - Populate database with ALL available recipes from both APIs
router.post("/populate", dataInitController.populateDatabase);

// DELETE /api/data-init/clear - Clear all recipes from database
router.delete("/clear", dataInitController.clearDatabase);

module.exports = router;
