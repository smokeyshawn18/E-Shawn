import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/Auth";

// Import Lucide icons
import { User, Mail, Phone, Home } from "lucide-react";

const Profile = () => {
  const [auth] = useAuth();
  return (
    <Layout title="Profile - E-Shawn" description="User Profile">
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar - User Menu */}
          <div className="col-md-3">
            <UserMenu />
          </div>

          {/* Profile Content */}
          <div className="col-md-9">
            <div className="card shadow-lg rounded-lg p-4 bg-light">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="text-dark fw-bold">Your Profile</h3>
                <NavLink to="/profile/edit">
                  <span className="text-muted">Edit Profile</span>
                </NavLink>
              </div>

              {/* Profile Info Cards */}
              <div className="row">
                {/* Name Card */}
                <div className="col-md-4">
                  <div className="card shadow-sm rounded p-3 mb-3 bg-white">
                    <div className="d-flex align-items-center">
                      <User className="text-primary" size={32} />
                      <div className="ms-3">
                        <h5 className="fw-bold">Name</h5>
                        <p>{auth?.user?.name}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Email Card */}
                <div className="col-md-4">
                  <div className="card shadow-sm rounded p-3 mb-3 bg-white">
                    <div className="d-flex align-items-center">
                      <Mail className="text-success" size={32} />
                      <div className="ms-3">
                        <h5 className="fw-bold">Email</h5>
                        <p>{auth?.user?.email}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phone Card */}
                <div className="col-md-4">
                  <div className="card shadow-sm rounded p-3 mb-3 bg-white">
                    <div className="d-flex align-items-center">
                      <Phone className="text-warning" size={32} />
                      <div className="ms-3">
                        <h5 className="fw-bold">Phone</h5>
                        <p>{auth?.user?.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Address Card */}
              <div className="row">
                <div className="col-md-12">
                  <div className="card shadow-sm rounded p-3 mb-3 bg-white">
                    <div className="d-flex align-items-center">
                      <Home className="text-info" size={32} />
                      <div className="ms-3">
                        <h5 className="fw-bold">Address</h5>
                        <p>{auth?.user?.address}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Add other profile details or forms here */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
