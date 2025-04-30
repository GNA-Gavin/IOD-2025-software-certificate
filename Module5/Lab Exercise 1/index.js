const express = require("express");
const app = express();
const app2 = express();
const port = 3000;
const port2 = 3001;

app.get("/", (req, res) => {
  res.send("Hello World, welcome to my express backend app!");
});

app.get("/home", (req, res) => {
  res.send("Your home is where your heart is!");
});

app.get("/contact", (req, res) => {
  res.send("Please contact 123-456-789");
});

app.get("/about", (req, res) => {
  res.send("This is for lab exercises");
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});

app2.get("/", (req, res) => {
  res.send("Welcome to my second application");
});

app2.listen(port2, () => {
  console.log(`Another Server listening on port: ${port2}`);
});
