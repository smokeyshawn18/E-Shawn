import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/Auth";
import Layout from "../../components/Layout/Layout";
import { Mail, Lock, ArrowRight, Loader } from "lucide-react";
import Logo from "../../assets/Logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submission starts
    try {
      const API = import.meta.env.VITE_API;
      const payload = { email, password };
      const res = await axios.post(`${API}/api/v1/auth/login`, payload);

      if (res && res.data.success) {
        toast.success(res.data.message);

        // Set the authentication context and localStorage
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));

        // Check user role and redirect accordingly
        if (res.data.user.role === 1) {
          // Admin dashboard
          navigate("/dashboard/admin");
        } else {
          // User dashboard
          navigate("/dashboard/user");
        }
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    } finally {
      setLoading(false); // Set loading to false after submission completes
    }
  };

  return (
    <Layout title="Login - E-Shawn">
      <div
        className="min-vh-100 d-flex align-items-center justify-content-center py-5"
        style={{
          background:
            "linear-gradient(135deg,rgb(45, 212, 171) 0%,rgb(60, 144, 240) 100%)",
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
                <h1 className="text-white mb-2 mt-3">Welcome Back!</h1>
                <p className="text-dark fw-bold">
                  We're excited to see you again
                </p>
              </div>

              <div
                className="card border-0"
                style={{
                  background: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(10px)",
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
                          <Mail className="text-primary" size={20} />
                        </span>
                        <input
                          type="email"
                          className="form-control border-start-0 ps-0 shadow-none"
                          id="email"
                          placeholder="name@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          disabled={loading} // Disable input during loading
                          style={{ fontSize: "1rem" }}
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="d-flex justify-content-between align-items-center">
                        <label
                          htmlFor="password"
                          className="form-label fw-semibold"
                        >
                          Password
                        </label>
                        <button
                          type="button"
                          onClick={() => navigate("/forgot-password")}
                          className="btn btn-link p-0 text-decoration-none"
                          style={{ fontSize: "0.875rem" }}
                          disabled={loading} // Disable button during loading
                        >
                          Forgot password?
                        </button>
                      </div>
                      <div className="input-group input-group-lg">
                        <span className="input-group-text bg-white border-end-0">
                          <Lock className="text-primary" size={20} />
                        </span>
                        <input
                          type="password"
                          className="form-control border-start-0 ps-0 shadow-none"
                          id="password"
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          disabled={loading} // Disable input during loading
                          style={{ fontSize: "1rem" }}
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary w-100 btn-lg mb-4 position-relative overflow-hidden"
                      style={{
                        background:
                          "linear-gradient(to right, #667eea, #764ba2)",
                        border: "none",
                        height: "54px",
                      }}
                      disabled={loading} // Disable button during loading
                    >
                      <span className="d-flex align-items-center justify-content-center">
                        {loading ? (
                          <Loader className="spinner-grow" size={20} />
                        ) : (
                          <>
                            Sign in
                            <ArrowRight className="ms-2" size={20} />
                          </>
                        )}
                      </span>
                    </button>

                    <div className="text-center">
                      <p className="mb-0">
                        <span className="text-muted">
                          New to our platform?{" "}
                        </span>
                        <Link
                          to="/register"
                          className="text-decoration-none fw-semibold"
                          style={{ color: "#667eea" }}
                        >
                          Create an account
                        </Link>
                      </p>
                    </div>
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

export default Login;
