import { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/Auth";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { toast } from "react-hot-toast";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/Cart";
import "../styles/homepage.css";
import Logo from "../assets/Logo.png";
import { ShoppingCart, CircleEllipsis } from "lucide-react";
import ScrollToTopButton from "../components/ScrollToTop";

const HomePage = () => {
  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(true); // State for category loading

  const API = import.meta.env.VITE_API || "http://localhost:8000";

  //
  const getAuthToken = () => {
    const token = localStorage.getItem("auth");
    return token ? JSON.parse(token)?.token : null;
  };

  const axiosInstance = axios.create({
    baseURL: API,
  });

  axiosInstance.interceptors.request.use(
    async (config) => {
      const token = await getAuthToken();
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get(
        `${API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);

      setProducts(data.products || []);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching products:", error.message);
      toast.error("Error fetching products");
    }
  };

  const getallcategory = async () => {
    try {
      const { data } = await axiosInstance.get(
        `${API}/api/v1/category/get-categories`
      );
      setLoadingCategories(false); // Stop loading once categories are fetched

      if (data?.success) {
        setCategories(data.categories);
      } else {
        toast.error(data?.message || "Failed to fetch categories");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setLoadingCategories(false);
      toast.error("Something went wrong while getting categories");
    }
  };

  const getTotal = async () => {
    try {
      const { data } = await axiosInstance.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get(
        `${API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Error loading more products");
    }
  };

  const filterProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.post(
        `${API}/api/v1/product/product-filters`,
        {
          checked,
          radio,
        }
      );
      setLoading(false);
      setProducts(data.products || []);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Error filtering products");
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        await getallcategory();
        await getTotal();
        await getAllProducts();
      } catch (error) {
        console.error("Error loading data:", error);
        toast.error("Error loading data");
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (checked.length > 0 || radio.length > 0) {
      filterProduct();
    } else {
      getAllProducts();
    }
  }, [checked, radio]);

  return (
    <Layout title="All Products - With Best Price!">
      <div className="container-fluid px-lg-5 py-4">
        <div className="row">
          <div className="col-lg-3 col-md-4 col-sm-12 mb-4">
            <div className="filter-section p-4 border rounded shadow-lg bg-white">
              {/* Category Filter */}
              <h4 className="text-center mb-3 fw-bold">Filter by Category</h4>
              <div className="d-flex flex-column">
                {loadingCategories ? (
                  <p className="text-center text-muted">
                    Loading categories...
                  </p>
                ) : categories?.length > 0 ? (
                  categories.map((c) => (
                    <div key={c._id} className="d-flex align-items-center">
                      <Checkbox
                        className="filter-checkbox w-100 fs-6 text-primary fw-bold"
                        onChange={(e) => handleFilter(e.target.checked, c._id)}
                      >
                        {c.name}
                      </Checkbox>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted">
                    No categories available
                  </p>
                )}
              </div>

              {/* Price Filter */}
              <h4 className="text-center mt-4 fw-bold">Filter by Price</h4>
              <Radio.Group
                className="w-100 d-flex flex-column"
                onChange={(e) => setRadio(e.target.value)}
              >
                {Prices?.map((p) => (
                  <div key={p._id} className="mb-2 fw-bold ">
                    <Radio
                      className="text-success fw-bold fs-6"
                      value={p.array}
                    >
                      {p.name}
                    </Radio>
                  </div>
                ))}
              </Radio.Group>

              {/* Reset Button */}
              <button
                className="btn btn-danger mt-4 w-100 fw-bold"
                onClick={() => window.location.reload()}
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-lg-9 col-md-8 col-sm-12">
            {/* Header Section */}
            <div className="d-flex flex-wrap align-items-center justify-content-center gap-3 text-center">
              <img
                src={Logo}
                alt="E-SHawn-Logo"
                className="img-fluid rounded shadow-sm"
                style={{
                  height: "250px",
                  objectFit: "cover",
                }}
              />
              <h1 className="fw-bold text-success mb-5 fs-2">
                Welcome to <span className="text-primary fw-bold">E-Shawn</span>
              </h1>
            </div>
            {/* Products Section */}
            <h1 className="text-center mt-4 mb-3 fw-bold">All Products</h1>
            <div className="row">
              {products && products.length > 0 ? (
                products.map((p) => (
                  <div
                    key={p._id}
                    className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
                  >
                    <div className="card h-100 shadow-sm border-light rounded overflow-hidden">
                      <img
                        className="card-img-top img-fluid"
                        src={`${API}/api/v1/product/product-photo/${p._id}`}
                        alt={p.name}
                        style={{
                          height: "200px",
                          objectFit: "cover",
                        }}
                      />
                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title text-truncate">
                          {p.name || "No Name"}
                        </h5>
                        <p className="card-text text-muted text-truncate">
                          {p.description || "No Description"}
                        </p>
                        <h5 className="card-title">
                          $ {p.price || "No Price"}
                        </h5>
                        <button
                          className="btn btn-primary btn-block mb-2 fw-bold"
                          onClick={() => navigate(`/product/${p.slug}`)}
                        >
                          <CircleEllipsis className="me-1" /> More Details
                        </button>
                        <button
                          className="btn btn-success fs-6 mt-2"
                          onClick={() => {
                            setCart([...cart, p]);
                            localStorage.setItem(
                              "cart",
                              JSON.stringify([...cart, p])
                            );
                            toast.success("Item added to your Cart");
                          }}
                        >
                          <ShoppingCart />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center">No products found.</p>
              )}
            </div>

            {/* Load More Button */}
            <div className="text-center mt-4">
              {products &&
                products.length < total &&
                !checked.length &&
                !radio.length && (
                  <button
                    className="btn btn-primary px-4 py-2 fw-bold"
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(page + 1);
                    }}
                    disabled={checked.length || radio.length}
                  >
                    {loading
                      ? "Loading please wait..."
                      : "Want to Load More Products?"}
                  </button>
                )}
            </div>
          </div>
        </div>
        <ScrollToTopButton />
      </div>
    </Layout>
  );
};

export default HomePage;
