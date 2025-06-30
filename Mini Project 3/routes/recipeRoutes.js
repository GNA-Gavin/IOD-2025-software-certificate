const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipeController");

// GET /api/recipes/stats - Get recipe statistics (place before /:id route)
router.get("/stats", recipeController.getRecipeStats);

// GET /api/recipes - Get all recipes with optional filters
router.get("/", recipeController.getAllRecipes);

// GET /api/recipes/:id - Get single recipe by ID
router.get("/:id", recipeController.getRecipeById);

// POST /api/recipes - Create new recipe
router.post("/", recipeController.createRecipe);

// PUT /api/recipes/:id - Update recipe
router.put("/:id", recipeController.updateRecipe);

// DELETE /api/recipes/:id - Delete recipe
router.delete("/:id", recipeController.deleteRecipe);

module.exports = router;
