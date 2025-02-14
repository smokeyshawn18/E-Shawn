import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create a context for Auth
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  // Initialize state with stored auth data or default values
  const [auth, setAuth] = useState(() => {
    const storedAuth = localStorage.getItem("auth");
    return storedAuth ? JSON.parse(storedAuth) : { user: null, token: null };
  });

  const [loading, setLoading] = useState(true);
  const API = import.meta.env.VITE_API; // Track loading state for initial data fetch

  // Fetch the token from API only if it's not already in localStorage
  useEffect(() => {
    const fetchAuthToken = async () => {
      if (auth.token) {
        setLoading(false);
        return; // Skip API call if token already exists
      }

      try {
        const response = await axios.get(`${API}/api/v1/auth/get-token`); // API endpoint to fetch token from DB
        if (response.data?.token) {
          setAuth({ user: response.data.user, token: response.data.token });
          localStorage.setItem(
            "auth",
            JSON.stringify({
              user: response.data.user,
              token: response.data.token,
            })
          );
        }
      } catch (error) {
        console.error("Error fetching auth data", error);
        setAuth({ user: null, token: null });
        localStorage.removeItem("auth");
      } finally {
        setLoading(false);
      }
    };

    fetchAuthToken();
  }, []);

  // Update localStorage whenever auth state changes
  useEffect(() => {
    if (auth.user && auth.token) {
      localStorage.setItem("auth", JSON.stringify(auth));
    } else {
      localStorage.removeItem("auth");
    }
  }, [auth]);

  if (loading) {
    return <div>Loading...</div>; // Optionally show a loading indicator
  }

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
