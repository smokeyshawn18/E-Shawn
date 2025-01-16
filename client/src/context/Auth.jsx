import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create a context for Auth
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  // Initialize state with an empty user and token initially
  const [auth, setAuth] = useState({ user: null, token: null });
  const [loading, setLoading] = useState(true); // Track loading state for initial data fetch

  // Fetch the token from your API (or from your session, if you're storing it elsewhere)
  useEffect(() => {
    const fetchAuthToken = async () => {
      try {
        const response = await axios.get("/api/v1/auth/get-token"); // API endpoint to fetch token from DB
        if (response.data?.token) {
          setAuth({ user: response.data.user, token: response.data.token });
        } else {
          setAuth({ user: null, token: null });
        }
      } catch (error) {
        console.error("Error fetching auth data", error);
        setAuth({ user: null, token: null });
      } finally {
        setLoading(false);
      }
    };

    fetchAuthToken();
  }, []);

  // Store auth data in localStorage if the token and user are present
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
