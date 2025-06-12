import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import CategoryIcon from "@mui/icons-material/Category";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import NavbarSearchBar from "./NavbarSearchBar";
import { useFavorites } from "../contexts/FavoritesContext";

export default function Navbar({ toggleDarkMode }) {
  const theme = useTheme(); // Access to MUI theme for consistent styling
  const location = useLocation(); // React Router hook to get current route
  const { favoritesCount } = useFavorites(); // Get count of favorited recipes
  const isActive = (path) => location.pathname === path; // Helper to check if current route matches

  return (
    <>
      {/* Fixed navigation bar at top of screen */}
      <AppBar
        position="fixed"
        elevation={2}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1, // Ensure navbar stays above other components
          borderRadius: 0,
          width: "100%",
          left: 0,
          right: 0,
        }}
      >
        {/* Toolbar container for navbar content with responsive layout */}
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            py: 1,
            px: 2,
            maxWidth: "100%",
            width: "100%",
          }}
        >
          {/* Left section: App logo and title */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 600,
                color: "inherit",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <RestaurantMenuIcon sx={{ fontSize: "1.5rem" }} />
              Recipe Finder
            </Typography>
          </Box>

          {/* Center section: Navigation buttons and search bar */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexGrow: 1,
              alignItems: "center",
              gap: 3,
            }}
          >
            {/* Home navigation button */}
            <Button
              variant={isActive("/") ? "contained" : "text"}
              component={Link}
              to="/"
              startIcon={<HomeIcon />}
              sx={{
                fontWeight: 500,
                px: 2,
                py: 1,
                color: isActive("/") ? undefined : "inherit",
              }}
            >
              Home
            </Button>

            {/* Browse navigation button */}
            <Button
              variant={isActive("/browse") ? "contained" : "text"}
              component={Link}
              to="/browse"
              startIcon={<CategoryIcon />}
              sx={{
                fontWeight: 500,
                px: 2,
                py: 1,
                color: isActive("/browse") ? undefined : "inherit",
              }}
            >
              Browse
            </Button>

            {/* Favorites navigation button with count badge */}
            <Button
              variant={isActive("/favorites") ? "contained" : "text"}
              component={Link}
              to="/favorites"
              startIcon={<FavoriteIcon />}
              sx={{
                fontWeight: 500,
                px: 2,
                py: 1,
                color: isActive("/favorites") ? undefined : "inherit",
                position: "relative",
              }}
            >
              Favorites
              {/* Red badge showing number of favorites */}
              {favoritesCount > 0 && (
                <Box
                  sx={{
                    position: "absolute",
                    top: -5,
                    right: -5,
                    backgroundColor: "error.main",
                    color: "white",
                    borderRadius: "50%",
                    width: 20,
                    height: 20,
                    fontSize: "0.75rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                  }}
                >
                  {favoritesCount}
                </Box>
              )}
            </Button>

            {/* Search bar component */}
            <Box sx={{ minWidth: 250, maxWidth: 350 }}>
              <NavbarSearchBar />
            </Box>
          </Box>

          {/* Right section: Dark/Light mode toggle button */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              onClick={toggleDarkMode}
              color="inherit"
              aria-label="toggle dark/light mode"
              sx={{
                p: 1,
                "&:hover": {
                  backgroundColor: "action.hover",
                },
              }}
            >
              {/* Conditional icon based on current theme mode */}
              {theme.palette.mode === "dark" ? (
                <Brightness7Icon /> // Sun icon for switching to light mode
              ) : (
                <Brightness4Icon /> // Moon icon for switching to dark mode
              )}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
