import { useState, useEffect } from "react";

import axios from "axios";

export default function useCategory() {
  const [categories, setCategories] = useState([]);
  const API = import.meta.env.VITE_API || "http://localhost:8000";

  const getCategories = async () => {
    try {
      const { data } = await axios.get(`${API}/api/v1/category/get-categories`);

      setCategories(data?.categories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return categories;
}
