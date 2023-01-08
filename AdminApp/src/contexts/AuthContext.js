import { createContext, useEffect, useState } from "react";

import API from "../constants/api";

// Context for authentication
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Login state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  // Refresh login context
  const refreshLogin = () => {
    // Fetch options
    const options = {
      method: "GET",
      credentials: "include",
    };

    // Get login response
    fetch(API.GET_LOGIN, options)
      // Get response data
      .then((res) => res.json())
      // Set login status and active user
      .then((data) => {
        setIsLoggedIn(data.isLoggedIn);
        setUser(data.user);
      })
      // Catch error
      .catch((err) => console.log(err));
  };

  // Init
  useEffect(() => refreshLogin(), []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, refreshLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
