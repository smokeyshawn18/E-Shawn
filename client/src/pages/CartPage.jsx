import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/Cart";
import { useAuth } from "../context/Auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";

const CartPage = () => {
  //
  const API = import.meta.env.VITE_API || "http://localhost:8000";
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
      toast.success("Item removed successfully");
    } catch (error) {
      console.log(error);
      toast.error("Error while removing item");
    }
  };

  //payment token fn

  const getToken = async () => {
    try {
      const { data } = await axios.get(`${API}/api/v1/product/braintree/token`);
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  // payment handle fn

  const handlePayment = async () => {
    try {
      setLoading(true);

      // Retrieve auth data from localStorage
      const authData = JSON.parse(localStorage.getItem("auth"));
      const token = authData?.token;

      if (!token) {
        toast.error("Authentication token missing! Please log in again.");
        setLoading(false);
        return;
      }

      const { nonce } = await instance.requestPaymentMethod();

      const { data } = await axios.post(
        `${API}/api/v1/product/braintree/payment`,
        { nonce, cart },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in headers
          },
        }
      );

      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Successfully purchased");
    } catch (error) {
      console.log("Payment Error:", error.response?.data || error);
      toast.error("Error while processing payment");
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container py-4">
        <div className="row">
          {/* Welcome Message */}
          <div className="col-12">
            <h1 className="text-center bg-light py-3 rounded shadow-sm">
              {`Welcome ${(auth?.token && auth?.user?.name) || ""}`}
            </h1>
            <h4 className="text-center text-muted mt-3">
              {cart?.length
                ? `You have ${cart?.length} items in your cart ${
                    auth?.token ? "" : "please login to checkout"
                  }`
                : "Your Cart is Empty"}
            </h4>
          </div>
        </div>

        <div className="row mt-4">
          {/* Cart Items Section */}
          <div className="col-lg-7">
            {cart?.map((p) => (
              <div className="card mb-4 shadow-sm border-0" key={p._id}>
                <div className="row g-0">
                  {/* Product Image */}
                  <div className="col-md-4 d-flex align-items-center justify-content-center">
                    <img
                      className="img-fluid rounded"
                      src={`${API}/api/v1/product/product-photo/${p._id}`}
                      alt={p.name}
                      style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  {/* Product Details */}
                  <div className="col-md-6">
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text text-muted">
                        {p.description.substring(0, 50)}...
                      </p>
                      <p className="fw-bold text-success">$ {p.price}</p>
                    </div>
                  </div>
                  {/* Remove Button */}
                  <div className="col-md-2 d-flex align-items-center">
                    <button
                      className="btn btn-outline-danger w-100"
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary Section */}
          <div className="col-lg-4 offset-lg-1">
            <div className="card p-4 shadow-sm border-0 rounded-3 bg-light">
              <div className="card-body">
                <h2 className="text-center text-primary fw-bold">
                  Cart Summary
                </h2>
                <p className="text-center text-success fw-bold">
                  Total | Checkout | Payment
                </p>
                <hr />
                <h4 className="text-center fw-bold text-dark">
                  Total: {totalPrice()}
                </h4>

                {/* Address Section */}
                <div className="mt-4">
                  {auth?.user?.address ? (
                    <div className="text-center">
                      <p className="text-dark fw-bold fs-5">
                        Current Address: {auth?.user?.address}
                      </p>
                      <button
                        className="btn btn-warning w-100 fw-bold"
                        onClick={() => navigate("/dashboard/user/profile")}
                      >
                        Update Address
                      </button>
                    </div>
                  ) : (
                    <div className="text-center">
                      {auth?.token ? (
                        <button
                          className="btn btn-warning w-100 fw-bold"
                          onClick={() => navigate("/dashboard/user/profile")}
                        >
                          Update Address
                        </button>
                      ) : (
                        <button
                          className="btn btn-danger w-100 fw-bold"
                          onClick={() => navigate("/login", { state: "/cart" })}
                        >
                          Please Login to Checkout
                        </button>
                      )}
                    </div>
                  )}

                  {!clientToken || !cart?.length ? (
                    ""
                  ) : (
                    <>
                      <DropIn
                        options={{
                          authorization: clientToken,
                        }}
                        onInstance={(instance) => setInstance(instance)}
                      />

                      <button
                        className="btn btn-primary"
                        onClick={handlePayment}
                        disabled={loading || !instance || !auth?.user?.address}
                      >
                        {loading ? "Processing ...." : "Make Payment"}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
