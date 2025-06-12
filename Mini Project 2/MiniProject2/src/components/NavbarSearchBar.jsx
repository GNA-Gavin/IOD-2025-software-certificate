import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, IconButton, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function NavbarSearchBar() {
  const [query, setQuery] = useState(""); // Local state for search input value
  const navigate = useNavigate(); // React Router hook for programmatic navigation

  // Handler for form submission - navigates to search results page
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?s=${encodeURIComponent(query.trim())}`); // Navigate with URL-encoded search query
      setQuery(""); // Clear search after navigation
    }
  };

  return (
    <>
      {/* Form container with flexbox layout for search input and button */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", alignItems: "center" }}
      >
        {/* Search text input with custom navbar styling */}
        <TextField
          size="small"
          placeholder="Search recipes..."
          variant="outlined"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.15)", // Semi-transparent background
            borderRadius: 1,
            "& .MuiOutlinedInput-root": {
              color: "inherit", // Inherit text color from navbar
              "&.Mui-focused fieldset": {
                borderColor: "rgba(255, 255, 255, 0.7)", // Border when focused
              },
            },
            "& .MuiInputBase-input::placeholder": {
              color: "rgba(255, 255, 255, 0.7)", // Light placeholder text
              opacity: 1,
            },
          }}
        />
        {/* Search submit button with magnifying glass icon */}
        <IconButton
          type="submit"
          color="inherit"
          sx={{ ml: 1 }}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Box>
    </>
  );
}
