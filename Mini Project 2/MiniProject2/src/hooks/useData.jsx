import { useEffect, useReducer } from "react";
import axios from "axios";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

function dataReducer(state, action) {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, data: action.payload };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
}

export function useData(url, config = {}) {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  useEffect(() => {
    if (!url) return;

    const controller = new AbortController();

    dispatch({ type: "FETCH_START" });

    axios
      .get(url, {
        signal: controller.signal,
        ...config,
      })
      .then((response) => {
        dispatch({ type: "FETCH_SUCCESS", payload: response.data });
      })
      .catch((error) => {
        if (!axios.isCancel(error)) {
          dispatch({ type: "FETCH_ERROR", error: error.message });
        }
      });

    return () => {
      controller.abort();
    };
  }, [url]);

  return state;
}
