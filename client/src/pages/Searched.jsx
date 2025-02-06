import React from "react";
import Layout from "./../components/Layout/Layout";
import { useSearch } from "../context/Search";

const Searched = () => {
  const [values, setValues] = useSearch();
  const API = import.meta.env.VITE_API || "http://localhost:8000";

  return (
    <Layout title={"Search Results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? "No products found that you searched"
              : `Found ${values?.results.length} products`}
          </h6>
          <div className="row d-flex flex-wrap mt-4">
            {values?.results.length > 0 ? (
              values.results.map((p) => (
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
    </Layout>
  );
};

export default Searched;
