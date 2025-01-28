import { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/Auth";
import axios from "axios";
import { Checkbox } from "antd";

const HomePage = () => {
  const [auth] = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

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
      const { data } = await axiosInstance.get("/api/v1/product/get-product");

      setProducts(data.product || []);
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const getallcategory = async () => {
    try {
      const { data } = await axiosInstance.get(
        "/api/v1/category/get-categories"
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

  return (
    <Layout title="All Products - With Best Price!">
      <div className="row">
        <div className="col-md-3">
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox key={c._id} onChange={(e) => console.log(e)}>
                {c.name}
              </Checkbox>
            ))}
          </div>
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products</h1>
          <div className="row d-flex flex-wrap">
            {products && products.length > 0 ? (
              products.map((p) => (
                <div
                  key={p._id}
                  className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
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
                        {p.name || "No Name"}
                      </h5>
                      <p className="card-text text-muted text-truncate">
                        {p.description || "No Description"}
                      </p>
                      <h5 className="card-title text-truncate">
                        Rs.{p.price || "No Price"}
                      </h5>

                      <button className="btn btn-primary ">More Details</button>
                      <button className="btn btn-success mt-2">
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
    </Layout>
  );
};

export default HomePage;
