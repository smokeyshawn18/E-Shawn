import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useCart } from "../context/Cart";

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
  const [relatedProducts, setRelatedProducts] = useState([]);
  const params = useParams();
  const [cart, setCart] = useCart();

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axiosInstance.get(
        `/api/v1/product/single-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.error("Error fetching product:", error);
      if (error.response?.status === 404) {
        toast.error("Product not found!");
      } else {
        toast.error("Error while getting product");
      }
    }
  };

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axiosInstance.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
      toast.error("Error while getting similar products");
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
          <div
            key={product._id}
            className="col-md-7 col-12 d-flex flex-column justify-content-center align-items-start px-4"
          >
            <h1 className="display-4 mb-3 text-primary">{product.name}</h1>
            <p className="lead text-muted mb-3">{product.description}</p>
            <h5 className="text-black mb-4">
              Category: {product?.category?.name}
            </h5>
            <h3 className="text-secondary mb-4">{`Price: Rs. ${product.price}`}</h3>
            <button
              className="btn btn-success btn-block mt-2 w-100"
              onClick={() => {
                setCart([...cart, product]);
                localStorage.setItem(
                  "cart",
                  JSON.stringify([...cart, product])
                );
                toast.success("Item added to your Cart");
              }}
            >
              Add To Cart
            </button>
          </div>
        </div>

        {/* Similar Products Section */}
        <div className="container mt-5">
          <div className="text-center">
            <h3 className="mb-4 fw-bold">You Might Also Like</h3>
          </div>

          <div className="row justify-content-center g-4">
            {relatedProducts && relatedProducts.length > 0 ? (
              relatedProducts.map((p) => (
                <div key={p._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                  <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                    {/* Product Image */}
                    <div className="position-relative">
                      <img
                        className="card-img-top img-fluid"
                        src={`${API}/api/v1/product/product-photo/${p._id}`}
                        alt={p.name}
                        style={{
                          height: "220px",
                          objectFit: "cover",
                          borderTopLeftRadius: "12px",
                          borderTopRightRadius: "12px",
                        }}
                      />
                    </div>

                    {/* Product Details */}
                    <div className="card-body text-center p-3">
                      <h5 className="card-title fw-bold text-truncate">
                        {p.name || "No Name"}
                      </h5>
                      <p className="card-text text-muted small text-truncate">
                        {p.description || "No Description"}
                      </p>
                      <h5 className="text-black mb-4">
                        Category: {p.category?.name || "Unknown"}
                      </h5>
                      <h5 className="fw-bold text-secondary">
                        Rs. {p.price || "No Price"}
                      </h5>

                      {/* Add to Cart Button */}
                      <button className="btn btn-success mt-3 w-100 fw-bold shadow-sm">
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-muted fs-5 mt-4">
                ❌ No Similar Products Found
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
