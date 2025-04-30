const express = require("express");
const router = express.Router();

// new route for adding two numbers
router.get("/add", (req, res) => {
  let num1 = req.query.num1
  let num2 = req.query.num2

  let result = num1 + num2
  
  res.json({res: result});

//     console.log(req.query);
//   res.send(req.query);
});

module.exports = router;
