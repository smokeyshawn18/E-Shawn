import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { NavLink } from "react-router-dom";

// Import Lucide icons
import { ShoppingCart, FileText, Clock } from "lucide-react";

const Orders = () => {
  return (
    <Layout title="Orders - E-Shawn" description="User Orders">
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar - User Menu */}
          <div className="col-md-3">
            <UserMenu />
          </div>

          {/* Orders Content */}
          <div className="col-md-9">
            <div className="card shadow-lg rounded-lg p-4 bg-light">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="text-dark fw-bold">All Orders</h3>
                {/* Placeholder for any additional buttons or links */}
              </div>

              {/* Orders List */}
              <div className="row">
                {/* Example Order Card */}
                <div className="col-md-4">
                  <div className="card shadow-sm rounded p-3 mb-3 bg-white">
                    <div className="d-flex align-items-center">
                      <ShoppingCart className="text-primary" size={32} />
                      <div className="ms-3">
                        <h5 className="fw-bold">Order #1</h5>
                        <p>
                          <strong>Status:</strong> Delivered
                        </p>
                        <p>
                          <strong>Date:</strong> 2024-01-12
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Another Example Order Card */}
                <div className="col-md-4">
                  <div className="card shadow-sm rounded p-3 mb-3 bg-white">
                    <div className="d-flex align-items-center">
                      <FileText className="text-success" size={32} />
                      <div className="ms-3">
                        <h5 className="fw-bold">Order #2</h5>
                        <p>
                          <strong>Status:</strong> Pending
                        </p>
                        <p>
                          <strong>Date:</strong> 2024-01-10
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Another Example Order Card */}
                <div className="col-md-4">
                  <div className="card shadow-sm rounded p-3 mb-3 bg-white">
                    <div className="d-flex align-items-center">
                      <Clock className="text-warning" size={32} />
                      <div className="ms-3">
                        <h5 className="fw-bold">Order #3</h5>
                        <p>
                          <strong>Status:</strong> In Progress
                        </p>
                        <p>
                          <strong>Date:</strong> 2024-01-11
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* More order cards can be added below */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
