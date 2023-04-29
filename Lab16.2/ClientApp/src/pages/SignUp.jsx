import { useState } from "react";
import api, { call } from "../api/api";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });

  const handleFormChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Confirm password does not match");
      return;
    }

    const submitData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    call(
      api.auth.signUp(),
      (data) => {
        if (data.error) alert(data.error);
        else {
          alert(data.message);
          navigate("/sign-in");
        }
      },
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      }
    );
  };

  return (
    <main>
      <form className="login-form" onChange={handleFormChange} onSubmit={handleFormSubmit}>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" value={formData.email} required />
        </div>
        <div className="form-control">
          <label htmlFor="name">Full Name</label>
          <input type="text" name="name" id="name" value={formData.name} required />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" value={formData.password} required />
        </div>
        <div className="form-control">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={formData.confirmPassword}
            required
          />
        </div>
        <button className="btn" type="submit">
          Sign Up
        </button>
      </form>
    </main>
  );
};

export default SignUp;
