import { useState } from "react";

function Emoji() {
  // Set up state to track current mood (true = happy, false = sad)
  const [isHappy, setIsHappy] = useState(true); // boolean is fine for only 2 states

  // Function to toggle the mood when button is clicked
  const changeMood = () => {
    setIsHappy(!isHappy);
  };

  // Define the emojis
  const happyEmoji = "😊";
  const sadEmoji = "😢";

  return (
    <div className="emoji-container">
      <div className="emoji">
        <span style={{ fontSize: "5rem" }}>
          {isHappy ? happyEmoji : sadEmoji}
        </span>
      </div>

      <div className="mood-status">
        Current Mood: {isHappy ? "Happy" : "Sad"}
      </div>

      <button
        onClick={changeMood}
        className="mood-button"
        style={{
          marginTop: "20px",
          backgroundColor: "green",
          color: "white",
        }}
      >
        Change Mood
      </button>
    </div>
  );
}

export default Emoji;
