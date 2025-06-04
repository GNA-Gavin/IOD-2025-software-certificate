import { useState } from "react";
import "./App.css";
import SubscribeForm from "./SubscribeForm";
import ActivityFinder from "./ActivityFinder";
import BitcoinRates from "./BitcoinRates";
import Emoji from "./Emoji";
import { MoodProvider } from "./MoodContext";
import { UserProvider } from "./UserContext";
import LoginForm from "./LoginForm";
import MyThemeProvider from "./MyThemeContext";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <UserProvider>
        <MoodProvider>
          <MyThemeProvider>
          <Emoji></Emoji>
          <SubscribeForm></SubscribeForm>
          <ActivityFinder></ActivityFinder>
          <BitcoinRates></BitcoinRates>
          <LoginForm></LoginForm>
          </MyThemeProvider>
        </MoodProvider>
      </UserProvider>
      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  );
}

export default App;
