import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import moment from "moment";
import { Select } from "antd";
import { useAuth } from "../../context/Auth";
const { Option } = Select;
const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Canceled",
  ]);
  const [changeStatus, setChangeStatus] = useState("");
  const [auth, setAuth] = useState(
    () => JSON.parse(localStorage.getItem("auth")) || {}
  );
  const [orders, setOrders] = useState([]);
  //
  const API = import.meta.env.VITE_API || "http://localhost:8000";

  const getOrders = async () => {
    try {
      const token = auth?.token;
      if (!token) {
        console.error("Token not found");
        return;
      }

      const { data } = await axios.get(`${API}/api/v1/auth/all-order`, {
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

  const handleChange = async (orderId, val) => {
    try {
      const token = auth?.token;
      if (!token) {
        console.error("Token not found");
        return;
      }

      const { data } = await axios.put(
        `${API}/api/v1/auth/order-status/${orderId}`,
        { status: val },
        {
          headers: { Authorization: `Bearer ${token}` }, // Ensure token is included
        }
      );
      getOrders();
    } catch (error) {
      console.log(error);
      toast.error("Error in status");
    }
  };

  return (
    <Layout>
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">Manage All Orders</h1>

            {orders.length === 0 ? (
              <div className="alert alert-warning text-center">
                No orders found
              </div>
            ) : (
              orders.map((order, index) => {
                // Calculate total price for the order
                const totalPrice = order.products
                  ? order.products.reduce(
                      (total, product) => total + product.price,
                      0
                    )
                  : 0;

                return (
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
                            <th>Address</th>
                            <th>Quantity</th>
                            <th>Total $</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <Select
                                className="form-select fw-bold text-success border-2 border-primary rounded-3 shadow-sm"
                                style={{
                                  maxWidth: "180px",
                                  padding: "8px 12px",
                                  cursor: "pointer",
                                  transition: "all 0.3s ease-in-out",
                                }}
                                variant={false}
                                onChange={(val) =>
                                  handleChange(order?._id, val)
                                }
                                defaultValue={order?.status}
                              >
                                {status?.map((s, i) => (
                                  <Option
                                    className="text-success fw-bold"
                                    key={i}
                                    value={s}
                                  >
                                    {s}
                                  </Option>
                                ))}
                              </Select>
                            </td>
                            <td>{order?.buyer?.name}</td>
                            <td>{moment(order?.createdAt).fromNow()}</td>
                            <td>
                              {order.products
                                .map((product) => product.name)
                                .join(" & ")}
                            </td>
                            <td>
                              {order?.buyer?.address || "No Address Provided"}
                            </td>
                            <td>{order?.products?.length}</td>
                            <td className="text-success fw-bold">
                              ${totalPrice}
                            </td>
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
                      <p className="mb-2">
                        <strong>Quantity:</strong> {order?.products?.length}
                      </p>
                      <p className="mb-0">
                        <strong>Total:</strong> {totalPrice}
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
                              <p className="fw-bold text-success fs-4">
                                $ {p.price}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
