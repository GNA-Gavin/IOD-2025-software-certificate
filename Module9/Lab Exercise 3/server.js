const express = require("express");
const app = express();
const listRoutes = require("express-list-routes");
require("dotenv").config();
let dbConnect = require("./dbConnect");
let userRoutes = require("./routes/userRoutes");
let postRoutes = require("./routes/postRoutes");
let commentRoutes = require("./routes/commentRoutes");
let likeRoutes = require("./routes/likeRoutes");

// parse requests of content-type - application/json
app.use(express.json());

// API routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to MySQL Blog Application - Lab Exercise 3" });
});

// set port, listen for requests
const PORT = process.env.PORT || 8082;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
  console.log('\n=== Available API Routes ===');
  listRoutes(app);
  console.log('============================\n');
});
