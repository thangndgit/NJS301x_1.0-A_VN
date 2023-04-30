import { useState } from "react";
import api, { call } from "../api/api";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();

  const [errorField, setErrorField] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleFormChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    call(
      api.auth.signIn(),
      (data) => {
        if (data.error) {
          alert(data.error);
          setErrorField(data.errorField);
        } else {
          localStorage.setItem("isLoggedIn", true);
          alert(data.message);
          navigate("/");
        }
      },
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      }
    );
  };

  return (
    <main>
      <form className="login-form" onChange={handleFormChange} onSubmit={handleFormSubmit}>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className={errorField === "email" ? "invalid" : ""}
            value={formData.email}
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className={errorField === "password" ? "invalid" : ""}
            value={formData.password}
            required
          />
        </div>
        <button className="btn" type="submit">
          Sign In
        </button>
      </form>
    </main>
  );
};

export default SignIn;
