// Main App Component - Root component that sets up theming, context providers, and layout
import { useState } from 'react';
// MUI Theme System - Provides consistent design tokens and dark/light mode switching
import { ThemeProvider } from '@mui/material/styles'; // Makes theme available to all child components
import CssBaseline from '@mui/material/CssBaseline'; // Normalizes CSS and applies theme background colors
import { Box, Toolbar } from '@mui/material';
// Custom theme configurations for light and dark modes
import { lightTheme, darkTheme } from './theme';
import './App.css';
// Context Providers - Global state management for user and mood data
import { UserProvider } from './context/UserContext';
import { MoodProvider } from './context/MoodContext';
// Application components
import AppRoutes from './AppRoutes';
import NavBar from './components/NavBar';

function App() {
  // Theme state management - controls light/dark mode switching
  const [darkMode, setDarkMode] = useState(false);
  const theme = darkMode ? darkTheme : lightTheme; // Conditional theme selection
  const toggleDarkMode = () => {
    setDarkMode(!darkMode); // Theme switching function passed to NavBar
  };

  return (
    <>
    {/* ThemeProvider: Makes MUI theme available to all child components via React Context */}
    {/* Enables consistent colors, typography, spacing, and component styling throughout app */}
    <ThemeProvider theme={theme}>
      {/* CssBaseline: MUI's CSS normalization component */}
      {/* - Removes browser default margins/padding inconsistencies */}
      {/* - Applies theme background colors to html/body */}
      {/* - Sets up consistent typography defaults */}
      <CssBaseline />
      
      {/* Context Providers: Wrap app in global state management */}
      {/* UserProvider: Manages login state and user information */}
      <UserProvider>
        {/* MoodProvider: Manages emoji mood state for the home page */}
        <MoodProvider>
          {/* Fixed Navigation Bar with theme toggle functionality */}
          <NavBar toggleDarkMode={toggleDarkMode} />
          
          {/* Toolbar: MUI spacing component that pushes content below fixed AppBar */}
          {/* Prevents content from hiding behind the fixed navigation */}
          <Toolbar />
          
          {/* Box: Main content area with MUI theming and layout properties */}
          {/* component="main": Renders semantic HTML <main> element for accessibility */}
          {/* sx props: MUI's styling system using theme tokens */}
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}> {/* flexGrow: takes remaining space, p: padding */}
            {/* Application routing - renders different pages based on URL */}
            <AppRoutes />
          </Box>
        </MoodProvider>
      </UserProvider>
    </ThemeProvider>
    </>
  );
}

export default App;