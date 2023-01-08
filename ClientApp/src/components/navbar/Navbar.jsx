import { Fragment, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./navbar.css";
import API from "../../constants/api";
import { AuthContext } from "../../contexts/AuthContext";

const Navbar = () => {
  // Navigate function
  const navigate = useNavigate();

  // Login state
  const { isLoggedIn, user, setLogin } = useContext(AuthContext);

  // Handle when click login
  const handleLoginClick = () => {
    navigate("/login");
  };

  // Handle when click register
  const handleRegisterClick = () => {
    navigate("/register");
  };

  // Handle when click transactions
  const handleTransactionsClick = () => {
    navigate("/transactions");
  };

  // Handle when click logout
  const handleLogoutClick = () => {
    // POST logout request
    fetch(API.POST_LOGIN, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isLoggedOut: true }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        setLogin();
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo">
          <Link to="/">Booking Website</Link>
        </span>
        <div className="navItems">
          {isLoggedIn && (
            // If user is logged in
            <>
              {user && <span>{user.username}</span>}
              <button className="navButton" onClick={handleTransactionsClick}>
                Transactions
              </button>
              <button className="navButton" onClick={handleLogoutClick}>
                Logout
              </button>
            </>
          )}
          {!isLoggedIn && (
            // If user have not logged in yet
            <Fragment>
              <button className="navButton" onClick={handleRegisterClick}>
                Register
              </button>
              <button className="navButton" onClick={handleLoginClick}>
                Login
              </button>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
