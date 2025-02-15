import { useEffect, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaCheckCircle,
  FaTimesCircle,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../context/Auth";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [auth, setAuth] = useAuth(
    () => JSON.parse(localStorage.getItem("auth")) || {}
  );
  const API = import.meta.env.VITE_API || "http://localhost:8000";

  const getAllUsers = async () => {
    try {
      const token = auth?.token;
      if (!token) {
        console.error("Token not found");
        return;
      }

      const { data } = await axios.get(`${API}/api/v1/auth/all-user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(data);
      toast.success("Users fetched successfully");
    } catch (error) {
      console.log(error);
      toast.error("Error while getting users");
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

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
              <div className="card-header bg-primary text-white d-flex align-items-center">
                <FaUser className="me-2" />
                <h5 className="mb-0">All Users</h5>
              </div>
              <div className="card-body">
                {users.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-hover table-striped border">
                      <thead className="table-dark">
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Role</th>

                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user, i) => (
                          <tr key={user._id}>
                            <td>{i + 1}</td>
                            <td>
                              <FaUser className="text-primary me-2" />
                              {user.name}
                            </td>
                            <td>
                              <FaEnvelope className="text-success me-2" />
                              {user.email}
                            </td>
                            <td>{user.role || "User"}</td>

                            <td>
                              <button className="btn btn-sm btn-warning me-2">
                                <FaEdit /> Edit
                              </button>
                              <button className="btn btn-sm btn-danger">
                                <FaTrash /> Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="alert alert-warning text-center">
                    No users found!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
