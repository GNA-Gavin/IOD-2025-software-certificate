// Home Page Component - Main landing page with welcome message and mood tracker
// Component imports for modular architecture
import Emoji from "../components/Emoji";
// MUI Components for consistent styling and layout
import { Container, Typography, Box } from "@mui/material";

function Home() {
  return (
    <>
    {/* Container: Responsive wrapper that centers content and applies max-width constraints */}
    {/* maxWidth="lg": Large breakpoint (1200px) for spacious homepage layout */}
    <Container maxWidth="lg">
      {/* Box: Flexible container for custom styling and spacing */}
      {/* textAlign="center": Centers all text content horizontally for welcoming presentation */}
      {/* py={4}: Vertical padding (top + bottom) of 32px using theme spacing system */}
      <Box sx={{ textAlign: "center", py: 4 }}>
        {/* Typography: Main page heading with semantic HTML structure */}
        {/* variant="h2": Large heading size (3.75rem) for prominent page title */}
        {/* component="h1": Renders as h1 HTML element for proper semantic structure and SEO */}
        {/* gutterBottom: Adds consistent bottom margin using Material Design spacing */}
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to my Home page!!!
        </Typography>
        
        {/* Typography: Subtitle with additional context */}
        {/* variant="h5": Medium heading size (1.5rem) for secondary information */}
        {/* color="text.secondary": Muted text color for visual hierarchy */}
        {/* sx={{ mb: 4 }}: Bottom margin of 32px for section spacing */}
        <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
          Track your mood with our interactive emoji component
        </Typography>
      </Box>
      
      {/* Emoji Component: Interactive mood tracker with MUI styling integration */}
      {/* This component demonstrates context usage, theme integration, and state management */}
      <Emoji />
    </Container>
    </>
  );
}

export default Home;