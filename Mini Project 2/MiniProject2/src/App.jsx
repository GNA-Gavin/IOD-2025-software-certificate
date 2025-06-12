import { useState } from "react";
import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { lightTheme, darkTheme } from "./theme";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";
import { Box, Toolbar } from "@mui/material";
import { FavoritesProvider } from "./contexts/FavoritesContext";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false); // State to track dark/light mode

  // Function to toggle between dark and light themes
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <>
      {/* Theme provider applies light or dark theme throughout the app */}
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        {/* CssBaseline provides consistent CSS baseline across browsers */}
        <CssBaseline />
        {/* FavoritesProvider makes favorites context available to all components */}
        <FavoritesProvider>
          {/* Fixed navigation bar with theme toggle functionality */}
          <Navbar toggleDarkMode={toggleDarkMode} />
          {/* Main content area with proper layout for fixed navbar */}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            {/* Toolbar spacer to account for fixed navbar height */}
            <Toolbar />
            {/* Container for all page content */}
            <Box sx={{ flexGrow: 1 }}>
              <AppRoutes />
            </Box>
          </Box>
        </FavoritesProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
