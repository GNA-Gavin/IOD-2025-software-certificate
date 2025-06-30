const Recipe = require("../models/Recipe");
const mealDBService = require("../services/mealDBService");
const sampleAPIService = require("../services/sampleAPIService");

// POST /api/data-init/populate - Populate database with ALL available recipes from both APIs
const populateDatabase = async (req, res) => {
  try {
    const { clearExisting = false } = req.body;

    let stats = {
      cleared: 0,
      mealDBAdded: 0,
      sampleAPIAdded: 0,
      errors: [],
      skippedDuplicates: 0
    };

    // Clear existing data if requested
    if (clearExisting) {
      const deleteResult = await Recipe.deleteMany({});
      stats.cleared = deleteResult.deletedCount;
      console.log(`Cleared ${stats.cleared} existing recipes`);
    }

    // Fetch ALL recipes from TheMealDB (this will take longer)
    try {
      console.log("Fetching ALL recipes from TheMealDB (this may take several minutes)...");
      const mealDBRecipes = await mealDBService.getAllMeals();
      console.log(`Found ${mealDBRecipes.length} recipes from TheMealDB`);
      
      for (const meal of mealDBRecipes) {
        try {
          const transformedRecipe = mealDBService.transformMealDBData(meal);
          
          // Check if recipe already exists by sourceId
          const existingRecipe = await Recipe.findOne({ 
            source: "TheMealDB", 
            sourceId: transformedRecipe.sourceId 
          });
          
          if (!existingRecipe) {
            const recipe = new Recipe(transformedRecipe);
            await recipe.save();
            stats.mealDBAdded++;
          } else {
            stats.skippedDuplicates++;
          }
        } catch (error) {
          stats.errors.push(`TheMealDB recipe error: ${error.message}`);
        }
      }
    } catch (error) {
      stats.errors.push(`TheMealDB API error: ${error.message}`);
    }

    // Fetch ALL recipes from SampleAPIs (this is relatively fast)
    try {
      console.log("Fetching ALL recipes from SampleAPIs...");
      const sampleRecipes = await sampleAPIService.getAllRecipes();
      console.log(`Found ${sampleRecipes.length} recipes from SampleAPIs`);
      
      for (const recipe of sampleRecipes) {
        try {
          const transformedRecipe = sampleAPIService.transformSampleAPIData(recipe);
          
          // Check if recipe already exists by title (SampleAPIs doesn't have reliable IDs)
          const existingRecipe = await Recipe.findOne({ 
            source: "SampleAPIs", 
            title: transformedRecipe.title 
          });
          
          if (!existingRecipe) {
            const newRecipe = new Recipe(transformedRecipe);
            await newRecipe.save();
            stats.sampleAPIAdded++;
          } else {
            stats.skippedDuplicates++;
          }
        } catch (error) {
          stats.errors.push(`SampleAPIs recipe error: ${error.message}`);
        }
      }
    } catch (error) {
      stats.errors.push(`SampleAPIs API error: ${error.message}`);
    }

    // Get final database stats
    const totalRecipes = await Recipe.countDocuments();
    
    res.json({
      result: 200,
      message: "Database population completed with all available recipes",
      data: {
        ...stats,
        totalRecipesInDB: totalRecipes,
        note: "This operation fetched all available recipes from both APIs"
      }
    });

  } catch (error) {
    console.error("Error populating database:", error);
    res.status(500).json({ 
      result: 500, 
      error: "Failed to populate database",
      message: error.message 
    });
  }
};



// DELETE /api/data-init/clear - Clear all recipes from database
const clearDatabase = async (req, res) => {
  try {
    const { confirm } = req.body;
    
    if (confirm !== "DELETE_ALL_RECIPES") {
      return res.status(400).json({
        result: 400,
        error: "Please confirm deletion by sending { \"confirm\": \"DELETE_ALL_RECIPES\" }"
      });
    }

    const deleteResult = await Recipe.deleteMany({});
    
    res.json({
      result: 200,
      message: "Database cleared successfully",
      data: {
        deletedCount: deleteResult.deletedCount
      }
    });
  } catch (error) {
    console.error("Error clearing database:", error);
    res.status(500).json({ 
      result: 500, 
      error: "Failed to clear database",
      message: error.message 
    });
  }
};

module.exports = {
  populateDatabase,
  clearDatabase
};
