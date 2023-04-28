import { NavLink } from "react-router-dom";

const Header = () => {
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
          </ul>
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
        </ul>
      </nav>
    </>
  );
};

export default Header;
