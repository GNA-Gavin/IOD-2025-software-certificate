import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { MyThemeContext } from "../context/MyThemeContext";
import "../App.css";

export default function NavBar() {
  const { theme } = useContext(MyThemeContext);

  return (
    <nav
      className="NavBar"
      style={{ backgroundColor: theme.background, color: theme.foreground }}
    >
      <ul className="menu">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/BitcoinRates">Bitcoin Rates</NavLink>
        </li>
        <li>
          <NavLink to="/Login">Login</NavLink>
        </li>
      </ul>{" "}
    </nav>
  );
}
