import Layout from "../../components/Layout/Layout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import Logo from "../../assets/Logo.png"; // Import the logo
import { Mail, Lock, ArrowRight, SpellCheck } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [new_password, setnew_password] = useState("");
  const [answer, setAnswer] = useState(""); // For security question answer

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const API = import.meta.env.VITE_API;
      const payload = { email, new_password, answer };
      const res = await axios.post(
        `${API}/api/v1/auth/forgot-password`,
        payload
      );

      if (res && res.data.message) {
        toast.success(res.data.message); // Success message with success toast
        navigate("/login"); // Redirect to login after success
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      toast.error(errorMessage); // Display error message
    }
  };

  return (
    <Layout title="Forgot Password - E-Shawn">
      <div
        className="min-vh-100 d-flex align-items-center justify-content-center py-5"
        style={{
          background:
            "linear-gradient(135deg,rgb(14, 87, 113) 0%,rgb(22, 127, 122) 100%)", // New gradient background
          backgroundSize: "cover",
        }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-6 col-lg-5">
              <div className="text-center mb-4">
                <img
                  src={Logo}
                  alt="E-Shawn"
                  className="img-fluid rounded mx-auto d-block"
                  style={{ width: "100px", height: "100px" }}
                />
                <h1 className="text-white mb-2 mt-3">Change Your Password</h1>
              </div>

              <div
                className="card border-0"
                style={{
                  background: "rgba(255, 255, 255, 0.85)", // Slightly lighter background
                  backdropFilter: "blur(12px)", // Increased blur effect for more modern look
                  borderRadius: "16px",
                }}
              >
                <div className="card-body p-4 p-md-5">
                  <form onSubmit={handleSubmit} className="needs-validation">
                    <div className="mb-4">
                      <label htmlFor="email" className="form-label fw-semibold">
                        Email Address
                      </label>
                      <div className="input-group input-group-lg">
                        <span className="input-group-text bg-white border-end-0">
                          <Mail className="text-dark" size={20} />{" "}
                          {/* Changed icon color */}
                        </span>
                        <input
                          type="email"
                          className="form-control border-start-0 ps-0 shadow-none"
                          id="email"
                          placeholder="name@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          style={{ fontSize: "1rem" }}
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="answer"
                        className="form-label fw-semibold"
                      >
                        Answer to Security Question
                      </label>
                      <div className="input-group input-group-lg">
                        <span className="input-group-text bg-white border-end-0">
                          <SpellCheck className="text-dark" size={20} />
                        </span>
                        <input
                          type="text"
                          className="form-control border-start-0 ps-0 shadow-none"
                          id="answer"
                          placeholder="Enter your favorite sport"
                          value={answer}
                          onChange={(e) => setAnswer(e.target.value)}
                          required
                          style={{ fontSize: "1rem" }}
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="input-group input-group-lg">
                        <span className="input-group-text bg-white border-end-0">
                          <Lock className="text-dark" size={20} />{" "}
                          {/* Changed icon color */}
                        </span>
                        <input
                          type="password"
                          className="form-control border-start-0 ps-0 shadow-none"
                          id="password"
                          placeholder="Enter your new password"
                          value={new_password}
                          onChange={(e) => setnew_password(e.target.value)}
                          required
                          style={{ fontSize: "1rem" }}
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-info w-100 btn-lg mb-4 position-relative overflow-hidden"
                      style={{
                        background:
                          "linear-gradient(to right,rgb(23, 106, 179),rgb(19, 101, 195))", // Gradient button color
                        border: "none",
                        height: "54px",
                      }}
                    >
                      <span className="d-flex align-items-center justify-content-center text-light">
                        Reset
                        <ArrowRight className="ms-2" size={20} />
                      </span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
