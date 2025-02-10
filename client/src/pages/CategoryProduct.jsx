import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const CategoryProduct = () => {
  const API = import.meta.env.VITE_API || "http://localhost:8000";
  const navigate = useNavigate();
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

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
    <Layout>
      <div className="container mt-4">
        <h3 className="text-center">
          Category - {category?.name || "Category"}
        </h3>
        <h5 className="text-center">{products?.length} results found</h5>

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
    </Layout>
  );
};

export default CategoryProduct;
