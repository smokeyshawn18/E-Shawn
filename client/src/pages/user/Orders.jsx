import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";

const Orders = () => {
  return (
    <Layout>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          {/* Sidebar - User Menu */}
          <div className="col-12 col-md-3 mb-4 mb-md-0">
            <UserMenu />
          </div>

          {/* Orders Content */}
          <div className="col-12 col-md-9">
            <h1 className="mb-4">All Orders</h1>

            {/* Add your orders content here */}
            <div className="card shadow-sm p-3 mb-4">
              <h5 className="card-title">Order #1</h5>
              <p>Details of the order...</p>
            </div>
            <div className="card shadow-sm p-3 mb-4">
              <h5 className="card-title">Order #2</h5>
              <p>Details of the order...</p>
            </div>
            {/* More order cards can be added here */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
