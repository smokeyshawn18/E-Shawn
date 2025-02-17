import React from "react";
import Layout from "../components/Layout/Layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";
import { Folder, Tag } from "lucide-react"; // Importing Lucide icons

const Categories = () => {
  const categories = useCategory();

  return (
    <Layout title="All Categories">
      <div className="container py-5">
        {/* Page Title */}
        <h1 className="text-center text-black fw-bold mb-5">All Categories</h1>

        <div className="row justify-content-center">
          {categories.map((c) => (
            <div
              key={c._id}
              className="col-md-4 col-sm-6 mb-4 d-flex justify-content-center"
            >
              <Link
                to={`/category/${c.slug}`}
                className="btn btn-outline-primary btn-lg w-100 d-flex align-items-center justify-content-between p-3 rounded shadow-sm transition-all"
                style={{
                  fontWeight: "600",
                  fontSize: "1.2rem",
                  transition: "0.3s",
                }}
              >
                <Folder className="me-2 text-primary" size={24} />
                {c.name}
                <Tag className="ms-2 text-primary" size={20} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
