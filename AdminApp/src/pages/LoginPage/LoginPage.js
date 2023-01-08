import { useContext, useRef } from "react";
import "./LoginPage.css";

import API from "../../constants/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const LoginPage = () => {
  // Create input refs
  const usernameRef = useRef();
  const passwordRef = useRef();

  // Navigate
  const navigate = useNavigate();

  // Function to refresh login state
  const { refreshLogin } = useContext(AuthContext);

  // Handle submit login form
  const handleSubmitLogin = (event) => {
    event.preventDefault();

    // Get string value of input
    const username = usernameRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    // Validate input
    if (username === "" || password === "") {
      alert("Username and password must not be blank!");
      return;
    }

    // Login body
    const reqBody = {
      username,
      password,
      isAdmin: true,
    };

    // Fetch options
    const options = {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reqBody),
    };

    // Login
    fetch(API.POST_LOGIN, options)
      // Get response data
      .then((res) => res.json())
      // Alert login state to user
      .then((data) => {
        // If login fail
        if (data.type === "Error") alert(data.message);
        // If login success
        else {
          alert(data.message);
          refreshLogin();
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmitLogin}>
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Enter your username or email . . ."
          required
          ref={usernameRef}
        />
        <input
          type="password"
          placeholder="Enter your password . . ."
          required
          ref={passwordRef}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
