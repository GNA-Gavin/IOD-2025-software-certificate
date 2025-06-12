import { Grid, Container } from "@mui/material";
import RecipeCard from "./RecipeCard";
import { EmptyState } from "./LoadingStateComponents";

export default function RecipeList({
  recipes,
  adaptiveGrid = false,
  favoriteCount = null,
}) {
  if (!recipes || recipes.length === 0) {
    return <EmptyState message="No recipes found" />;
  }

  // Determine grid sizing based on favorite count for adaptive behavior
  const getGridSize = () => {
    if (adaptiveGrid && favoriteCount) {
      if (favoriteCount === 1) {
        return { xs: 12, sm: 12, md: 12 }; // Full width on all screens
      }
      if (favoriteCount === 2) {
        return { xs: 12, sm: 6, md: 6 }; // Half width on sm and up
      }
    }
    // Default grid sizing (3 columns on desktop)
    return { xs: 12, sm: 6, md: 4 };
  };

  const gridSize = getGridSize();

  return (
    <>
      {/* Container provides responsive max-width and horizontal centering */}
      <Container maxWidth="lg">
        {/* Grid container creates a responsive flexbox layout with consistent spacing */}
        <Grid container spacing={3} sx={{ justifyContent: "center", mt: 2 }}>
          {recipes.map((recipe) => (
            /* Grid item wraps each recipe card with responsive column sizing */
            <Grid size={gridSize} key={recipe.idMeal}>
              <RecipeCard recipe={recipe} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
