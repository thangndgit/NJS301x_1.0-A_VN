import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import API from "../../constants/api";
import "./register.css";

const Register = () => {
  // Create input refs
  const usernameRef = useRef("");
  const password1Ref = useRef("");
  const password2Ref = useRef("");
  const nameRef = useRef("");
  const phoneRef = useRef("");
  const emailRef = useRef("");

  // Navigate function
  const navigate = useNavigate();

  // Validate function
  const validate = (data) => {
    // If some data field is blank
    if (
      data.username === "" ||
      data.password1 === "" ||
      data.password2 === "" ||
      data.name === "" ||
      data.phone === "" ||
      data.mail === ""
    ) {
      alert("Missing register info. Try again!");
      return false;
    }

    // If re-type password does not match
    if (data.password1 !== data.password2) {
      alert("Re-type password does not match. Try again!");
      return false;
    }

    // If every is ok
    return true;
  };

  // Handle when submit login form
  const handleSubmitRegister = (event) => {
    // Prevent page reload when submit form
    event.preventDefault();

    // Create request payload
    const data = {
      username: usernameRef.current.value.trim(),
      password1: password1Ref.current.value.trim(),
      password2: password2Ref.current.value.trim(),
      name: nameRef.current.value.trim(),
      phone: phoneRef.current.value.trim(),
      email: emailRef.current.value.trim(),
    };

    // If input is fine
    if (validate(data)) {
      // Post login request
      fetch(API.POST_REGISTER, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          // Alert register state to user
          alert(data.message);
          // If register success, redirect to login page
          if (data.type === "Success") navigate("/login");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="registerContainer">
        <form className="registerForm" onSubmit={handleSubmitRegister}>
          <h1 className="registerForm__title">Register</h1>
          <input
            type="text"
            placeholder="Enter username"
            ref={usernameRef}
            required
          />
          <input
            type="password"
            placeholder="Enter password"
            ref={password1Ref}
            required
          />
          <input
            type="password"
            placeholder="Retype password"
            ref={password2Ref}
            required
          />
          <input
            type="text"
            placeholder="Enter your full name"
            ref={nameRef}
            required
          />
          <input
            type="text"
            placeholder="Enter your phone number"
            ref={phoneRef}
            required
          />
          <input
            type="email"
            placeholder="Enter your email"
            ref={emailRef}
            required
          />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
