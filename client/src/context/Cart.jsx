import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "../context/Auth"; // Import auth context

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [auth] = useAuth(); // Get user authentication data

  // Load cart when user logs in
  useEffect(() => {
    if (auth?.user?.email) {
      let existingCart = localStorage.getItem(`cart_${auth.user.email}`);
      if (existingCart) {
        setCart(JSON.parse(existingCart)); // Load the user's cart
      } else {
        setCart([]); // Initialize empty cart for new users
      }
    }
  }, [auth?.user?.email]); // Runs when user logs in or switches accounts

  // Save cart when it changes
  useEffect(() => {
    if (auth?.user?.email) {
      localStorage.setItem(`cart_${auth.user.email}`, JSON.stringify(cart));
    }
  }, [cart, auth?.user?.email]); // Runs whenever cart or user changes

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
