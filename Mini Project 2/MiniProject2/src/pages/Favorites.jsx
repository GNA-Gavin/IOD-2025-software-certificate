import { Container, Typography, Box, Paper, Button } from "@mui/material";
import {
  Favorite as FavoriteIcon,
  Clear as ClearIcon,
} from "@mui/icons-material";
import { useFavorites } from "../contexts/FavoritesContext";
import RecipeList from "../components/RecipeList";

export default function Favorites() {
  const { favorites, clearFavorites, favoritesCount } = useFavorites(); // Access favorites context

  // Show empty state when no favorites exist
  if (favoritesCount === 0) {
    return (
      <>
        {/* Main container for empty state */}
        <Container maxWidth="lg" sx={{ py: 4 }}>
          {/* Elevated paper with gradient background for empty state message */}
          <Paper
            elevation={3}
            sx={{
              p: 6,
              textAlign: "center",
              background:
                "linear-gradient(135deg, rgba(255, 107, 53, 0.05) 0%, rgba(76, 175, 80, 0.05) 100%)",
            }}
          >
            {/* Large heart icon for visual appeal */}
            <FavoriteIcon
              sx={{ fontSize: 80, color: "text.secondary", mb: 2 }}
            />
            {/* Empty state title */}
            <Typography variant="h4" gutterBottom color="text.secondary">
              No Favorites Yet
            </Typography>
            {/* Encouraging message to start using favorites */}
            <Typography variant="body1" color="text.secondary">
              Start exploring recipes and add them to your favorites!
            </Typography>
          </Paper>
        </Container>
      </>
    );
  }

  // Main favorites page when favorites exist
  return (
    <>
      {/* Main container for favorites content */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header section with title and clear all button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          {/* Page title with heart icon and favorites count */}
          <Typography
            variant="h4"
            component="h1"
            sx={{
              color: "primary.main",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
            }}
          >
            <FavoriteIcon sx={{ mr: 2, fontSize: 40 }} />
            My Favorites ({favoritesCount})
          </Typography>

          {/* Clear all favorites button */}
          <Button
            variant="outlined"
            startIcon={<ClearIcon />}
            onClick={clearFavorites}
            sx={{ borderRadius: 3 }}
          >
            Clear All
          </Button>
        </Box>

        {/* Recipe list with adaptive grid layout based on number of favorites */}
        <RecipeList
          recipes={favorites}
          adaptiveGrid={true}
          favoriteCount={favoritesCount}
        />
      </Container>
    </>
  );
}
