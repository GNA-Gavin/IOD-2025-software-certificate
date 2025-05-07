const express = require("express");
const router = express.Router();
const calculatorController = require("../controllers/calculatorController")

// new route for adding two numbers
router.get("/add", (req, res) => {
  calculatorController.add(req,res);
});

// route for subtracting two numbers
router.get("/subtract", (req, res) => {
  calculatorController.subtract(req,res);
});

// route for multiplying two numbers
router.get("/multiply", (req, res) => {
  calculatorController.multiply(req,res);
});

// route for dividing two numbers
router.get("/divide", (req, res) => {
  calculatorController.divide(req, res);
});

module.exports = router;
