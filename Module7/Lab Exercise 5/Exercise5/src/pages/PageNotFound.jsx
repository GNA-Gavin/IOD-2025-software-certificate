// 404 Page Not Found Component - User-friendly error page with navigation back to app
// React Router for navigation between routes
import { Link } from "react-router-dom";
// MUI Components for layout, typography, and user feedback
import {
  Container,     // Responsive wrapper that centers content and applies max-width constraints
  Paper,         // Elevated surface component for creating card-like containers with shadows
  Typography,    // Semantic text component with Material Design typography scales and hierarchy
  Button,        // Interactive button component with router integration for navigation
  Box,           // Flexible container for custom layouts and visual grouping
  Alert,         // User feedback component for informational messages and guidance
} from "@mui/material";
// Material Design Icons for visual context and error communication
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline"; // Error/warning icon for 404 state
import HomeIcon from "@mui/icons-material/Home";                 // Home icon for navigation button

function PageNotFound() {
  return (
    <>
    {/* Container: Responsive wrapper with medium max-width for error page content */}
    {/* maxWidth="md": 900px max-width for comfortable reading experience */}
    {/* mt={8}: Large top margin (64px) to center content vertically */}
    <Container maxWidth="md" sx={{ mt: 8 }}>
      {/* Paper: Elevated card surface for visual separation and focus */}
      {/* elevation={3}: Medium shadow depth for subtle prominence */}
      {/* p={6}: Large padding (48px) for spacious layout */}
      {/* textAlign="center": Centers all text content horizontally */}
      <Paper
        elevation={3}
        sx={{
          p: 6,
          textAlign: "center",
          backgroundColor: "background.paper", // Theme-aware background color
        }}
      >
        {/* Error Content Section: Icon and primary messaging */}
        <Box sx={{ mb: 4 }}> {/* Bottom margin: 32px for section spacing */}
          {/* Error Icon: Large visual indicator for 404 state */}
          {/* fontSize: 80px for prominent visual impact */}
          {/* color="error.main": Uses theme's error color (typically red) */}
          <ErrorOutlineIcon
            sx={{
              fontSize: 80,
              color: "error.main", // Theme error color for visual consistency
              mb: 2,               // Bottom margin: 16px
            }}
          />
          
          {/* Main Error Code: Large 404 number */}
          {/* variant="h2": Largest heading size (3.75rem) for maximum impact */}
          {/* component="h1": Renders as h1 HTML element for semantic structure and SEO */}
          <Typography variant="h2" component="h1" gutterBottom>
            404
          </Typography>
          
          {/* Error Title: Descriptive heading for the error state */}
          {/* variant="h5": Medium heading size (1.5rem) for secondary information */}
          {/* color="text.secondary": Muted text color for visual hierarchy */}
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            color="text.secondary"
          >
            Page Not Found!
          </Typography>
          
          {/* Error Description: Helpful explanation for users */}
          {/* variant="body1": Standard body text size (1rem) for detailed information */}
          <Typography variant="body1" sx={{ mb: 3 }}>
            The page you're looking for doesn't exist or has been moved.
          </Typography>
        </Box>

        {/* Informational Alert: Helpful guidance for next steps */}
        {/* severity="info": Blue styling with info icon for guidance */}
        <Alert severity="info" sx={{ mb: 4 }}>
          Don't worry! You can navigate back to our homepage to continue
          exploring.
        </Alert>

        {/* Navigation Button: Return to homepage functionality */}
        {/* component={Link}: Integrates with React Router for SPA navigation */}
        {/* variant="contained": Filled button style for primary action */}
        {/* size="large": Larger button size for prominent call-to-action */}
        <Button
          component={Link}         // React Router Link integration
          to="/"                   // Navigate to homepage route
          variant="contained"
          size="large"
          startIcon={<HomeIcon />} // Material Design home icon
          sx={{ mt: 2 }}           // Top margin: 16px using theme spacing
        >
          Go to Home
        </Button>
      </Paper>
    </Container>
    </>
  );
}

export default PageNotFound;
