import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/Cart";

const CategoryProduct = () => {
  const API = import.meta.env.VITE_API || "http://localhost:8000";
  const navigate = useNavigate();
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [cart, setCart] = useCart();

  useEffect(() => {
    if (params?.slug) {
      getProductByCategory();
    }
  }, [params?.slug, API]);

  const getProductByCategory = async () => {
    try {
      const { data } = await axios.get(
        `${API}/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products || []);
      setCategory(data?.category || null);
    } catch (error) {
      console.log(error);
      toast.error("Error while fetching product");
    }
  };

  return (
    <Layout title={`Category - ${category?.name || "Category"}`}>
      <div className="container py-5">
        <h3 className="text-center text-dark fw-bold">
          Category - {category?.name || "Category"}
        </h3>
        <h5 className="text-center text-muted mb-4">
          {products?.length} results found
        </h5>

        <div className="row g-4">
          {products && products.length > 0 ? (
            products.map((p) => (
              <div key={p._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <div className="card h-100 shadow-lg border-0 rounded">
                  <img
                    className="card-img-top img-fluid rounded-top"
                    src={`${API}/api/v1/product/product-photo/${p._id}`}
                    alt={p.name}
                    style={{
                      height: "220px",
                      objectFit: "cover",
                    }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title text-dark fw-semibold text-truncate">
                      {p.name || "No Name"}
                    </h5>
                    <p className="card-text text-secondary text-truncate">
                      {p.description || "No Description"}
                    </p>
                    <h5 className="card-title text-success fw-bold">
                      Rs.{p.price || "No Price"}
                    </h5>
                  </div>
                  <div className="card-footer bg-white border-0 d-flex flex-column gap-2">
                    <button
                      className="btn btn-primary fw-semibold"
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
            <p className="text-center text-danger">No products found.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
