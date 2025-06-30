const Recipe = require("../models/Recipe");

// GET /api/recipes - Get all recipes with optional filters
const getAllRecipes = async (req, res) => {
  try {
    const { 
      category, 
      cuisine, 
      source, 
      search,
      page = 1,
      limit = 50
    } = req.query;

    // Build filter object
    const filter = {};
    
    if (category) filter.category = { $regex: category, $options: 'i' };
    if (cuisine) filter.cuisine = { $regex: cuisine, $options: 'i' };
    if (source) filter.source = source;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { 'ingredients.name': { $regex: search, $options: 'i' } }
      ];
    }

    // Pagination
    const skip = (page - 1) * limit;
    const totalRecipes = await Recipe.countDocuments(filter);
    
    const recipes = await Recipe.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.json({
      result: 200,
      recipes,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: totalRecipes,
        pages: Math.ceil(totalRecipes / limit)
      }
    });
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ 
      result: 500, 
      error: "Failed to fetch recipes",
      message: error.message 
    });
  }
};

// GET /api/recipes/:id - Get single recipe by ID
const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findById(id);

    if (!recipe) {
      return res.status(404).json({ 
        result: 404, 
        error: "Recipe not found" 
      });
    }

    res.json({
      result: 200,
      data: recipe
    });
  } catch (error) {
    console.error("Error fetching recipe:", error);
    res.status(500).json({ 
      result: 500, 
      error: "Failed to fetch recipe",
      message: error.message 
    });
  }
};

// POST /api/recipes - Create new recipe
const createRecipe = async (req, res) => {
  try {
    const recipeData = req.body;
    
    // Validate required fields
    if (!recipeData.title || !recipeData.instructions) {
      return res.status(400).json({
        result: 400,
        error: "Title and instructions are required"
      });
    }

    // Set source to Manual if not specified
    if (!recipeData.source) {
      recipeData.source = "Manual";
    }

    const recipe = new Recipe(recipeData);
    const savedRecipe = await recipe.save();

    res.status(201).json({
      result: 201,
      savedRecipe,
      message: "Recipe created successfully"
    });
  } catch (error) {
    console.error("Error creating recipe:", error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        result: 400,
        error: "Validation error",
        details: error.errors
      });
    }
    
    res.status(500).json({ 
      result: 500, 
      error: "Failed to create recipe",
      message: error.message 
    });
  }
};

// PUT /api/recipes/:id - Update recipe
const updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Ensure updatedAt is set
    updateData.updatedAt = new Date();

    const recipe = await Recipe.findByIdAndUpdate(
      id, 
      updateData, 
      { new: true, runValidators: true }
    );

    if (!recipe) {
      return res.status(404).json({ 
        result: 404, 
        error: "Recipe not found" 
      });
    }

    res.json({
      result: 200,
      data: recipe,
      message: "Recipe updated successfully"
    });
  } catch (error) {
    console.error("Error updating recipe:", error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        result: 400,
        error: "Validation error",
        details: error.errors
      });
    }
    
    res.status(500).json({ 
      result: 500, 
      error: "Failed to update recipe",
      message: error.message 
    });
  }
};

// DELETE /api/recipes/:id - Delete recipe
const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findByIdAndDelete(id);

    if (!recipe) {
      return res.status(404).json({ 
        result: 404, 
        error: "Recipe not found" 
      });
    }

    res.json({
      result: 200,
      message: "Recipe deleted successfully",
      data: { deletedId: id }
    });
  } catch (error) {
    console.error("Error deleting recipe:", error);
    res.status(500).json({ 
      result: 500, 
      error: "Failed to delete recipe",
      message: error.message 
    });
  }
};

// GET /api/recipes/stats - Get recipe statistics
const getRecipeStats = async (req, res) => {
  try {
    const totalRecipes = await Recipe.countDocuments();
    
    const sourceStats = await Recipe.aggregate([
      { $group: { _id: "$source", count: { $sum: 1 } } }
    ]);
    
    const categoryStats = await Recipe.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);
    
    const cuisineStats = await Recipe.aggregate([
      { $group: { _id: "$cuisine", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    res.json({
      result: 200,
      data: {
        totalRecipes,
        sourceDistribution: sourceStats,
        topCategories: categoryStats,
        topCuisines: cuisineStats
      }
    });
  } catch (error) {
    console.error("Error fetching recipe stats:", error);
    res.status(500).json({ 
      result: 500, 
      error: "Failed to fetch recipe statistics",
      message: error.message 
    });
  }
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getRecipeStats
};
