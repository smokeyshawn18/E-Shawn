import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import Layout from "../../components/Layout/Layout";
import Logo from "../../assets/Logo.png";
import {
  Mail,
  Lock,
  ArrowRight,
  User,
  Phone,
  MapPin,
  SpellCheck,
} from "lucide-react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const API = import.meta.env.VITE_API;
      const payload = { name, email, password, phone, address, answer };
      const res = await axios.post(`${API}/api/v1/auth/register`, payload);
      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    }
    setLoading(false);
  };

  return (
    <Layout title="Register - E-commerce App">
      <div
        className="min-vh-100 d-flex align-items-center justify-content-center py-5"
        style={{
          background:
            "linear-gradient(135deg,rgb(37, 209, 129) 0%,rgb(39, 167, 206) 100%)",
          backgroundSize: "cover",
        }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
              <div className="text-center mb-4">
                <img
                  src={Logo}
                  alt="E-Shawn"
                  className="img-fluid rounded mx-auto d-block"
                  style={{ width: "100px", height: "100px" }}
                />
                <h1 className="text-white mb-2 mt-3">Create Account</h1>
                <p className="text-dark fw-bold">
                  Join E-Shawn! Your best products store.
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
                      <label htmlFor="name" className="form-label fw-semibold">
                        Full Name
                      </label>
                      <div className="input-group input-group-lg">
                        <span className="input-group-text bg-white border-end-0">
                          <User className="text-primary" size={20} />
                        </span>
                        <input
                          type="text"
                          className="form-control border-start-0 ps-0 shadow-none"
                          id="name"
                          placeholder="John Doe"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          style={{ fontSize: "1rem" }}
                        />
                      </div>
                    </div>

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
                          style={{ fontSize: "1rem" }}
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="password"
                        className="form-label fw-semibold"
                      >
                        Password
                      </label>
                      <div className="input-group input-group-lg">
                        <span className="input-group-text bg-white border-end-0">
                          <Lock className="text-primary" size={20} />
                        </span>
                        <input
                          type="password"
                          className="form-control border-start-0 ps-0 shadow-none"
                          id="password"
                          placeholder="Create a strong password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          style={{ fontSize: "1rem" }}
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="phone" className="form-label fw-semibold">
                        Phone Number
                      </label>
                      <div className="input-group input-group-lg">
                        <span className="input-group-text bg-white border-end-0">
                          <Phone className="text-primary" size={20} />
                        </span>
                        <input
                          type="tel"
                          className="form-control border-start-0 ps-0 shadow-none"
                          id="phone"
                          placeholder="+1 (234) 567-8900"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                          style={{ fontSize: "1rem" }}
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="address"
                        className="form-label fw-semibold"
                      >
                        Address
                      </label>
                      <div className="input-group input-group-lg">
                        <span className="input-group-text bg-white border-end-0">
                          <MapPin className="text-primary" size={20} />
                        </span>
                        <input
                          type="text"
                          className="form-control border-start-0 ps-0 shadow-none"
                          id="address"
                          placeholder="Your full address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          required
                          style={{ fontSize: "1rem" }}
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="address"
                        className="form-label fw-semibold"
                      >
                        Answer
                      </label>
                      <div className="input-group input-group-lg">
                        <span className="input-group-text bg-white border-end-0">
                          <SpellCheck className="text-primary" size={20} />
                        </span>
                        <input
                          type="text"
                          className="form-control border-start-0 ps-0 shadow-none"
                          id="answer"
                          placeholder="What is your favorite sports?"
                          value={answer}
                          onChange={(e) => setAnswer(e.target.value)}
                          required
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
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      disabled={loading}
                    >
                      {loading ? (
                        <div
                          className="spinner-border text-light"
                          role="status"
                          style={{ width: "1.5rem", height: "1.5rem" }}
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      ) : (
                        <span className="d-flex align-items-center justify-content-center">
                          Create Account
                          <ArrowRight className="ms-2" size={20} />
                        </span>
                      )}
                    </button>

                    <div className="text-center">
                      <p className="mb-0">
                        <span className="text-muted">
                          Already have an account?{" "}
                        </span>
                        <Link
                          to="/login"
                          className="text-decoration-none fw-semibold"
                          style={{ color: "#667eea" }}
                        >
                          Sign in
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

export default Register;
