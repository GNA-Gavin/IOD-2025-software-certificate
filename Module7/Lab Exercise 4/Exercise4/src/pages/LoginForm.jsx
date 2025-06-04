import { useState, useContext } from "react";
import { useUserContext } from "../context/UserContext";
import { MyThemeContext } from "../context/MyThemeContext";

function LoginForm() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [submitResult, setSubmitResult] = useState("");
  const { theme, darkMode } = useContext(MyThemeContext); 

  // destructure the context values passed via UserProvider
  const { currentUser, handleUpdateUser } = useUserContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userPassword.length < 5) {
      setSubmitResult("Password must be at least 5 chars long");
    } else if (userPassword === userEmail) {
      setSubmitResult("Password must not match email address");
    } else {
      setSubmitResult("Successful login.");
      handleUpdateUser({ email: userEmail }); // context function
    }
  };

  // if the user is already logged in, show msg instead of form
  if (currentUser.email)
    return (
      <>
        <p>Welcome {currentUser.email}!</p>
        <button onClick={() => handleUpdateUser({})}>Log Out</button>
      </>
    );

  return (
    <div
      className="LoginForm componentBox"
      style={{ background: theme.background, color: theme.foreground }}
    >
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Login</button>
        <p>{submitResult}</p>
      </form>
    </div>
  );
}

export default LoginForm;
