const express = require("express");
const router = express.Router();

router.get("/home", (req, res) => {
  res.send("Hello World, welcome to my express backend app!");
});

router.get("/contact", (req, res) => {
  console.log(req)
  res.send("Please contact 123-456-789");
});

router.get("/about", (req, res) => {
  res.send("This is for lab exercises");
});

router.get("/post", (req, res) => {
  res.send("Posted sucessfully");
});

module.exports = router;
