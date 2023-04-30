/* eslint-disable jsx-a11y/anchor-is-valid */
import { NavLink, useNavigate } from "react-router-dom";
import api, { call } from "../api/api";

const Header = ({ onChangeAuth }) => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("isLoggedIn");
  onChangeAuth(isLoggedIn);

  const handleLogout = () => {
    call(
      api.auth.signOut(),
      (data) => {
        if (data.error) alert(data.error);
        else {
          localStorage.removeItem("isLoggedIn");
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
        body: JSON.stringify({}),
      }
    );
  };

  return (
    <>
      <div className="backdrop"></div>
      <header className="main-header">
        <button id="side-menu-toggle">Menu</button>
        <nav className="main-header__nav">
          <ul className="main-header__item-list">
            <li className="main-header__item">
              <NavLink to="/">Shop</NavLink>
            </li>
            <li className="main-header__item">
              <NavLink to="/products">Products</NavLink>
            </li>
            {isLoggedIn && (
              <>
                <li className="main-header__item">
                  <NavLink to="/cart">Cart</NavLink>
                </li>
                <li className="main-header__item">
                  <NavLink to="/orders">Orders</NavLink>
                </li>
                <li className="main-header__item">
                  <NavLink to="/admin/add-product">Add Product</NavLink>
                </li>
                <li className="main-header__item">
                  <NavLink to="/admin/products">Admin Products</NavLink>
                </li>
              </>
            )}
          </ul>
          <div className="main-header__item-list">
            {isLoggedIn && (
              <li className="main-header__item">
                <a onClick={handleLogout}>Sign Out</a>
              </li>
            )}
            {!isLoggedIn && (
              <>
                <div className="main-header__item">
                  <NavLink to="/sign-in">Sign In</NavLink>
                </div>
                <div className="main-header__item">
                  <NavLink to="/sign-up">Sign Up</NavLink>
                </div>
              </>
            )}
          </div>
        </nav>
      </header>
      <nav className="mobile-nav">
        <ul className="mobile-nav__item-list">
          <li className="mobile-nav__item">
            <NavLink to="/">Shop</NavLink>
          </li>
          <li className="mobile-nav__item">
            <NavLink to="/products">Products</NavLink>
          </li>
          {!isLoggedIn && (
            <>
              <div className="mobile-nav__item">
                <NavLink to="/sign-in">Sign In</NavLink>
              </div>
              <div className="mobile-nav__item">
                <NavLink to="/sign-up">Sign Up</NavLink>
              </div>
            </>
          )}
          {isLoggedIn && (
            <>
              <li className="mobile-nav__item">
                <NavLink to="/cart">Cart</NavLink>
              </li>
              <li className="mobile-nav__item">
                <NavLink to="/orders">Orders</NavLink>
              </li>
              <li className="mobile-nav__item">
                <NavLink to="/admin/add-product">Add Product</NavLink>
              </li>
              <li className="mobile-nav__item">
                <NavLink to="/admin/products">Admin Products</NavLink>
              </li>
              <div className="mobile-nav__item">
                <a onClick={handleLogout}>Sign Out</a>
              </div>
            </>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Header;
