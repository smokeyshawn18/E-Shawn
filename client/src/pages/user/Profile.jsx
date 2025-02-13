import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/Auth";
import {
  Mail,
  Lock,
  ArrowRight,
  User,
  Phone,
  MapPin,
  Edit,
} from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const { email, phone, name, address } = auth.user;
    setName(name);
    setEmail(email);
    setPhone(phone);
    setAddress(address);
  }, [auth.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const API = import.meta.env.VITE_API || "http://localhost:8000";
      const payload = { name, email, phone, address };

      if (password) {
        payload.password = password;
      }

      const { data } = await axios.put(`${API}/api/v1/auth/profile`, payload, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });

      if (data?.error) {
        toast.error("Error While Updating User");
      } else {
        setAuth({ ...auth, user: data?.updatedUser });

        let ls = localStorage.getItem("auth");
        if (ls) {
          ls = JSON.parse(ls);
          ls.user = data.updatedUser;
          localStorage.setItem("auth", JSON.stringify(ls));
        }

        toast.success("Profile Updated Successfully");
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Profile Update Error:", error);
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    }
  };

  return (
    <Layout title="Profile - E-Shawn" description="User Profile">
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-md-3 mb-4">
            <UserMenu />
          </div>

          <div className="col-md-9">
            <div className="card shadow-sm border-0 rounded-3 p-4 bg-light">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="text-dark fw-bold">{auth.user.name} Profile</h3>
                <button
                  className="btn btn-outline-primary"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit size={18} className="me-2" />
                  {isEditing ? "Cancel" : "Edit Profile"}
                </button>
              </div>

              <div className="card-body">
                {!isEditing ? (
                  <div>
                    <p>
                      <strong>Full Name:</strong> {name}
                    </p>
                    <p>
                      <strong>Email:</strong> {email}
                    </p>
                    <p>
                      <strong>Phone:</strong> {phone}
                    </p>
                    <p>
                      <strong>Address:</strong> {address}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="needs-validation">
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label fw-semibold">
                        Full Name
                      </label>
                      <div className="input-group">
                        <span className="input-group-text bg-white">
                          <User className="text-primary" size={20} />
                        </span>
                        <input
                          type="text"
                          className="form-control form-control-lg shadow-sm"
                          id="name"
                          placeholder="John Doe"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="email" className="form-label fw-semibold">
                        Email Address
                      </label>
                      <div className="input-group">
                        <span className="input-group-text bg-white">
                          <Mail className="text-primary" size={20} />
                        </span>
                        <input
                          type="email"
                          className="form-control form-control-lg shadow-sm"
                          id="email"
                          value={email}
                          disabled
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label
                        htmlFor="password"
                        className="form-label fw-semibold"
                      >
                        Password
                      </label>
                      <div className="input-group">
                        <span className="input-group-text bg-white">
                          <Lock className="text-primary" size={20} />
                        </span>
                        <input
                          type="password"
                          className="form-control form-control-lg shadow-sm"
                          id="password"
                          placeholder="Update your password if you want to"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="phone" className="form-label fw-semibold">
                        Phone Number
                      </label>
                      <div className="input-group">
                        <span className="input-group-text bg-white">
                          <Phone className="text-primary" size={20} />
                        </span>
                        <input
                          type="tel"
                          className="form-control form-control-lg shadow-sm"
                          id="phone"
                          placeholder="+1 (234) 567-8900"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label
                        htmlFor="address"
                        className="form-label fw-semibold"
                      >
                        Address
                      </label>
                      <div className="input-group">
                        <span className="input-group-text bg-white">
                          <MapPin className="text-primary" size={20} />
                        </span>
                        <input
                          type="text"
                          className="form-control form-control-lg shadow-sm"
                          id="address"
                          placeholder="Your full address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary w-100 btn-lg rounded-pill fw-bold mt-3"
                    >
                      Save Changes <ArrowRight className="ms-2" size={20} />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
