const express = require("express");
const router = express.Router();

// new route for adding two numbers
router.get("/add", (req, res) => {
  let num1 = parseInt(req.query.num1)
  let num2 = parseInt(req.query.num2)

  let result = num1 + num2
  
  res.json({res: result});
});

// route for subtracting two numbers
router.get("/subtract", (req, res) => {
  let num1 = parseInt(req.query.num1)
  let num2 = parseInt(req.query.num2)

  let result = num1 - num2
  
  res.json({res: result});
});

// route for multiplying two numbers
router.get("/multiply", (req, res) => {
  let num1 = parseInt(req.query.num1)
  let num2 = parseInt(req.query.num2)

  let result = num1 * num2
  
  res.json({res: result});
});

// route for dividing two numbers
router.get("/divide", (req, res) => {
  let num1 = parseInt(req.query.num1)
  let num2 = parseInt(req.query.num2)

  // Check for division by zero
  if (num2 === 0) {
    return res.status(400).json({error: "Cannot divide by zero"});
  }

  let result = num1 / num2
  
  res.json({res: result});
});

module.exports = router;
