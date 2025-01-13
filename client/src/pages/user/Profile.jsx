import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";

const Profile = () => {
  return (
    <Layout>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          {/* Sidebar - User Menu */}
          <div className="col-12 col-md-3 mb-4 mb-md-0">
            <UserMenu />
          </div>

          {/* Profile Content */}
          <div className="col-12 col-md-9">
            <h1 className="mb-4">Your Profile</h1>

            {/* Profile Box */}
            <div
              className="card shadow-sm p-4 mb-4"
              style={{ overflowX: "auto" }}
            >
              <h5 className="card-title">Name</h5>
              <p>John Doe</p>

              <h5 className="card-title">Email</h5>
              <p>johndoe@example.com</p>

              <h5 className="card-title">Phone</h5>
              <p>+1234567890</p>

              <h5 className="card-title">Address</h5>
              <p>123 Main Street, City, Country</p>
            </div>

            {/* Add other profile details or forms here */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
