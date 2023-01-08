import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import API from "../../constants/api";
import { AuthContext } from "../../contexts/AuthContext";
import "./login.css";

const Login = () => {
  // Login state
  const { setLogin } = useContext(AuthContext);

  // Navigate function
  const navigate = useNavigate();

  // Input ref
  const usernameRef = useRef("");
  const passwordRef = useRef("");

  // Handle when submit login form
  const handleSubmitLogin = (event) => {
    // Prevent page reload when submit form
    event.preventDefault();

    // Create request payload
    const data = {
      username: usernameRef.current.value.trim(),
      password: passwordRef.current.value.trim(),
      isAdmin: false,
    };

    // Validate
    if (data.email === "" || data.password === "") {
      alert("Missing login info. Try again!");
      return;
    }

    // Post login request
    fetch(API.POST_LOGIN, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        if (data.type === "Success") {
          setLogin();
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Navbar />
      <div className="loginContainer">
        <form className="loginForm" onSubmit={handleSubmitLogin}>
          <h1 className="loginForm__title">Login</h1>
          <input
            type="text"
            placeholder="Enter username or email"
            ref={usernameRef}
            required
          />
          <input
            type="password"
            placeholder="Enter password"
            ref={passwordRef}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
