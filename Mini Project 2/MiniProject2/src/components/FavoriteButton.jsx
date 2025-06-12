import { IconButton, Tooltip } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useFavorites } from "../contexts/FavoritesContext";

export default function FavoriteButton({ recipe, size = "medium" }) {
  const theme = useTheme(); // Access to MUI theme for consistent styling
  const { isFavorite, toggleFavorite } = useFavorites(); // Favorites context functions
  const isRecipeFavorite = isFavorite(recipe.idMeal); // Check if this recipe is favorited

  // Handler to toggle favorite status without triggering parent click events
  const handleClick = (e) => {
    e.stopPropagation(); // Prevent card click when clicking heart
    toggleFavorite(recipe);
  };

  return (
    <>
      {/* Tooltip provides helpful text on hover */}
      <Tooltip
        title={isRecipeFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        {/* IconButton creates a clickable heart icon with theme-aware styling */}
        <IconButton
          onClick={handleClick}
          sx={{
            // Dynamic color based on favorite status and theme mode
            color: isRecipeFavorite
              ? "error.main" // Red when favorited
              : theme.palette.mode === "dark"
              ? "rgba(255, 255, 255, 0.7)" // Light gray in dark mode
              : "rgba(0, 0, 0, 0.6)", // Dark gray in light mode
            "&:hover": {
              color: "error.main", // Always red on hover
              transform: "scale(1.1)", // Slight scale effect
              transition: "all 0.2s",
              backgroundColor:
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.08)"
                  : "rgba(0, 0, 0, 0.04)",
            },
          }}
          size={size}
        >
          {/* Conditional icon rendering: filled heart when favorited, outline when not */}
          {isRecipeFavorite ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
      </Tooltip>
    </>
  );
}
