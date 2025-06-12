import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import FavoriteButton from "./FavoriteButton";

export default function RecipeCard({ recipe }) {
  const theme = useTheme(); // Access to MUI theme for consistent styling across light/dark modes
  const navigate = useNavigate();

  // Handler function to navigate to the full recipe page when card is clicked
  const handleViewRecipe = () => {
    navigate(`/recipe/${recipe.idMeal}`);
  };

  return (
    // Main card container - clickable to navigate to recipe page
    <Card
      elevation={2}
      onClick={handleViewRecipe}
      sx={{
        maxWidth: 345,
        margin: 2,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        cursor: "pointer", // Visual indicator that the card is clickable
        transition: "all 0.2s ease-in-out", // Smooth animations for hover effects
        "&:hover": {
          boxShadow: theme.shadows[4], // Enhanced shadow on hover for depth
          transform: "translateY(-2px)", // Subtle lift effect to show interactivity
        },
      }}
    >
      {/* Image container with positioned favorite button overlay */}
      <Box sx={{ position: "relative" }}>
        {/* Recipe thumbnail image */}
        <CardMedia
          component="img"
          height="200"
          image={recipe.strMealThumb}
          alt={recipe.strMeal}
        />

        {/* Favorite button overlay - positioned absolutely over the top-right of the image */}
        <Box
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            backgroundColor:
              theme.palette.mode === "dark"
                ? "rgba(0, 0, 0, 0.7)" // Dark semi-transparent background in dark mode
                : "rgba(255, 255, 255, 0.9)", // Light semi-transparent background in light mode
            borderRadius: "50%",
            backdropFilter: "blur(4px)",
            border:
              theme.palette.mode === "dark"
                ? "1px solid rgba(255, 255, 255, 0.1)"
                : "1px solid rgba(0, 0, 0, 0.1)",
          }}
        >
          <FavoriteButton recipe={recipe} size="small" />
        </Box>
      </Box>

      {/* Card content section containing recipe title and category chips */}
      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        {/* Recipe title with text truncation for long names */}
        <Typography
          variant="h6"
          component="h3"
          gutterBottom
          sx={{
            overflow: "hidden",
            display: "-webkit-box",
            "-webkit-line-clamp": 2, // Limit to 2 lines
            "-webkit-box-orient": "vertical",
            minHeight: "3em", // Consistent height regardless of title length
          }}
        >
          {recipe.strMeal}
        </Typography>

        {/* Category and cuisine chips container */}
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          {/* Category chip (e.g., "Dessert", "Beef") */}
          {recipe.strCategory && (
            <Chip
              label={recipe.strCategory}
              color="primary"
              size="small"
              icon={<RestaurantIcon />}
            />
          )}

          {/* Cuisine/Area chip (e.g., "Italian", "Chinese") */}
          {recipe.strArea && (
            <Chip
              label={recipe.strArea}
              color="secondary"
              size="small"
              variant="outlined"
            />
          )}
        </Box>
      </CardContent>

      {/* Card actions section with view recipe button */}
      <CardActions sx={{ pt: 0 }}>
        {/* Full-width button to view recipe (redundant with card click but provides clear CTA) */}
        <Button variant="contained" onClick={handleViewRecipe} fullWidth>
          View Recipe
        </Button>
      </CardActions>
    </Card>
  );
}
