import { useNavigate } from "react-router-dom";
import { useSearch } from "../../context/Search";
import axios from "axios";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const API = import.meta.env.VITE_API || "http://localhost:8000";

  const getAuthToken = () => {
    const token = localStorage.getItem("auth");
    return token ? JSON.parse(token)?.token : null;
  };

  const axiosInstance = axios.create({ baseURL: API });

  axiosInstance.interceptors.request.use(
    async (config) => {
      const token = getAuthToken();
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!values.keyword.trim()) {
      console.log("Search keyword is empty!");
      return;
    }

    try {
      const { data } = await axiosInstance.get(
        `/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div className="d-flex justify-content-center ms-5 mb-2">
      <form className="d-flex align-items-center" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keyword} // ✅ Controlled input
          onChange={(e) => setValues({ ...values, keyword: e.target.value })} // ✅ State update
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
