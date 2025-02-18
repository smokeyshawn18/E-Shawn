import { useNavigate } from "react-router-dom";
import { useSearch } from "../../context/Search";
import axios from "axios";
import { Search } from "react-bootstrap-icons";

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
    <>
      <div className="search-container d-flex align-items-center mt-2 mb-2">
        <form
          className="search-box input-group shadow-sm"
          onSubmit={handleSubmit}
        >
          <input
            type="search"
            className="form-control border-0 shadow-lg px-4 py-2 rounded-start-pill"
            placeholder="Search products..."
            aria-label="Search"
            value={values.keyword}
            onChange={(e) => setValues({ ...values, keyword: e.target.value })}
          />
          <button
            className="btn search-btn px-4 rounded-end-pill"
            type="submit"
          >
            <Search className="fs-4" />
          </button>
        </form>
      </div>
    </>
  );
};

export default SearchInput;
