import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import toast from "react-hot-toast";
import axios from "axios";
import moment from "moment";

const Orders = () => {
  const [auth, setAuth] = useState(
    () => JSON.parse(localStorage.getItem("auth")) || {}
  );
  const [orders, setOrders] = useState([]);
  const API = import.meta.env.VITE_API || "http://localhost:8000";

  const getOrders = async () => {
    try {
      const token = auth?.token;
      if (!token) {
        console.error("Token not found");
        return;
      }

      const { data } = await axios.get(`${API}/api/v1/auth/order`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Error while getting Orders");
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title="Orders - E-Shawn" description="User Orders">
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar - User Menu */}
          <div className="col-12 col-md-3 mb-4">
            <UserMenu />
          </div>

          {/* Orders Content */}
          <div className="col-12 col-md-9">
            <div className="card shadow-lg rounded p-4 bg-light">
              <h3 className="text-dark fw-bold mb-4 text-center text-md-start">
                All Orders
              </h3>

              {orders.length === 0 ? (
                <div className="alert alert-warning text-center">
                  No orders found
                </div>
              ) : (
                orders.map((order, index) => (
                  <div
                    key={order._id}
                    className="card border-0 shadow-sm p-3 mb-4"
                  >
                    {/* Order Info */}
                    <div className="d-flex justify-content-between align-items-center flex-wrap">
                      <h5 className="fw-bold text-primary">
                        Order #{index + 1}
                      </h5>
                      <span
                        className={`badge bg-${
                          order.payment ? "success" : "danger"
                        } fs-6`}
                      >
                        {order.payment ? "Paid" : "Not Paid"}
                      </span>
                    </div>

                    {/* Order Details - Responsive for Mobile */}
                    <div className="d-none d-md-block">
                      <table className="table table-bordered mt-3">
                        <thead className="table-dark">
                          <tr>
                            <th>Status</th>
                            <th>Buyer</th>
                            <th>Date</th>
                            <th>Items</th>
                            <th>Quantity</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <span className="badge bg-warning text-dark fs-6">
                                {order?.status}
                              </span>
                            </td>
                            <td>{order?.buyer?.name}</td>
                            <td>{moment(order?.createdAt).fromNow()}</td>
                            <td>
                              {order.products
                                .map((product) => product.name)
                                .join(", ")}
                            </td>
                            <td>{order?.products?.length}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Mobile-Friendly Order Details */}
                    <div className="d-md-none border rounded p-3 bg-white mt-3">
                      <p className="fw-bold mb-2">
                        Status:
                        <span className="badge bg-warning text-dark fs-6 ms-2">
                          {order?.status}
                        </span>
                      </p>
                      <p className="mb-2">
                        <strong>Buyer:</strong> {order?.buyer?.name}
                      </p>
                      <p className="mb-2">
                        <strong>Date:</strong>{" "}
                        {moment(order?.createdAt).fromNow()}
                      </p>
                      <p className="mb-2">
                        <strong>Items:</strong>{" "}
                        {order.products.map((p) => p.name).join(", ")}
                      </p>
                      <p className="mb-0">
                        <strong>Quantity:</strong> {order?.products?.length}
                      </p>
                    </div>

                    {/* Product Details */}
                    <div className="row mt-3">
                      {order?.products?.map((p) => (
                        <div
                          className="col-12 col-sm-6 col-md-4 mb-3"
                          key={p._id}
                        >
                          <div className="card border-0 shadow-sm h-100">
                            <img
                              className="card-img-top"
                              src={`${API}/api/v1/product/product-photo/${p._id}`}
                              alt={p.name}
                              style={{ height: "180px", objectFit: "cover" }}
                            />
                            <div className="card-body">
                              <h6 className="card-title">{p.name}</h6>
                              <p className="text-muted small">
                                {p.description.substring(0, 50)}...
                              </p>
                              <p className="fw-bold text-success">
                                Rs. {p.price}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
