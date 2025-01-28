import { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

// Define the API base URL
const API = import.meta.env.VITE_API || "http://localhost:8000";

// Get auth token dynamically from localStorage
const getAuthToken = () => {
  const token = localStorage.getItem("auth");
  return token ? JSON.parse(token)?.token : null; // Ensure this is the correct path to the token
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

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllProducts = async () => {
    try {
      const { data } = await axiosInstance.get("/api/v1/product/get-product");
      setProducts(data.product); // Use data.product instead of data.products
      setLoading(false);
      toast.success("Products fetched successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="container-fluid py-4">
        <div className="row">
          {/* Sidebar */}
          <div className="col-12 col-md-3 mb-4 mb-md-0">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body p-3">
                <AdminMenu />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-12 col-md-9">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-light">
                <h5 className="mb-0 text-center text-md-start">
                  All Products Lists
                </h5>
              </div>
              <div className="card-body">
                {loading ? (
                  <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : products.length === 0 ? (
                  <p className="text-center">No products found.</p>
                ) : (
                  <div className="row g-4">
                    {products.map((p) => (
                      <div
                        key={p._id}
                        className="col-12 col-sm-6 col-md-4 col-lg-3"
                      >
                        <Link
                          to={`/dashboard/admin/product/${p.slug}`}
                          className="text-decoration-none text-dark"
                        >
                          <div className="card h-100 shadow-sm">
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
                                {p.name}
                              </h5>
                              <p className="card-text text-muted text-truncate">
                                {p.description}
                              </p>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
