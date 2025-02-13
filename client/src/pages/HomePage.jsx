import { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/Auth";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { toast } from "react-hot-toast";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/Cart";

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
    }
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) {
      filterProduct();
    } else {
      getAllProducts();
    }
  }, [checked, radio]);

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

  useEffect(() => {
    // Call to fetch categories and products
    const fetchData = async () => {
      try {
        await getallcategory();
        getTotal();
      } catch (error) {
        console.log(error);
        toast.error("Error fetching categories or products");
      }
    };

    fetchData();
  }, []); // This ensures categories are fetched only once when the component first loads

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  const getTotal = async () => {
    try {
      const { data } = await axiosInstance.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page == 1) return;
    loadMore();
  }, [page]);

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get(
        `/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const filterProduct = async () => {
    try {
      const { data } = await axiosInstance.post(
        `${API}/api/v1/product/product-filters`,
        {
          checked,
          radio,
        }
      );

      // Attach category object to each product before setting state
      const updatedProducts = data?.products.map((p) => ({
        ...p,
        category: categories.find((cat) => cat._id === p.category) || {
          name: "No Category",
        },
      }));

      setProducts(updatedProducts);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title="All Products - With Best Price!">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 mb-4">
            <div className="filter-section p-3 border rounded shadow-sm">
              <h4 className="text-center mt-3">Filter By Category</h4>
              <div className="d-flex flex-column">
                {loadingCategories ? (
                  <p>Loading categories...</p> // Show loading state for categories
                ) : categories?.length > 0 ? (
                  categories.map((c) => (
                    <Checkbox
                      key={c._id}
                      onChange={(e) => handleFilter(e.target.checked, c._id)}
                    >
                      {c.name}
                    </Checkbox>
                  ))
                ) : (
                  <p>No categories available</p> // Show message if no categories
                )}
              </div>

              <h4 className="text-center mt-3">Filter By Price</h4>
              <Radio.Group
                onChange={(e) => {
                  setRadio(e.target.value);
                }}
              >
                {Prices?.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>

              <button
                className="btn btn-danger mt-3 w-100"
                onClick={() => window.location.reload()}
              >
                Reset Filter
              </button>
            </div>
          </div>

          <div className="col-md-9">
            <h1 className="text-center mt-3">All Products</h1>
            <div className="row d-flex flex-wrap">
              {products && products.length > 0 ? (
                products.map((p) => (
                  <div
                    key={p._id}
                    className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
                  >
                    <div className="card h-100 shadow-sm border-light">
                      <img
                        className="card-img-top img-fluid"
                        src={`${API}/api/v1/product/product-photo/${p._id}`}
                        alt={p.name}
                        style={{
                          height: "200px",
                          objectFit: "cover",
                        }}
                      />
                      <div className="card-body">
                        <h5 className="card-title text-truncate">
                          {p.name || "No Name"}
                        </h5>

                        <p className="card-text text-muted text-truncate">
                          {p.description || "No Description"}
                        </p>

                        <h5 className="card-title text-truncate">
                          Rs.{p.price || "No Price"}
                        </h5>

                        <button
                          className="btn btn-primary btn-block mb-2 w-100"
                          onClick={() => navigate(`/product/${p.slug}`)}
                        >
                          More Details
                        </button>
                        <button
                          className="btn btn-success btn-block mt-2 w-100"
                          onClick={() => {
                            setCart([...cart, p]);
                            localStorage.setItem(
                              "cart",
                              JSON.stringify([...cart, p])
                            );
                            toast.success("Item added to your Cart");
                          }}
                        >
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No products found.</p>
              )}
            </div>
            <div className="m-2 p-3">
              {products &&
                products.length < total &&
                !checked.length &&
                !radio.length && (
                  <button
                    className=" btn btn-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(page + 1);
                    }}
                    disabled={checked.length || radio.length} // Disable if filters are applied
                  >
                    {loading ? "Loading please Wait..." : "Loadmore"}
                  </button>
                )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
