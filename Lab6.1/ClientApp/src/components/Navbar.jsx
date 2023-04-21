import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ display: "flex", gap: "1rem" }}>
      <NavLink to="/">Enter Users</NavLink>
      <NavLink to="/users">Users</NavLink>
    </nav>
  );
};

export default Navbar;
