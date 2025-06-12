import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardMedia,
  List,
  ListItem,
  ListItemText,
  Box,
  Chip,
  Paper,
  Divider,
} from "@mui/material";
import {
  Restaurant as RestaurantIcon,
  PlayArrow as PlayArrowIcon,
  AccessTime as TimeIcon,
} from "@mui/icons-material";
import { useMealDBById } from "../hooks/useMealDBById";
import FavoriteButton from "../components/FavoriteButton";
import {
  RecipeLoadingState,
  RecipeErrorState,
  RecipeNotFoundState,
} from "../components/LoadingStateComponents";

export default function RecipePage() {
  const { id } = useParams(); // Extract recipe ID from URL parameters
  const { meal: recipe, loading, error } = useMealDBById(id); // Fetch recipe data by ID

  // Show loading state while recipe data is being fetched
  if (loading) {
    return <RecipeLoadingState />;
  }

  // Show error state if recipe fetching failed
  if (error) {
    return <RecipeErrorState error={error} />;
  }

  // Show not found state if recipe doesn't exist
  if (!recipe) {
    return <RecipeNotFoundState />;
  }

  // Parse ingredients from recipe data (dynamically find all ingredients)
  const ingredients = [];
  let i = 1;
  while (recipe[`strIngredient${i}`]) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push({
        ingredient: ingredient.trim(),
        measure: measure?.trim() || "",
      });
    }
    i++;
  }

  return (
    <>
      {/* Main container with responsive max width */}
      <Container maxWidth="md" sx={{ py: 4 }}>
        {/* Recipe header section with title, icon, and favorite button */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
              mb: 2,
            }}
          >
            {/* Recipe title with restaurant icon */}
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
              }}
            >
              <RestaurantIcon sx={{ fontSize: 48, mr: 2 }} />
              {recipe.strMeal}
            </Typography>
            {/* Favorite button for adding/removing from favorites */}
            <FavoriteButton recipe={recipe} size="large" />
          </Box>

          {/* Recipe metadata chips (category, cuisine, tags) */}
          <Box
            sx={{
              display: "flex",
              gap: 1.5,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {recipe.strCategory && (
              <Chip
                label={recipe.strCategory}
                color="primary"
                variant="filled"
                sx={{ fontWeight: 600 }}
              />
            )}
            {recipe.strArea && (
              <Chip
                label={recipe.strArea}
                color="secondary"
                variant="filled"
                sx={{ fontWeight: 600 }}
              />
            )}
            {recipe.strTags && (
              <Chip
                label={recipe.strTags}
                variant="outlined"
                sx={{ fontWeight: 500 }}
              />
            )}
          </Box>
        </Box>

        {/* Recipe image with blurred background effect */}
        <Card
          sx={{
            mb: 4,
            overflow: "hidden",
            boxShadow: 3,
            position: "relative",
            "&:hover": {
              boxShadow: 6,
              transform: "translateY(-2px)",
              transition: "all 0.3s ease-in-out",
            },
          }}
        >
          {/* Blurred background layer to eliminate whitespace */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${recipe.strMealThumb})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(20px) brightness(0.3)",
              transform: "scale(1.1)", // Slightly larger to avoid blur edges
              zIndex: 1,
            }}
          />
          {/* Main recipe image showing full image without cropping */}
          <CardMedia
            component="img"
            image={recipe.strMealThumb}
            alt={recipe.strMeal}
            sx={{
              width: "100%",
              height: "auto",
              maxHeight: 500,
              objectFit: "contain", // Show full image without cropping
              position: "relative",
              zIndex: 2,
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.02)",
              },
            }}
          />
        </Card>

        {/* Ingredients section with themed styling */}
        <Paper
          elevation={3}
          sx={{
            p: 4,
            mb: 4,
            background:
              "linear-gradient(135deg, rgba(255, 107, 53, 0.05) 0%, rgba(76, 175, 80, 0.05) 100%)",
          }}
        >
          {/* Section title with icon */}
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{
              mb: 3,
              color: "primary.main",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
            }}
          >
            <RestaurantIcon sx={{ mr: 1 }} />
            Ingredients
          </Typography>
          <Divider sx={{ mb: 3, borderColor: "primary.main", opacity: 0.3 }} />
          {/* List of ingredients with measurements */}
          <List sx={{ "& .MuiListItem-root": { py: 1 } }}>
            {ingredients.map((item, i) => (
              <ListItem
                key={i}
                divider={i < ingredients.length - 1}
                sx={{
                  borderRadius: 1,
                  mb: 0.5,
                  "&:hover": {
                    backgroundColor: "action.hover",
                  },
                }}
              >
                <ListItemText
                  primary={`${item.measure?.trim()} ${item.ingredient}`}
                  primaryTypographyProps={{
                    variant: "body1",
                    fontWeight: 500,
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Paper>

        {/* Instructions section with themed styling */}
        <Paper
          elevation={3}
          sx={{
            p: 4,
            background:
              "linear-gradient(135deg, rgba(76, 175, 80, 0.05) 0%, rgba(255, 107, 53, 0.05) 100%)",
          }}
        >
          {/* Section title with time icon */}
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{
              mb: 3,
              color: "secondary.main",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
            }}
          >
            <TimeIcon sx={{ mr: 1 }} />
            Instructions
          </Typography>
          <Divider
            sx={{ mb: 3, borderColor: "secondary.main", opacity: 0.3 }}
          />
          {/* Recipe instructions with preserved line breaks */}
          <Typography
            variant="body1"
            sx={{
              lineHeight: 1.8,
              whiteSpace: "pre-line", // Preserve line breaks from API
              fontSize: "1.1rem",
            }}
          >
            {recipe.strInstructions}
          </Typography>
        </Paper>

        {/* Optional video tutorial section */}
        {recipe.strYoutube && (
          <Paper
            elevation={3}
            sx={{
              mt: 4,
              p: 4,
              textAlign: "center",
              background:
                "linear-gradient(135deg, rgba(255, 107, 53, 0.1) 0%, rgba(76, 175, 80, 0.1) 100%)",
            }}
          >
            {/* Video section title with play icon */}
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                color: "primary.main",
                fontWeight: 600,
                mb: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <PlayArrowIcon sx={{ mr: 1, fontSize: 32 }} />
              Video Tutorial
            </Typography>
            <Divider
              sx={{ mb: 3, borderColor: "primary.main", opacity: 0.3 }}
            />
            {/* Embedded YouTube video iframe */}
            <Box
              component="iframe"
              src={recipe.strYoutube.replace("watch?v=", "embed/")} // Convert YouTube URL to embeddable format
              title="Recipe Video"
              allowFullScreen
              sx={{
                width: "100%",
                height: 630,
                border: "none",
                borderRadius: 2,
                boxShadow: 2,
              }}
            />
          </Paper>
        )}
      </Container>
    </>
  );
}
