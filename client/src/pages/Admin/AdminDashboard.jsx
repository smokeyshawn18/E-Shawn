import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/Auth";

const AdminDashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout>
      <div className="container-fluid bg-light py-4">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3">
            <div className="bg-white shadow-sm rounded p-3">
              <AdminMenu />
            </div>
          </div>

          {/* Main Content */}
          <div className="col-md-9">
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-primary text-white text-center">
                <h2>Admin Dashboard</h2>
              </div>
              <div className="card-body">
                <h4 className="mb-3">
                  <strong>Admin Name:</strong> {auth?.user?.name}
                </h4>
                <p className="mb-2">
                  <strong>Email: </strong> {auth?.user?.email}
                </p>
                <p>
                  <strong>Phone: </strong> {auth?.user?.phone}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
