import { useMoodContext } from "../context/MoodContext";
// MUI Core Components - Building blocks for Material Design UI
import {
  Paper,      // Creates elevated surfaces with shadow - replaces div with better UX
  Typography, // Semantic text component with Material Design typography scales
  Button,     // Interactive button with variants, states, and accessibility features
  Box,        // Flexible container for custom layouts - like div but with MUI theme integration
  Container,  // Responsive wrapper that centers content and applies max-width breakpoints
  Chip        // Compact element for displaying status, tags, or interactive selections
} from "@mui/material";
// MUI Theme Hook - Provides access to the current theme colors, spacing, and breakpoints
import { useTheme } from "@mui/material/styles";
// MUI Icons - Material Design icons that scale and theme automatically
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import RefreshIcon from '@mui/icons-material/Refresh';

function Emoji() {
  const { isHappy, handleChangeMood } = useMoodContext();
  // useTheme Hook: Accesses the current theme object (colors, spacing, shadows, etc.)
  // This allows components to adapt to light/dark mode and use consistent design tokens
  const theme = useTheme();

  return (
    <>
    {/* Container: Responsive wrapper that centers content and applies consistent max-width */}
    {/* maxWidth="sm" sets maximum width to 600px on larger screens, full width on mobile */}
    <Container maxWidth="sm">
      {/* Paper: Creates an elevated card surface with Material Design shadow system */}
      {/* elevation={4} applies medium shadow depth - higher numbers = more prominent shadows */}
      <Paper 
        elevation={4} 
        sx={{ 
          padding: 4, // Uses theme spacing system (4 = 32px by default)
          textAlign: 'center',
          // Linear gradient background using theme colors for consistent branding
          background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.primary.light || theme.palette.primary.main}15 100%)`,
          border: `1px solid ${theme.palette.divider}` // Theme-aware border color
        }}
      >
        {/* Box: Flexible container for grouping related elements with consistent spacing */}
        <Box sx={{ mb: 3 }}> {/* mb: margin-bottom using theme spacing */}
          {/* Typography: Semantic text component with Material Design typography scales */}
          {/* variant="h4": Sets font size, weight, and line-height according to Material Design */}
          {/* component="h2": Renders as h2 HTML element for proper semantic structure */}
          <Typography 
            variant="h4" 
            component="h2" 
            gutterBottom  // Adds consistent bottom margin
            sx={{ 
              color: 'primary.main', // Uses theme primary color
              fontWeight: 600
            }}
          >
            Mood Tracker
          </Typography>
          
          <Box sx={{ mb: 2 }}>
            {/* Typography variant="h1": Largest text scale, used here for emoji display */}
            <Typography 
              variant="h1" 
              sx={{ 
                fontSize: "5rem", // Custom size override for emoji
                lineHeight: 1,    // Tight line height for better emoji display
                mb: 1
              }}
            >
              {isHappy ? "😊" : "😢"}
            </Typography>
          </Box>

          {/* Chip: Compact element for displaying status, labels, or interactive selections */}
          {/* Combines icon + text in a visually cohesive pill-shaped container */}
          <Chip
            icon={isHappy ? <SentimentSatisfiedIcon /> : <SentimentDissatisfiedIcon />} // Conditional icon based on mood
            label={`Current Mood: ${isHappy ? "Happy" : "Sad"}`} // Dynamic text content
            color={isHappy ? "primary" : "secondary"} // Theme color based on mood state
            variant="outlined" // Outlined style (border) vs filled style
            sx={{ 
              fontSize: "1rem",
              padding: "8px 4px",
              mb: 3
            }}
          />
        </Box>

        {/* Button: Interactive Material Design button with multiple variants and built-in accessibility */}
        {/* variant="contained": Filled button style (vs "outlined" or "text") */}
        {/* size="large": Predefined size scale for consistent button sizing */}
        {/* startIcon: Adds icon to the left of button text with proper spacing */}
        <Button
          variant="contained"
          size="large"
          onClick={handleChangeMood}
          startIcon={<RefreshIcon />} // Material Design refresh icon
          sx={{
            px: 4,  // Horizontal padding using theme spacing
            py: 1.5, // Vertical padding using theme spacing
            fontSize: "1.1rem",
            fontWeight: 500,
            // Dynamic gradient background based on mood state using theme colors
            background: isHappy 
              ? `linear-gradient(45deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark || theme.palette.secondary.main})`
              : `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark || theme.palette.primary.main})`,
            // Hover state with smooth animation effects
            '&:hover': {
              transform: 'translateY(-2px)', // Lift effect on hover
              boxShadow: theme.shadows[8],   // Uses theme shadow system
            },
            transition: 'all 0.3s ease' // Smooth transitions for all property changes
          }}
        >
          Change Mood
        </Button>
      </Paper>
    </Container>
    </>
  );
}

export default Emoji;
