import { useContext } from "react";
import {
  RiDashboardFill,
  RiHome2Fill,
  RiHotelFill,
  RiLogoutBoxRFill,
  RiTruckFill,
  RiUserFill,
} from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";

import API from "../../constants/api";
import { AuthContext } from "../../contexts/AuthContext";
import "./SideBar.css";

const SideBar = ({ className }) => {
  // Function for navigate
  const navigate = useNavigate();

  // Function to refresh login state
  const { refreshLogin } = useContext(AuthContext);

  // Handle when click logout on side bar
  const handleLogout = () => {
    // Response body
    const resBody = {
      isLoggedOut: true,
    };

    // Fetch options
    const options = {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resBody),
    };

    // Logout
    fetch(API.POST_LOGIN, options)
      // Get data from response
      .then((res) => res.json())
      // Process data
      .then((data) => {
        alert(data.message);
        refreshLogin();
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={`side-bar ${className}`}>
      <nav>
        <ul>
          <label>MAIN</label>
          <li>
            <NavLink to="/">
              <RiDashboardFill /> Dashboard
            </NavLink>
          </li>
          <label>LISTS</label>
          <li>
            <NavLink to="/users">
              <RiUserFill /> Users
            </NavLink>
          </li>
          <li>
            <NavLink end to="/hotels">
              <RiHotelFill /> Hotels
            </NavLink>
          </li>
          <li>
            <NavLink end to="/rooms">
              <RiHome2Fill /> Rooms
            </NavLink>
          </li>
          <li>
            <NavLink to="/transactions">
              <RiTruckFill /> Transactions
            </NavLink>
          </li>
          <label>NEW</label>
          <li>
            <NavLink to="/hotels/add">
              <RiHotelFill /> New Hotel
            </NavLink>
          </li>
          <li>
            <NavLink to="/rooms/add">
              <RiHome2Fill /> New Room
            </NavLink>
          </li>
          <label>USER</label>
          <li>
            <NavLink to="/login" onClick={handleLogout}>
              <RiLogoutBoxRFill /> Logout
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
