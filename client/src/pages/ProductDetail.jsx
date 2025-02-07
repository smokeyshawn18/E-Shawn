import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams } from "react-router-dom";

const API = import.meta.env.VITE_API || "http://localhost:8000";

const axiosInstance = axios.create({ baseURL: API });

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))?.token
      : null;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const params = useParams();

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axiosInstance.get(
        `/api/v1/product/single-product/${params.slug}`
      );
      setProduct(data?.product);
    } catch (error) {
      console.error("Error fetching product:", error);
      if (error.response?.status === 404) {
        toast.error("Product not found!");
      } else {
        toast.error("Error while getting product");
      }
    }
  };

  return (
    <Layout>
      <div className="container py-5">
        <div className="row">
          {/* Product Image */}
          <div className="col-md-5 col-12 d-flex justify-content-center mb-4">
            <img
              className="img-fluid rounded shadow-lg"
              src={
                product._id
                  ? `${API}/api/v1/product/product-photo/${product._id}`
                  : ""
              }
              alt={product.name || "Product Image"}
              style={{
                maxHeight: "400px", // Control height for larger screens
                width: "100%",
                objectFit: "cover",
              }}
              onError={(e) => (e.target.src = "/default-image.jpg")} // Fallback image
            />
          </div>

          {/* Product Info */}
          <div className="col-md-7 col-12 d-flex flex-column justify-content-center align-items-start px-4">
            <h1 className="display-4 mb-3 text-primary">{product.name}</h1>
            <p className="lead text-muted mb-3">{product.description}</p>
            <h3 className="text-success mb-4">{`Price: $${product.price})}`}</h3>
            <button className="btn btn-lg btn-primary text-white px-4 py-2 rounded-3 shadow-sm">
              Add To Cart
            </button>
          </div>
        </div>

        {/* Similar Products Section */}
        <div className="row mt-5">
          <div className="col-12 text-center">
            <h3 className="text-center mb-4">You Might Also Like</h3>
            <div className="d-flex justify-content-center">
              {/* Add your similar products component here */}
              <div className="card mx-2" style={{ width: "200px" }}>
                <img
                  src="/default-image.jpg"
                  className="card-img-top"
                  alt="Similar Product"
                />
                <div className="card-body">
                  <h5 className="card-title">Product Name</h5>
                  <p className="card-text">$20.00</p>
                  <button className="btn btn-sm btn-outline-primary">
                    View Details
                  </button>
                </div>
              </div>
              <div className="card mx-2" style={{ width: "200px" }}>
                <img
                  src="/default-image.jpg"
                  className="card-img-top"
                  alt="Similar Product"
                />
                <div className="card-body">
                  <h5 className="card-title">Product Name</h5>
                  <p className="card-text">$25.00</p>
                  <button className="btn btn-sm btn-outline-primary">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
