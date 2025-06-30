const axios = require("axios");

const MEALDB_BASE_URL = "https://www.themealdb.com/api/json/v1/1";

// Fetch random meals from TheMealDB
const getRandomMeals = async (count = 10) => {
  try {
    const meals = [];

    for (let i = 0; i < count; i++) {
      const response = await axios.get(`${MEALDB_BASE_URL}/random.php`);
      if (response.data.meals && response.data.meals[0]) {
        meals.push(response.data.meals[0]);
      }
    }

    return meals;
  } catch (error) {
    console.error("Error fetching random meals:", error.message);
    throw new Error("Failed to fetch meals from TheMealDB");
  }
};

// Search meals by name
const searchMealsByName = async (name) => {
  try {
    const response = await axios.get(
      `${MEALDB_BASE_URL}/search.php?s=${encodeURIComponent(name)}`
    );
    return response.data.meals || [];
  } catch (error) {
    console.error("Error searching meals:", error.message);
    throw new Error("Failed to search meals from TheMealDB");
  }
};

// Get meals by category
const getMealsByCategory = async (category) => {
  try {
    const response = await axios.get(
      `${MEALDB_BASE_URL}/filter.php?c=${encodeURIComponent(category)}`
    );
    return response.data.meals || [];
  } catch (error) {
    console.error("Error fetching meals by category:", error.message);
    throw new Error("Failed to fetch meals by category from TheMealDB");
  }
};

// Get meal categories
const getMealCategories = async () => {
  try {
    const response = await axios.get(`${MEALDB_BASE_URL}/categories.php`);
    return response.data.categories || [];
  } catch (error) {
    console.error("Error fetching meal categories:", error.message);
    throw new Error("Failed to fetch categories from TheMealDB");
  }
};

// Transform TheMealDB data to our schema (includes video field)
const transformMealDBData = (meal) => {
  const ingredients = [];

  // Extract ingredients (TheMealDB has up to 20 ingredients)
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (ingredient && ingredient.trim()) {
      ingredients.push({
        name: ingredient.trim(),
        amount: measure ? measure.trim() : "",
      });
    }
  }

  return {
    title: meal.strMeal,
    description: meal.strMeal, // TheMealDB doesn't have separate description
    instructions: meal.strInstructions,
    ingredients: ingredients,
    category: meal.strCategory || "General",
    cuisine: meal.strArea || "International",
    image: meal.strMealThumb || "",
    video: meal.strYoutube || "",
    source: "TheMealDB",
    sourceId: meal.idMeal,
    tags: meal.strTags ? meal.strTags.split(",").map((tag) => tag.trim()) : [],
  };
};

// Get all meals by fetching from all categories (comprehensive approach)
const getAllMeals = async () => {
  try {
    console.log("Fetching all meal categories...");
    const categories = await getMealCategories();
    let allMeals = [];

    console.log(
      `Found ${categories.length} categories. Fetching meals from each...`
    );

    for (const category of categories) {
      try {
        console.log(`Fetching meals from category: ${category.strCategory}`);
        const categoryMeals = await getMealsByCategory(category.strCategory);

        // For each meal summary, fetch full details
        for (const mealSummary of categoryMeals) {
          try {
            const fullMeal = await getMealDetails(mealSummary.idMeal);
            if (fullMeal) {
              allMeals.push(fullMeal);
            }
          } catch (error) {
            console.error(
              `Error fetching details for meal ${mealSummary.idMeal}:`,
              error.message
            );
          }
        }
      } catch (error) {
        console.error(
          `Error fetching category ${category.strCategory}:`,
          error.message
        );
      }
    }

    console.log(`Successfully fetched ${allMeals.length} meals from TheMealDB`);
    return allMeals;
  } catch (error) {
    console.error("Error fetching all meals:", error.message);
    throw new Error("Failed to fetch all meals from TheMealDB");
  }
};

// Get meal details by ID
const getMealDetails = async (mealId) => {
  try {
    const response = await axios.get(
      `${MEALDB_BASE_URL}/lookup.php?i=${mealId}`
    );
    return response.data.meals ? response.data.meals[0] : null;
  } catch (error) {
    console.error(
      `Error fetching meal details for ID ${mealId}:`,
      error.message
    );
    return null;
  }
};

module.exports = {
  getRandomMeals,
  searchMealsByName,
  getMealsByCategory,
  getMealCategories,
  transformMealDBData,
  getAllMeals,
  getMealDetails,
};
