import { Container, Typography, Box, Paper } from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import SearchBar from "../components/SearchBar";

export default function Home() {
  return (
    <>
      {/* Main container with responsive max width */}
      <Container maxWidth="md">
        {/* Centered content box with padding */}
        <Box sx={{ textAlign: "center", py: 4 }}>
          {/* Main page title with restaurant icon */}
          <Typography variant="h3" component="h1" gutterBottom>
            <RestaurantIcon
              sx={{ fontSize: 40, mr: 1, verticalAlign: "middle" }}
            />
            Recipe Explorer
          </Typography>
          {/* Subtitle with instructions */}
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Search for delicious meals below:
          </Typography>

          {/* Elevated paper container for search functionality */}
          <Paper elevation={2} sx={{ p: 3, mt: 3 }}>
            <SearchBar />
          </Paper>
        </Box>
      </Container>
    </>
  );
}
