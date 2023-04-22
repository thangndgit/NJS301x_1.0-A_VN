import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="main-header">
      <nav className="main-header__nav">
        <ul className="main-header__item-list">
          <li className="main-header__item">
            <NavLink to="/">Shop</NavLink>
          </li>
          <li className="main-header__item">
            <NavLink to="/add-product">Add Product</NavLink>
          </li>
          <li className="main-header__item">
            <NavLink to="/admin">Admin</NavLink>
          </li>
          <li className="main-header__item">
            <NavLink to="/cart">Cart</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
