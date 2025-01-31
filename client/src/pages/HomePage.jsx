import { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/Auth";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { toast } from "react-hot-toast";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [auth] = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);

  const API = import.meta.env.VITE_API || "http://localhost:8000";

  // Get auth token dynamically from server
  const getAuthToken = () => {
    const token = localStorage.getItem("auth");
    return token ? JSON.parse(token)?.token : null;
  };

  // Axios instance with token interceptor
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

  //get product
  const getAllProducts = async () => {
    try {
      const { data } = await axiosInstance.get(
        `${API}/api/v1/product/get-product`
      );

      setProducts(data.product || []);
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) {
      filterProduct(); // Apply filtering only if at least one filter is selected
    } else {
      getAllProducts(); // If no filters are selected, fetch all products
    }
  }, [checked, radio]);

  const getallcategory = async () => {
    try {
      const { data } = await axiosInstance.get(
        `${API}/api/v1/category/get-categories`
      );

      if (data?.success) {
        setCategories(data.categories);
      } else {
        toast.error(data?.message || "Failed to fetch categories");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Something went wrong while getting categories");
    }
  };

  useEffect(() => {
    getallcategory();
  }, []);

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
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

      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title="All Products - With Best Price!">
      <div className="container-fluid">
        <div className="row">
          {/* Filter Section */}
          <div className="col-md-3 mb-4">
            <div className="filter-section p-3 border rounded shadow-sm">
              <h4 className="text-center mt-3">Filter By Category</h4>
              <div className="d-flex flex-column">
                {categories?.map((c) => (
                  <Checkbox
                    key={c._id}
                    onChange={(e) => handleFilter(e.target.checked, c._id)}
                  >
                    {c.name}
                  </Checkbox>
                ))}
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
                onClick={() => window.location.reload()} // Use navigate to reload homepage
              >
                Reset Filter
              </button>
            </div>
          </div>

          {/* Products Section */}
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
                        <p>Category: {p.category?.name || "Uncategorized"}</p>
                        <p className="card-text text-muted text-truncate">
                          {p.description || "No Description"}
                        </p>
                        <h5 className="card-title text-truncate">
                          Rs.{p.price || "No Price"}
                        </h5>

                        <button className="btn btn-primary btn-block mb-2 w-100">
                          More Details
                        </button>
                        <button className="btn btn-success btn-block mt-2 w-100">
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
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
