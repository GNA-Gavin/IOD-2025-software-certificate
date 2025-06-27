const express = require("express");
const app = express();
const listRoutes = require("express-list-routes");
require("dotenv").config();
let dbConnect = require("./dbConnect");
let userRoutes = require("./routes/userRoutes");
let postRoutes = require("./routes/postRoutes");
let commentRoutes = require("./routes/commentRoutes");
let likeRoutes = require("./routes/likeRoutes");
let weatherRoutes = require("./routes/weatherRoutes");
let enhancedPostRoutes = require("./routes/enhancedPostRoutes");

// parse requests of content-type - application/json;
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/weather", weatherRoutes);
app.use("/api/enhanced-posts", enhancedPostRoutes);

app.get("/", (req, res) => {
  res.json({ 
    message: "Welcome to Lab Exercise 4 - Weather-Enhanced Blog Application!",
    description: "This application integrates weather data with blog posts.",
    weather_api: "https://goweather.xyz",
    features: [
      "Original blog functionality (users, posts, comments, likes)",
      "Weather data integration",
      "Enhanced posts with location and weather"
    ]
  });
});

// set port, listen for requests
const PORT = process.env.PORT || 8083;
app.listen(PORT, () => {
  console.log(`🌤️ Weather Blog Server is running on port ${PORT}.`);
  console.log('\n=== Weather API Examples ===');
  console.log(`GET http://localhost:${PORT}/api/weather?city=Bangkok`);
  console.log(`GET http://localhost:${PORT}/api/weather/city/London`);
  console.log(`POST http://localhost:${PORT}/api/enhanced-posts/create-with-weather`);
  console.log(`GET http://localhost:${PORT}/api/enhanced-posts?city=Bangkok&limit=5`);
  console.log('\n=== All Available API Routes ===');
  listRoutes(app);
  console.log('============================\n');
});