// Navigation Bar Component - Fixed header with routing, theme toggle, and responsive design
// React Router hooks for navigation and current location tracking
import { Link, useLocation } from "react-router-dom";
// MUI theme hook for accessing current theme colors and accessing theme properties
import { useTheme } from "@mui/material/styles";
// MUI Layout and Navigation Components
import {
  AppBar,     // Top navigation bar with Material Design styling and positioning
  Toolbar,    // Container for navigation items with proper spacing and alignment
  Typography, // Semantic text component for logo/brand text with theme typography
  Button,     // Navigation buttons with hover states and accessibility features
  Box,        // Flexible container for custom layouts and grouping elements
  IconButton, // Specialized button for icon-only interactions (theme toggle)
  Stack,      // Flexbox container with consistent spacing between navigation items
} from "@mui/material";
// Material Design Icons - Scalable vector icons that integrate with theme colors
import HomeIcon from "@mui/icons-material/Home";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import LoginIcon from "@mui/icons-material/Login";
import Brightness4Icon from "@mui/icons-material/Brightness4"; // Dark mode icon
import Brightness7Icon from "@mui/icons-material/Brightness7"; // Light mode icon

export default function NavBar({ toggleDarkMode }) {
  // Theme hook: Access current theme for colors, spacing, and responsive breakpoints
  const theme = useTheme();
  // Location hook: Track current route for active navigation state highlighting
  const location = useLocation();

  // Helper function: Determines if current route matches navigation button
  const isActive = (path) => location.pathname === path;

  return (
    <>
    {/* AppBar: Material Design top navigation bar component */}
    {/* position="fixed": Stays at top during scroll, requires Toolbar spacer in App.jsx */}
    {/* elevation={2}: Medium shadow depth for subtle separation from content */}
    <AppBar
      position="fixed"
      elevation={2}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1, // Ensures navbar appears above other elements
        borderRadius: 0, // Remove any border radius to eliminate rounded edges
        width: "100%", // Ensure full width coverage
        left: 0, // Ensure positioning starts from absolute left
        right: 0, // Ensure positioning extends to absolute right
      }}
    >
      {/* Removed Container to allow full-width edge-to-edge layout */}
      {/* Toolbar: Provides consistent height and spacing for navigation items */}
      {/* space-between: Distributes items evenly with space at edges */}
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          py: 1, // Vertical padding using theme spacing
          px: 2, // Add horizontal padding directly to Toolbar for content spacing
          maxWidth: "100%", // Ensure toolbar takes full width
          width: "100%", // Explicit width setting
        }}
      >
          {/* Brand/Logo Section - Absolute left edge */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* Typography: Brand text positioned at absolute left edge */}
            {/* variant="h6": Medium heading size (1.25rem) */}
            {/* Removed minWidth constraint to allow true left edge positioning */}
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 600, // Semi-bold text weight
                color: "inherit", // Inherit color from theme
              }}
            >
              MUI Exercise
            </Typography>
          </Box>

          {/* Navigation Links Section - Center of navigation */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center", // Centers navigation items
              flexGrow: 1, // Takes up remaining space between brand and theme toggle
            }}
          >
            {/* Stack: Flexbox container with consistent spacing between items */}
            {/* direction="row": Horizontal layout (default is column) */}
            {/* spacing={2}: 16px gap between navigation buttons */}
            <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
              {/* Navigation Button: Home */}
              {/* variant: "contained" for active state, "text" for inactive */}
              {/* component={Link}: Renders as React Router Link for SPA navigation */}
              <Button
                variant={isActive("/") ? "contained" : "text"} // Dynamic styling based on active route
                component={Link} // React Router integration
                to="/"
                startIcon={<HomeIcon />} // Material Design icon with automatic spacing
                sx={{
                  fontWeight: 500,
                  px: 2, // Horizontal padding: 16px
                  py: 1, // Vertical padding: 8px
                  color: isActive("/") ? undefined : "inherit", // Inherit color when not active
                }}
              >
                Home
              </Button>

              {/* Navigation Button: Bitcoin Rates */}
              <Button
                variant={isActive("/BitcoinRates") ? "contained" : "text"}
                component={Link}
                to="/BitcoinRates"
                startIcon={<CurrencyBitcoinIcon />}
                sx={{
                  fontWeight: 500,
                  px: 2,
                  py: 1,
                  color: isActive("/BitcoinRates") ? undefined : "inherit",
                }}
              >
                Bitcoin Rates
              </Button>

              {/* Navigation Button: Login */}
              <Button
                variant={isActive("/Login") ? "contained" : "text"}
                component={Link}
                to="/Login"
                startIcon={<LoginIcon />}
                sx={{
                  fontWeight: 500,
                  px: 2,
                  py: 1,
                  color: isActive("/Login") ? undefined : "inherit",
                }}
              >
                Login
              </Button>
            </Stack>
          </Box>

          {/* Theme Toggle Section - Absolute right edge */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* IconButton: Specialized button component for icon-only interactions */}
            {/* color="inherit": Uses current text color from parent theme */}
            {/* aria-label: Accessibility label for screen readers */}
            {/* Positioned at absolute right edge by removing width constraints */}
            <IconButton
              onClick={toggleDarkMode}
              color="inherit"
              aria-label="toggle dark/light mode"
              sx={{
                p: 1, // Padding: 8px
                "&:hover": {
                  backgroundColor: "action.hover", // Theme-aware hover background
                },
              }}
            >
              {/* Conditional icon rendering based on current theme mode */}
              {/* Uses theme.palette.mode to determine which icon to show */}
              {theme.palette.mode === "dark" ? (
                <Brightness7Icon /> // Sun icon for switching to light mode
              ) : (
                <Brightness4Icon /> // Moon icon for switching to dark mode
              )}
            </IconButton>
          </Box>
        </Toolbar>
      {/* Removed Container closing tag - now using direct AppBar layout */}
    </AppBar>
</>
  );
}
