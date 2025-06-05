// Login Form Component - Handles user authentication with form validation and context management
// React hooks for component state management
import { useState } from "react";
// Custom context hook for global user state management
import { useUserContext } from "../context/UserContext";
// MUI Form and Layout Components for user input and feedback
import { 
  TextField,     // Input field component with Material Design styling, validation, and accessibility
  Button,        // Interactive button component with variants, states, and icon integration
  Paper,         // Elevated surface component for creating card-like containers with shadows
  Typography,    // Semantic text component with Material Design typography scales
  Box,           // Flexible container component for custom layouts with theme integration
  Container,     // Responsive wrapper that centers content and applies max-width constraints
  Alert          // User feedback component for displaying validation messages and status updates
} from "@mui/material";
// Material Design Icons for visual context and branding
import LoginIcon from '@mui/icons-material/Login';   // Login action icon
import LogoutIcon from '@mui/icons-material/Logout'; // Logout action icon

function LoginForm() {
  // Local State Management: Form input values using controlled components pattern
  const [userEmail, setUserEmail] = useState("");       // Email input field state
  const [userPassword, setUserPassword] = useState(""); // Password input field state
  const [submitResult, setSubmitResult] = useState(""); // Form validation/submission feedback

  // Context Integration: Access global user state and update functions
  // currentUser: Contains authenticated user data (email, etc.)
  // handleUpdateUser: Function to update global user state (login/logout)
  const { currentUser, handleUpdateUser } = useUserContext();

  // Form Validation and Submission Handler
  // Prevents default form submission and implements custom validation rules
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload on form submission
    
    // Validation Rule 1: Password minimum length requirement
    if (userPassword.length < 5) {
      setSubmitResult("Password must be at least 5 chars long");
    } 
    // Validation Rule 2: Password cannot match email (security best practice)
    else if (userPassword === userEmail) {
      setSubmitResult("Password must not match email address");
    } 
    // Success Path: All validations passed
    else {
      setSubmitResult("Successful login.");
      // Update global user context with authenticated user data
      handleUpdateUser({ email: userEmail });
    }
  };

  // Conditional Rendering: Logged-in User View
  // If user is already authenticated, show welcome message and logout option
  if (currentUser.email) {
    return (
      <>
      {/* Logged-In User Interface: Welcome message and logout functionality */}
      {/* Container: Responsive wrapper with small max-width for focused content */}
      <Container maxWidth="sm">
        {/* Paper: Elevated card surface for visual separation and grouping */}
        <Paper elevation={3} sx={{ padding: 3, mt: 4 }}>
          {/* Typography: Welcome message with user's email address */}
          {/* variant="h5": Medium-large heading size for greeting text */}
          <Typography variant="h5" gutterBottom>
            Welcome {currentUser.email}!
          </Typography>
          
          {/* Logout Button: Clears user context and returns to login form */}
          {/* variant="contained": Filled button style for primary actions */}
          {/* color="secondary": Uses theme's secondary color palette */}
          {/* onClick: Calls context update with empty object to clear user data */}
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={() => handleUpdateUser({})} // Clear user context (logout)
            startIcon={<LogoutIcon />}           // Material Design logout icon
          >
            Log Out
          </Button>
        </Paper>
      </Container>
      </>
    );
  }

  // Main Login Form Interface: Input fields and validation
  return (
    <>
    {/* Login Form Container: Responsive wrapper for form content */}
    <Container maxWidth="sm">
      {/* Paper: Elevated surface for form grouping and visual hierarchy */}
      <Paper elevation={3} sx={{ padding: 3, mt: 4 }}>
        {/* Typography: Form title with large heading variant */}
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        
        {/* Box: Form wrapper with semantic HTML and submission handling */}
        {/* component="form": Renders as HTML form element for accessibility */}
        {/* onSubmit: Handles form submission with validation logic */}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          {/* Email Input Field: Controlled component with email validation */}
          {/* fullWidth: Takes full container width for better mobile UX */}
          {/* type="email": HTML5 email input type for built-in validation */}
          {/* variant="outlined": Material Design outlined input style */}
          {/* margin="normal": Consistent vertical spacing between form fields */}
          <TextField
            fullWidth
            type="email"
            label="Email"                                    // Floating label text
            variant="outlined"
            margin="normal"
            value={userEmail}                                // Controlled component value
            onChange={(e) => setUserEmail(e.target.value)}   // State update handler
          />
          
          {/* Password Input Field: Secure text input with hidden characters */}
          {/* type="password": HTML password input type for security */}
          <TextField
            fullWidth
            type="password"
            label="Password"                                 // Floating label text
            variant="outlined"
            margin="normal"
            value={userPassword}                             // Controlled component value
            onChange={(e) => setUserPassword(e.target.value)} // State update handler
          />
          
          {/* Submit Button: Triggers form validation and submission */}
          {/* type="submit": HTML submit button type for form submission */}
          {/* variant="contained": Filled button style for primary actions */}
          {/* color="primary": Uses theme's primary color palette */}
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            startIcon={<LoginIcon />}  // Material Design login icon
            sx={{ mt: 2 }}             // Top margin: 16px using theme spacing
          >
            Login
          </Button>
          
          {/* Conditional Feedback Alert: Shows validation results */}
          {/* Displays only when submitResult state has content */}
          {submitResult && (
            <Alert 
              severity={submitResult.includes("Successful") ? "success" : "error"} // Dynamic severity based on result
              sx={{ mt: 2 }} // Top margin: 16px using theme spacing
            >
              {submitResult}
            </Alert>
          )}
        </Box>
      </Paper>
    </Container>
    </>
  );
}

export default LoginForm;