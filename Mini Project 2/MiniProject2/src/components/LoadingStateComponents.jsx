import {
  Container,
  CircularProgress,
  Typography,
  Alert,
  Skeleton,
  Box,
  Grid,
} from "@mui/material";

// Generic loading component with spinner and customizable message
export function LoadingState({ message = "Loading...", containerProps = {} }) {
  return (
    <Container
      maxWidth="md"
      sx={{ py: 4, textAlign: "center", ...containerProps.sx }}
      {...containerProps}
    >
      {/* Circular loading spinner */}
      <CircularProgress size={60} />
      {/* Loading message below spinner */}
      <Typography variant="h6" sx={{ mt: 2 }}>
        {message}
      </Typography>
    </Container>
  );
}

// Generic error component displaying error messages in an alert
export function ErrorState({
  message = "An error occurred",
  containerProps = {},
}) {
  return (
    <Container
      maxWidth="md"
      sx={{ py: 4, ...containerProps.sx }}
      {...containerProps}
    >
      {/* Red error alert with customizable message */}
      <Alert severity="error">{message}</Alert>
    </Container>
  );
}

// Generic empty state component for when no data is available
export function EmptyState({
  message = "No data found",
  severity = "warning",
  containerProps = {},
}) {
  return (
    <Container
      maxWidth="md"
      sx={{ py: 4, ...containerProps.sx }}
      {...containerProps}
    >
      {/* Alert with customizable severity (warning, info, etc.) */}
      <Alert severity={severity}>{message}</Alert>
    </Container>
  );
}

// Skeleton placeholder mimicking a single recipe card layout
export function RecipeCardSkeleton() {
  return (
    <Box sx={{ maxWidth: 345, margin: 2 }}>
      {/* Placeholder for recipe image */}
      <Skeleton variant="rectangular" height={200} />
      <Box sx={{ p: 2 }}>
        {/* Placeholder for recipe title */}
        <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} />
        {/* Placeholder for recipe description */}
        <Skeleton variant="text" />
        <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
          {/* Placeholders for category and cuisine chips */}
          <Skeleton variant="rounded" width={80} height={24} />
          <Skeleton variant="rounded" width={60} height={24} />
        </Box>
      </Box>
    </Box>
  );
}

// Grid of skeleton cards to show while recipe lists are loading
export function RecipeListSkeleton({ count = 6 }) {
  return (
    <Container maxWidth="lg">
      {/* Responsive grid matching the actual RecipeList layout */}
      <Grid container spacing={3} sx={{ justifyContent: "center", mt: 2 }}>
        {Array.from({ length: count }).map((_, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
            <RecipeCardSkeleton />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

// Loading states for different contexts
export function RecipeLoadingState() {
  return <LoadingState message="Loading recipe..." />;
}

export function RecipesLoadingState() {
  return <LoadingState message="Loading recipes..." />;
}

export function CategoriesLoadingState() {
  return <LoadingState message="Loading categories..." />;
}

export function AreasLoadingState() {
  return <LoadingState message="Loading cuisines..." />;
}

// Error and empty states for recipes
export function RecipeErrorState({ error }) {
  return <ErrorState message={`Error: ${error}`} />;
}

export function RecipeNotFoundState() {
  return <EmptyState message="Recipe not found" />;
}
