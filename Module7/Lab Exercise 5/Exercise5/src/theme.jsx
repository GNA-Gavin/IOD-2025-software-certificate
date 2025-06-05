// MUI Theme Configuration - Defines global styling, color schemes, and component overrides
// createTheme: MUI's theme factory function for customizing Material Design system
import { createTheme } from '@mui/material/styles';

// Light Theme Configuration
// Palette: Defines color schemes for different UI states and semantic meaning
// Components: Global component style overrides for consistent design language
export const lightTheme = createTheme({
  palette: {
    mode: 'light', // Enables light mode color calculations and contrasts
    primary: {
      main: '#006666', // Custom teal - used for primary actions, navigation, focus states
    },
    secondary: {
      main: '#d32f2f', // Red accent - used for secondary actions, warnings, alerts
    },
    background: {
      default: '#f5f5f5', // Main page background - subtle gray for reduced eye strain
      paper: '#ffffff',   // Card/surface backgrounds - pure white for content areas
    },
  },
  // Component-specific style overrides - applies globally to all instances
  components: {
    // Global Button styling - affects all Button components throughout the app
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Rounded corners for modern, friendly appearance
        },
      },
    },
    // Global Paper styling - affects Cards, Modals, Dialogs, and elevated surfaces
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Consistent rounded corners across all elevated surfaces
        },
      },
    },
  },
});

// Dark Theme Configuration - Optimized colors and contrasts for dark mode viewing
export const darkTheme = createTheme({
  palette: {
    mode: 'dark', // Enables dark mode color calculations and automatic contrast adjustments
    primary: {
      main: '#80cbc4', // Lighter teal variant - better visibility against dark backgrounds
    },
    secondary: {
      main: '#ff8a80', // Softer red tone - easier on eyes in dark environments
    },
    background: {
      default: '#121212', // Very dark gray - reduces blue light and eye strain
      paper: '#222222',   // Slightly lighter for elevated surfaces - creates depth hierarchy
    },
    text: {
      primary: '#ffffff',   // High contrast white - ensures readability
      secondary: '#b3b3b3', // Muted gray - for less important text and descriptions
    },
  },
  // Identical component overrides ensure consistency across light/dark themes
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Maintains design consistency across theme modes
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Unified surface design language for both themes
        },
      },
    },
  },
});