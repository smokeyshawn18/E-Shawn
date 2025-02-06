import React, { createContext, useContext, useState } from "react";

// Create a context for Auth
const SearchContext = createContext();

// Provider component
export const SearchProvider = ({ children }) => {
  // Initialize state with an empty user and token initially
  const [auth, setAuth] = useState({
    keyword: "",
    results: [],
  });

  return (
    <SearchContext.Provider value={[auth, setAuth]}>
      {children}
    </SearchContext.Provider>
  );
};

// Custom hook to access Auth context
export const useSearch = () => {
  return useContext(SearchContext);
};
