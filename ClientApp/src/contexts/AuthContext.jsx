import { createContext, useEffect, useState } from "react";
import API from "../constants/api";

// Context for authentication
export const AuthContext = createContext();

// Provider for authentication context
export const AuthProvider = ({ children }) => {
  // Login state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  // Get login function
  const setLogin = () => {
    fetch(API.GET_LOGIN, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      // Set login state
      .then((data) => {
        setIsLoggedIn(data.isLoggedIn);
        setUser(data.user);
      })
      // Catch error
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    // Set login state
    setLogin();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, setLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
