import React from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/Cart";
import { useAuth } from "../context/Auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "NPR",
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

  const API = import.meta.env.VITE_API;
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
                      <p className="fw-bold text-success">Rs. {p.price}</p>
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
            <div className="card p-4 shadow-lg border-0">
              <h2 className="text-center">Cart Summary</h2>
              <p className="text-center text-muted">
                Total | Checkout | Payment
              </p>
              <hr />
              <h4 className="text-center fw-bold">Total: Rs. {totalPrice()}</h4>
              <button
                className="btn btn-primary w-100 mt-3"
                disabled={!cart?.length}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
