import { useLocation } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import { useMealDB } from "../hooks/useMealDB";
import { useMealDBByCategory } from "../hooks/useMealDBByCategory";
import { useMealDBByArea } from "../hooks/useMealDBByArea";
import RecipeList from "../components/RecipeList";
import {
  RecipeListSkeleton,
  ErrorState,
  EmptyState,
} from "../components/LoadingStateComponents";

// Custom hook to parse URL search parameters
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchResults() {
  const query = useQuery();
  const searchTerm = query.get("s"); // Search by name parameter
  const category = query.get("c"); // Search by category parameter
  const area = query.get("a"); // Search by area/cuisine parameter

  // Determine which hook to use based on query parameters
  let hookResult;
  let title;

  if (searchTerm) {
    hookResult = useMealDB(searchTerm); // Search recipes by name
    title = `Results for "${searchTerm}"`;
  } else if (category) {
    hookResult = useMealDBByCategory(category); // Filter recipes by category
    title = `${category} Recipes`;
  } else if (area) {
    hookResult = useMealDBByArea(area); // Filter recipes by cuisine/area
    title = `${area} Cuisine`;
  } else {
    // Default fallback when no search criteria provided
    hookResult = { meals: [], loading: false, error: null };
    title = "No search criteria provided";
  }

  const { meals: recipes, loading, error } = hookResult;

  // Show loading state with skeleton placeholders
  if (loading) {
    return (
      <>
        {/* Container with title that persists during loading */}
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ textAlign: "center", mb: 3 }}
          >
            {title}
          </Typography>
          {/* Skeleton loader mimicking recipe grid layout */}
          <RecipeListSkeleton />
        </Container>
      </>
    );
  }

  // Show error state if data fetching failed
  if (error) {
    return <ErrorState message={`Error fetching data: ${error}`} />;
  }

  // Show empty state if no recipes found
  if (!recipes || recipes.length === 0) {
    return (
      <EmptyState message={`No recipes found for ${title.toLowerCase()}`} />
    );
  }

  // Main content - display search results
  return (
    <>
      {/* Main container for search results */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Results title showing what was searched for */}
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{ textAlign: "center", mb: 3 }}
        >
          {title}
        </Typography>
        {/* Grid of recipe cards matching the search criteria */}
        <RecipeList recipes={recipes} />
      </Container>
    </>
  );
}
