const axios = require("axios");

const SAMPLEAPIS_BASE_URL = "https://api.sampleapis.com/recipes/recipes";

// Fetch all recipes from SampleAPIs
const getAllRecipes = async () => {
  try {
    const response = await axios.get(SAMPLEAPIS_BASE_URL);
    return response.data || [];
  } catch (error) {
    console.error("Error fetching recipes from SampleAPIs:", error.message);
    throw new Error("Failed to fetch recipes from SampleAPIs");
  }
};

// Get a limited number of recipes
const getLimitedRecipes = async (limit = 20) => {
  try {
    const allRecipes = await getAllRecipes();
    return allRecipes.slice(0, limit);
  } catch (error) {
    throw error;
  }
};

// Transform SampleAPIs data to our schema (video field empty for this API)
const transformSampleAPIData = (recipe) => {
  // Parse ingredients if they're in string format
  let ingredients = [];

  if (Array.isArray(recipe.ingredients)) {
    ingredients = recipe.ingredients.map((ingredient) => {
      if (typeof ingredient === "string") {
        return { name: ingredient, amount: "" };
      } else if (typeof ingredient === "object") {
        return {
          name: ingredient.name || ingredient.ingredient || "",
          amount: ingredient.amount || ingredient.measure || "",
        };
      }
      return { name: String(ingredient), amount: "" };
    });
  } else if (typeof recipe.ingredients === "string") {
    // If ingredients is a string, try to parse it
    ingredients = recipe.ingredients.split(",").map((ing) => ({
      name: ing.trim(),
      amount: "",
    }));
  }

  // Parse instructions
  let instructions = "";
  if (Array.isArray(recipe.instructions)) {
    instructions = recipe.instructions.join(" ");
  } else if (typeof recipe.instructions === "string") {
    instructions = recipe.instructions;
  } else if (recipe.directions) {
    if (Array.isArray(recipe.directions)) {
      instructions = recipe.directions.join(" ");
    } else {
      instructions = String(recipe.directions);
    }
  }

  return {
    title: recipe.title || recipe.name || "Untitled Recipe",
    description: recipe.description || recipe.title || "",
    instructions: instructions,
    ingredients: ingredients,
    category: recipe.course || recipe.category || "General",
    cuisine: recipe.cuisine || "International",
    image: recipe.image || "",
    video: "", // SampleAPIs doesn't provide video links
    source: "SampleAPIs",
    sourceId: recipe.id ? String(recipe.id) : "",
    tags: recipe.tags || [],
  };
};

module.exports = {
  getAllRecipes,
  getLimitedRecipes,
  transformSampleAPIData,
};
