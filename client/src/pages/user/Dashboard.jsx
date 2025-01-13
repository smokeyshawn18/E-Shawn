import React from "react";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/Auth";
import { NavLink } from "react-router-dom";
import UserMenu from "../../components/Layout/UserMenu";

// Import Lucide icons
import { User, Mail, Phone, Settings } from "lucide-react";

const Dashboard = () => {
  const [auth] = useAuth();

  if (!auth.user) {
    return <NavLink to="/login" />;
  }

  return (
    <Layout title="Dashboard - E-Shawn" description="User Dashboard">
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3">
            <UserMenu />
          </div>

          {/* Dashboard Info */}
          <div className="col-md-9">
            <div className="card shadow-lg rounded-lg p-4 bg-light">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="text-dark fw-bold">User Dashboard</h3>
                <NavLink to="/dashboard/user/profile">
                  <Settings size={24} className="text-muted" />
                </NavLink>
              </div>

              {/* User Info Cards */}
              <div className="row">
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

              {/* Logout Button */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
