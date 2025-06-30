const express = require("express");
require("dotenv").config();
let dbConnect = require("./dbConnect");

const app = express();
const listRoutes = require("express-list-routes");
const PORT = process.env.PORT || 8080;

// Import routes
const recipeRoutes = require("./routes/recipeRoutes");
const dataInitRoutes = require("./routes/dataInitRoutes");

app.use(express.json());

// Routes
app.use("/api/recipes", recipeRoutes);
app.use("/api/data-init", dataInitRoutes);

// Basic route
app.get("/", (req, res) => {
  res.json({
    message: "Recipe Manager API",
    version: "1.0.0",
    description:
      "A comprehensive recipe management system combining TheMealDB and SampleAPIs",
    endpoints: {
      recipes: "/api/recipes",
      dataInit: "/api/data-init",
    },
    features: [
      "Full CRUD operations for recipes",
      "External API integration (TheMealDB + SampleAPIs)",
    ],
  });
});

app.listen(PORT, () => {
  console.log(`Recipe Manager API running on port ${PORT}`);
  console.log(`Access the API at: http://localhost:${PORT}`);
  console.log("Start with: POST /api/data-init/populate to load ALL available recipes");
  console.log('\n=== All Available API Routes ===');
  listRoutes(app);
  console.log('============================\n');
});
