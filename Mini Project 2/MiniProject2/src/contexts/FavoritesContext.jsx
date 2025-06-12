import { createContext, useContext, useState, useEffect } from "react";

// Create the favorites context for sharing favorite recipes across components
const FavoritesContext = createContext();

// Provider component that manages favorites state and provides context to children
export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]); // Array of favorite recipe objects

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem("recipeFavorites");
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error("Error loading favorites from localStorage:", error);
      }
    }
  }, []);

  // Save favorites to localStorage whenever the favorites array changes
  useEffect(() => {
    localStorage.setItem("recipeFavorites", JSON.stringify(favorites));
  }, [favorites]);

  // Add a recipe to favorites if it's not already there
  const addToFavorites = (recipe) => {
    setFavorites((prev) => {
      if (prev.some((fav) => fav.idMeal === recipe.idMeal)) {
        return prev; // Already in favorites, no change
      }
      return [...prev, recipe]; // Add new recipe to favorites
    });
  };

  // Remove a recipe from favorites by its ID
  const removeFromFavorites = (recipeId) => {
    setFavorites((prev) => prev.filter((fav) => fav.idMeal !== recipeId));
  };

  // Check if a recipe is currently in favorites
  const isFavorite = (recipeId) => {
    return favorites.some((fav) => fav.idMeal === recipeId);
  };

  // Toggle favorite status - add if not favorited, remove if already favorited
  const toggleFavorite = (recipe) => {
    if (isFavorite(recipe.idMeal)) {
      removeFromFavorites(recipe.idMeal);
    } else {
      addToFavorites(recipe);
    }
  };

  // Clear all favorites (useful for reset functionality)
  const clearFavorites = () => {
    setFavorites([]);
  };

  // Context value object containing all favorites data and functions
  const value = {
    favorites, // Array of favorite recipe objects
    addToFavorites, // Function to add a recipe to favorites
    removeFromFavorites, // Function to remove a recipe from favorites
    isFavorite, // Function to check if a recipe is favorited
    toggleFavorite, // Function to toggle favorite status
    clearFavorites, // Function to clear all favorites
    favoritesCount: favorites.length, // Number of current favorites
  };

  // Provider component that makes favorites context available to all child components
  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

// Custom hook to access favorites context with error handling
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
