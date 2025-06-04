import { useReducer, useEffect } from 'react';


// Reducer function to handle state updates
function dataReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { loading: false, data: action.payload, error: null };
    case 'FETCH_ERROR':
      return { loading: false, data: null, error: action.payload };
    default:
      return state;
  }
}

export function useDataReducer(url) {
  // Initial state
  const initialState = {
    data: null,
    loading: false,
    error: null
  };
  
  // Use reducer instead of multiple useState hooks
  const [state, dispatch] = useReducer(dataReducer, initialState);

  useEffect(() => {
    // Don't fetch if no URL is provided
    if (!url) return;

    let ignore = false;
    
    // Start fetching
    dispatch({ type: 'FETCH_START' });
    
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText || 'Something went wrong'}`);
        }
        return response.json();
      })
      .then((json) => {
        if (!ignore) {
          dispatch({ type: 'FETCH_SUCCESS', payload: json });
        }
      })
      .catch((err) => {
        if (!ignore) {
          dispatch({ type: 'FETCH_ERROR', payload: `Error: ${err.message}` });
        }
      });

    return () => {
      ignore = true;
    };
  }, [url]);

  return state; // Returns { data, loading, error }
}