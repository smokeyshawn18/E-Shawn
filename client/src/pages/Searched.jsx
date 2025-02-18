import React from "react";
import Layout from "./../components/Layout/Layout";
import { useSearch } from "../context/Search";
import { useNavigate } from "react-router-dom";
import ScrollToTopButton from "../components/ScrollToTop";

const Searched = () => {
  const navigate = useNavigate();
  const [values] = useSearch();
  const API = import.meta.env.VITE_API || "http://localhost:8000";

  return (
    <Layout title={"Search Results"}>
      <div className="container my-5">
        <div className="text-center">
          <h1 className="fw-bold text-primary">Search Results</h1>
          <h6 className="text-muted">
            {values?.results.length < 1
              ? "No products found that match your search."
              : `Found ${values?.results.length} products`}
          </h6>
        </div>

        {/* Product Grid */}
        <div className="row g-4 mt-4">
          {values?.results.length > 0 ? (
            values.results.map((p) => (
              <div key={p._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <div className="card h-100 border-0 shadow-lg rounded-3">
                  <img
                    className="card-img-top img-fluid rounded-top"
                    src={`${API}/api/v1/product/product-photo/${p._id}`}
                    alt={p.name}
                    style={{
                      height: "200px",
                      objectFit: "cover",
                      transition: "transform 0.3s ease",
                    }}
                    onMouseOver={(e) =>
                      (e.target.style.transform = "scale(1.05)")
                    }
                    onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title text-truncate fw-semibold">
                      {p.name || "No Name"}
                    </h5>
                    <p className="card-text text-muted text-truncate">
                      {p.description || "No Description"}
                    </p>
                    <h5 className="card-title text-primary fw-bold">
                      $ {p.price || "No Price"}
                    </h5>
                    <button
                      className="btn btn-outline-primary w-100 mt-2"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button className="btn btn-success w-100 mt-2">
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center my-5">
              <img
                src="/assets/images/no-results.png"
                alt="No Results"
                className="img-fluid"
                style={{ maxWidth: "250px" }}
              />
              <p className="mt-3 text-muted">
                Try searching with different keywords.
              </p>
            </div>
          )}
        </div>

        <ScrollToTopButton />
      </div>
    </Layout>
  );
};

export default Searched;
