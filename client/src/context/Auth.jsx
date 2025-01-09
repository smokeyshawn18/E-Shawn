import React, { createContext, useContext, useState, useEffect } from "react";

// Create a context for Auth
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  // Check if there is any user data stored in localStorage
  const storedAuth = JSON.parse(localStorage.getItem("auth"));

  // Initialize state with localStorage data or default to empty
  const [auth, setAuth] = useState(storedAuth || { user: null, token: null });

  // Store auth data in localStorage whenever it changes
  useEffect(() => {
    if (auth.user && auth.token) {
      localStorage.setItem("auth", JSON.stringify(auth));
    } else {
      localStorage.removeItem("auth");
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access Auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
