// Custom Hook for Data Fetching with useReducer Pattern
// Demonstrates advanced React patterns: custom hooks, useReducer, and async operations
// React Hooks: useReducer for complex state management, useEffect for side effects
import { useReducer, useEffect } from 'react';

// Reducer Function: Pure function that manages state transitions based on actions
// This replaces multiple useState calls with a single state management pattern
// Parameters: current state object, action object with type and optional payload
function dataReducer(state, action) {
  // Switch statement: Handles different action types for state updates
  // Each case returns a new state object (immutable updates)
  switch (action.type) {
    // FETCH_START: Initiated when API call begins
    // Spread operator (...state): Preserves existing state properties
    // Sets loading to true and clears any previous errors
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    
    // FETCH_SUCCESS: Handles successful API response
    // payload: Contains the fetched data from the API
    // Resets loading state and stores the received data
    case 'FETCH_SUCCESS':
      return { loading: false, data: action.payload, error: null };
    
    // FETCH_ERROR: Handles API errors or network failures
    // payload: Contains error message for user display
    // Clears data and sets error state for UI feedback
    case 'FETCH_ERROR':
      return { loading: false, data: null, error: action.payload };
    
    // Default case: Returns unchanged state for unknown actions
    // Prevents state corruption from invalid action types
    default:
      return state;
  }
}

// Custom Hook Export: Reusable data fetching logic with reducer pattern
// Parameter: url - API endpoint to fetch data from
// Returns: state object with data, loading, and error properties
export function useDataReducer(url) {
  // Initial State: Default values for the reducer state
  // data: null - No data loaded initially
  // loading: false - Not loading initially
  // error: null - No errors initially
  const initialState = {
    data: null,
    loading: false,
    error: null
  };
  
  // useReducer Hook: Alternative to useState for complex state logic
  // Returns: [current state, dispatch function for triggering actions]
  // dispatch: Function to send actions to the reducer
  const [state, dispatch] = useReducer(dataReducer, initialState);

  // useEffect Hook: Handles side effects (API calls) with dependency array
  // Dependency [url]: Effect runs when URL changes or component mounts
  useEffect(() => {
    // Guard clause: Exit early if no URL provided
    // Prevents unnecessary API calls with undefined/null URLs
    if (!url) return;

    // Cleanup flag: Prevents state updates after component unmounts
    // React pattern to avoid memory leaks and state updates on unmounted components
    let ignore = false;
    
    // Dispatch FETCH_START: Triggers loading state and clears errors
    // This updates the UI to show loading indicators
    dispatch({ type: 'FETCH_START' });
    
    // Fetch API: Modern browser API for HTTP requests
    // Returns a Promise that resolves with the Response object
    fetch(url)
      .then((response) => {
        // Response validation: Check if HTTP request was successful
        // response.ok: true for status codes 200-299
        if (!response.ok) {
          // Throw error: Triggers the catch block with detailed error info
          // Template literal: Combines status code and message for debugging
          throw new Error(`Error ${response.status}: ${response.statusText || 'Something went wrong'}`);
        }
        // Parse JSON: Convert response body to JavaScript object
        // Returns another Promise with the parsed data
        return response.json();
      })
      .then((json) => {
        // Cleanup check: Only update state if component is still mounted
        // Prevents React warnings about state updates on unmounted components
        if (!ignore) {
          // Dispatch SUCCESS: Store fetched data in state
          // payload: The JSON data received from the API
          dispatch({ type: 'FETCH_SUCCESS', payload: json });
        }
      })
      .catch((err) => {
        // Error handling: Catches network errors and API errors
        // Only update state if component is still mounted
        if (!ignore) {
          // Dispatch ERROR: Store error message for UI display
          // Template literal: Formats error message with context
          dispatch({ type: 'FETCH_ERROR', payload: `Error: ${err.message}` });
        }
      });

    // Cleanup function: Returned function runs when effect cleans up
    // Sets ignore flag to prevent state updates after unmount
    // React pattern for preventing memory leaks
    return () => {
      ignore = true;
    };
  }, [url]); // Dependency array: Effect re-runs when URL changes

  // Return state: Exposes current state to consuming components
  // Components can destructure { data, loading, error } from this return
  return state;
}