import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";

const CreateCategory = () => {
  return (
    <Layout>
      <div className="container-fluid py-4">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3">
            <div className="card shadow-sm border-0">
              <div className="card-body p-3">
                <AdminMenu />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-md-9">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-light">
                <h5 className="mb-0">All Categories</h5>
              </div>
              <div className="card-body">
                <p className="text-muted mb-0">Manage your categories here.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
