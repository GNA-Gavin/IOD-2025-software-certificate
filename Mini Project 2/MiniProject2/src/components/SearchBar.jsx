import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default function SearchBar() {
  const [query, setQuery] = useState(""); // Local state for search input value
  const navigate = useNavigate(); // React Router hook for programmatic navigation

  // Handler for form submission - navigates to search results page
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?s=${encodeURIComponent(query.trim())}`); // Navigate with URL-encoded search query
    }
  };

  return (
    // Form element handles submission when Enter is pressed or button is clicked
    <form onSubmit={handleSubmit}>
      {/* Stack creates horizontal layout with consistent spacing between input and button */}
      <Stack direction="row" spacing={2}>
        {/* Text input field for recipe search with full width */}
        <TextField
          label="Search recipes"
          variant="outlined"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          fullWidth
        />
        {/* Submit button triggers form submission */}
        <Button type="submit" variant="contained">
          Search
        </Button>
      </Stack>
    </form>
  );
}
