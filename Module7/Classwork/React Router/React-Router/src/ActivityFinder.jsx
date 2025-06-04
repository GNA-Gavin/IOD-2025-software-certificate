import { useState, useEffect } from "react";
import { useDataReducer } from "./hooks/useDataReducer";

function ActivityFinder() {
  // Fetches a random activity

  const [participants, setParticipants] = useState(1);

  // uses custom hook to handle the effect for loading external data
  const data = useDataReducer(
    "https://www.boredapi.com/api/activity?" + "participants=" + participants
  );

  // get the activity from the json or show error message if failed
  const activity = data ? data.activity : "not found";

  return (
    <div className="ActivityFinder componentBox">
      <h3>Activity Finder</h3>
      <label>
        Choose number of participants:
        <select
          value={participants}
          onChange={(e) => setParticipants(e.target.value)}
        >
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </select>
      </label>
      <div>
        <strong>Suggested Activity: </strong>
        {activity}
      </div>
    </div>
  );
} // ++ Add a second use of useDataReducer to fetch activities based on type

export default ActivityFinder;
