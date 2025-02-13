import React from "react";
import Layout from "../components/Layout/Layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = useCategory();

  return (
    <Layout title="All Categories">
      <div className="container py-5">
        <h1 className="text-center text-black fw-bold mb-6">All Categories</h1>
        <div className="row justify-content-center">
          {categories.map((c) => (
            <div
              key={c._id}
              className="col-md-6 mb-3 d-flex justify-content-center"
            >
              <Link
                to={`/category/${c.slug}`}
                className="btn btn-primary btn-lg w-100 text-uppercase fw-semibold shadow-sm transition-all"
              >
                {c.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
