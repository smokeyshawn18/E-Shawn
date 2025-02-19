import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/Cart";
import { useAuth } from "../context/Auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import ScrollToTopButton from "../components/ScrollToTop";
import { LucideTrash2 } from "lucide-react";

const CartPage = () => {
  const API = import.meta.env.VITE_API || "http://localhost:8000";
  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const navigate = useNavigate();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState(null); // Changed from "" to null
  const [loading, setLoading] = useState(false);

  const totalPrice = () => {
    try {
      return cart
        .reduce((sum, item) => sum + item.price, 0)
        .toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        });
    } catch (error) {
      console.log(error);
      return "$0.00";
    }
  };

  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      if (index !== -1) {
        myCart.splice(index, 1);
        setCart(myCart);
        localStorage.setItem("cart", JSON.stringify(myCart));
        toast.success("Item removed successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while removing item");
    }
  };

  // Fetch Braintree Token
  const getToken = async () => {
    try {
      const { data } = await axios.get(`${API}/api/v1/product/braintree/token`);
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getToken();
    }
  }, [auth?.token]);

  // Payment Handler
  const handlePayment = async () => {
    try {
      if (!instance) {
        toast.error("Payment gateway not loaded properly!");
        return;
      }

      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();

      const { data } = await axios.post(
        `${API}/api/v1/product/braintree/payment`,
        { nonce, cart },
        {
          headers: { Authorization: `Bearer ${auth?.token}` },
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
          <div className="col-12">
            <h1 className="text-center bg-light py-3 rounded shadow-sm">
              {`Welcome ${auth?.user?.name || ""}`}
            </h1>
            <h4 className="text-center text-danger mt-3">
              {cart.length
                ? `You have ${cart.length} items in your cart ${
                    auth?.token ? "" : "Please Login to checkout!"
                  }`
                : "Your Cart is Empty"}
            </h4>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-lg-7">
            {cart.map((p) => (
              <div className="card mb-4 shadow-sm border-0" key={p._id}>
                <div className="row g-0">
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
                  <div className="col-md-6">
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text text-muted">
                        {p.description.substring(0, 50)}...
                      </p>
                      <p className="fw-bold fs-4 text-success">$ {p.price}</p>
                    </div>
                  </div>
                  <div className="col-md-2 d-flex align-items-center">
                    <button
                      className="btn btn-danger w-90"
                      onClick={() => removeCartItem(p._id)}
                    >
                      <LucideTrash2 className="me-1" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

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

                {clientToken && cart.length > 0 && (
                  <>
                    <DropIn
                      options={{ authorization: clientToken }}
                      onInstance={setInstance}
                    />
                    <button
                      className="btn btn-primary w-100"
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
        <ScrollToTopButton />
      </div>
    </Layout>
  );
};

export default CartPage;
