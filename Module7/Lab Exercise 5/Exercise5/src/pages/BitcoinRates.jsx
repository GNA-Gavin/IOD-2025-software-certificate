// Bitcoin Rates Component - Fetches and displays real-time cryptocurrency exchange rates
// React hooks for state management
import { useState } from "react";
// Custom hook for API data fetching with loading/error states
import { useDataReducer } from "../hooks/useDataReducer";
// MUI Components for data display, forms, and feedback
import { 
  Container,     // Responsive wrapper that centers content and applies max-width constraints
  Paper,         // Elevated surface component for creating card-like containers with shadows
  Typography,    // Semantic text component with Material Design typography scales and variants
  FormControl,   // Wrapper for form inputs that provides consistent styling and label positioning
  InputLabel,    // Floating label component that works with Select and other form inputs
  Select,        // Dropdown selection component with keyboard navigation and accessibility
  MenuItem,      // Individual option items within Select component menus
  CircularProgress, // Loading spinner with Material Design animation and theming
  Alert,         // User feedback component for displaying errors, warnings, or success messages
  Box            // Flexible container for custom layouts with full access to MUI theme system
} from "@mui/material";
// Material Design Icons - Currency Bitcoin icon for visual branding
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';

// Supported currencies for Bitcoin exchange rate lookup
const currencies = ["USD", "AUD", "NZD", "GBP", "EUR", "SGD"];

// Currency display symbols for formatting exchange rates
// Maps currency codes to their respective symbols for better UX
const currencySymbols = {
  USD: "$",      // US Dollar
  AUD: "A$",     // Australian Dollar  
  NZD: "NZ$",    // New Zealand Dollar
  GBP: "£",      // British Pound
  EUR: "€",      // Euro
  SGD: "S$",     // Singapore Dollar
};

function BitcoinRates() {
  // State Management: Current selected currency (defaults to first currency in array)
  const [currency, setCurrency] = useState(currencies[0]);

  // API Integration: Dynamic URL construction based on selected currency
  // CoinGecko API provides real-time cryptocurrency pricing data
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=${currency.toLowerCase()}`;
  
  // Custom Hook: useDataReducer manages API state (data, loading, error)
  // Automatically refetches when URL changes (currency selection)
  const { data, loading, error } = useDataReducer(url);

  // Data Processing: Extract Bitcoin rate for selected currency from API response
  // Optional chaining (?.) prevents errors if API response structure changes
  const rate = data?.bitcoin?.[currency.toLowerCase()];

  // Event Handler: Updates currency state when user selects different option
  // MUI Select component passes event object with target.value containing selected value
  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  return (
    <>
    {/* Container: Responsive wrapper with max-width constraint for readability */}
    {/* maxWidth="md": Medium breakpoint (900px) - ideal for form-based content */}
    <Container maxWidth="md">
      {/* Paper: Elevated card surface for grouping related content */}
      {/* elevation={3}: Medium shadow depth for subtle visual separation */}
      {/* p={4}: Padding of 32px, mt={4}: Top margin of 32px using theme spacing */}
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        {/* Typography: Page heading with icon integration */}
        {/* variant="h4": Large heading size (2.125rem) for page titles */}
        {/* gutterBottom: Adds consistent bottom margin using theme spacing */}
        {/* display: 'flex': Creates horizontal layout for icon + text alignment */}
        <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* CurrencyBitcoinIcon: Material Design icon with size and color theming */}
          {/* fontSize="large": 35px icon size, color="warning": Orange/amber theme color */}
          <CurrencyBitcoinIcon fontSize="large" color="warning" />
          Bitcoin Exchange Rate
        </Typography>
        
        {/* FormControl: Container for form inputs with consistent styling */}
        {/* fullWidth: Takes full available width for better mobile UX */}
        {/* my={2}: Vertical margin (top + bottom) of 16px using theme spacing */}
        <FormControl fullWidth sx={{ my: 2 }}>
          {/* InputLabel: Floating label that animates and provides accessibility context */}
          {/* id attribute connects label to Select component for screen readers */}
          <InputLabel id="currency-select-label">Choose Currency</InputLabel>
          
          {/* Select: Dropdown component with Material Design styling and behavior */}
          {/* labelId: Links to InputLabel for accessibility compliance */}
          {/* value: Controlled component - current state value */}
          {/* label: Must match InputLabel text for proper floating animation */}
          <Select
            labelId="currency-select-label"
            value={currency}
            label="Choose Currency"
            onChange={handleCurrencyChange}
          >
            {/* Dynamic MenuItem generation from currencies array */}
            {/* key prop required for React list rendering optimization */}
            {currencies.map((curr) => (
              <MenuItem value={curr} key={curr}>
                {curr}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Results Display Box: Custom styled container for API response data */}
        <Box sx={{ 
          mt: 4,                              // Top margin: 32px
          p: 2,                               // Padding: 16px all sides
          backgroundColor: 'background.paper', // Theme-aware background color
          borderRadius: 1,                     // 4px border radius (theme.shape.borderRadius)
          border: 1,                          // 1px border width
          borderColor: 'divider'              // Theme-aware border color (light/dark adaptive)
        }}>
          {/* Conditional Rendering: Loading State */}
          {/* CircularProgress: Material Design spinner with theme integration */}
          {loading && <CircularProgress />}
          
          {/* Conditional Rendering: Error State */}
          {/* Alert: User feedback component with semantic coloring and icons */}
          {/* severity="error": Red styling with error icon for visual hierarchy */}
          {error && <Alert severity="error">{error}</Alert>}
          
          {/* Conditional Rendering: Success State - Display Rate Data */}
          {/* Multiple conditions: not loading, no error, and valid rate data exists */}
          {!loading && !error && rate && (
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              {/* Dynamic rate display with proper formatting */}
              {/* currencySymbols[currency]: Gets symbol for selected currency */}
              {/* rate.toLocaleString(): Formats number with thousands separators */}
              1 Bitcoin (₿) = {currencySymbols[currency]}{rate.toLocaleString()} {currency}
            </Typography>
          )}
        </Box>
      </Paper>
    </Container>
    </>
  );
}

export default BitcoinRates;