const express = require("express");
const router = express.Router();
const calculatorController = require("../controllers/calculatorController")

// new route for adding two numbers
router.get("/add", (req, res) => {
  // let num1 = parseInt(req.query.num1)
  // let num2 = parseInt(req.query.num2)

  // // let result = num1 + num2
  
  // // res.json({res: result});

//     console.log(req.query);
//   res.send(req.query);

calculatorController.addNumbers(req, res);

});

router.get("/subtract", (req, res) => {
  // let num1 = parseInt(req.query.num1)
  // let num2 = parseInt(req.query.num2)

  // // let result = num1 + num2
  
  // // res.json({res: result});

//     console.log(req.query);
//   res.send(req.query);

calculatorController.subtractNumbers(req, res);

});

module.exports = router;
