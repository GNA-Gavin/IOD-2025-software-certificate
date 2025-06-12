import { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Box,
  Tabs,
  Tab,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMealDBCategories } from "../hooks/useMealDBCategories";
import { useMealDBAreas } from "../hooks/useMealDBAreas";
import {
  CategoriesLoadingState,
  AreasLoadingState,
  ErrorState,
} from "../components/LoadingStateComponents";

export default function Browse() {
  const [activeTab, setActiveTab] = useState(0); // Track which tab is active (0 = Categories, 1 = Cuisines)
  const navigate = useNavigate(); // React Router hook for navigation

  // Fetch categories data with loading and error states
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useMealDBCategories();

  // Fetch areas/cuisines data with loading and error states
  const { areas, loading: areasLoading, error: areasError } = useMealDBAreas();

  // Navigate to search results filtered by category
  const handleCategoryClick = (category) => {
    navigate(`/search?c=${encodeURIComponent(category)}`);
  };

  // Navigate to search results filtered by cuisine/area
  const handleAreaClick = (area) => {
    navigate(`/search?a=${encodeURIComponent(area)}`);
  };

  // Handle loading states - show appropriate loading component based on active tab
  if (categoriesLoading || areasLoading) {
    return activeTab === 0 ? <CategoriesLoadingState /> : <AreasLoadingState />;
  }

  // Handle error states for categories
  if (categoriesError) {
    return (
      <ErrorState message={`Error loading categories: ${categoriesError}`} />
    );
  }

  // Handle error states for cuisines
  if (areasError) {
    return <ErrorState message={`Error loading cuisines: ${areasError}`} />;
  }

  return (
    <>
      {/* Main container with responsive layout */}
      <Container maxWidth="lg" sx={{ py: 4, mt: 2 }}>
        {/* Page title */}
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ textAlign: "center", mb: 3 }}
        >
          Browse Recipes
        </Typography>

        {/* Tab navigation for switching between Categories and Cuisines */}
        <Paper sx={{ mb: 3 }}>
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            centered
          >
            <Tab label="Categories" />
            <Tab label="Cuisines" />
          </Tabs>
        </Paper>

        {/* Container for tab content */}
        <Box sx={{ position: "relative" }}>
          {/* Categories Tab Content - shows recipe categories as clickable cards */}
          <Box
            sx={{
              display: activeTab === 0 ? "block" : "none",
              pt: 2,
              minHeight: "400px",
            }}
          >
            {/* Responsive grid layout for category cards */}
            <Grid container spacing={3}>
              {categories.map((category) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={category.idCategory}>
                  {/* Clickable category card with image and description */}
                  <Card
                    sx={{
                      cursor: "pointer",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      "&:hover": { boxShadow: 4 }, // Enhanced shadow on hover
                    }}
                    onClick={() => handleCategoryClick(category.strCategory)}
                  >
                    {/* Category image */}
                    <CardMedia
                      component="img"
                      height="200"
                      image={category.strCategoryThumb}
                      alt={category.strCategory}
                    />
                    {/* Category title and description */}
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" gutterBottom>
                        {category.strCategory}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ lineHeight: 1.6 }}
                      >
                        {category.strCategoryDescription}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Cuisines Tab Content - shows cuisine/area options as clickable chips */}
          <Box
            sx={{
              display: activeTab === 1 ? "block" : "none",
              pt: 2,
              minHeight: "400px",
            }}
          >
            {/* Centered flex container for cuisine chips */}
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
                justifyContent: "center",
              }}
            >
              {areas.map((area) => (
                // Clickable cuisine chip with hover effects
                <Chip
                  key={area.strArea}
                  label={area.strArea}
                  onClick={() => handleAreaClick(area.strArea)}
                  variant="outlined"
                  sx={{
                    m: 0.5,
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "primary.main", // Primary color background on hover
                      color: "primary.contrastText", // Contrasting text color
                    },
                  }}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}
