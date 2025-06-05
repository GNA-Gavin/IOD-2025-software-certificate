import { createContext, useState, useContext } from "react";

// Create the context
const MoodContext = createContext();

// Provider component
export const MoodProvider = (props) => {
  const [isHappy, setIsHappy] = useState(true);


  // set mood in state, shared by context
  const handleChangeMood = () => {
    setIsHappy(!isHappy);
  };

  // The Provider component of any context (MoodContext.Provider)
// sends data via its value prop to all children at every level.
// We are sending both the mood and an update function
  return (
    <MoodContext.Provider value={{ isHappy, handleChangeMood }}>
      {props.children}
    </MoodContext.Provider>
  );
};

// Custom hook to use the context
export const useMoodContext = () => {
  return useContext(MoodContext);
};
