import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { toast } from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/forms/CategoryForm";
import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setupdatedName] = useState("");

  const API = import.meta.env.VITE_API || "http://localhost:8000";

  // Get auth token dynamically from server
  const getAuthToken = () => {
    const token = localStorage.getItem("auth");

    return token ? JSON.parse(token)?.token : null; // Ensure this is the correct path to the token
  };

  // Axios instance with token interceptor
  const axiosInstance = axios.create({
    baseURL: API,
  });

  axiosInstance.interceptors.request.use(
    async (config) => {
      const token = await getAuthToken();
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axiosInstance.post(
        "/api/v1/category/create-category",
        { name }
      );

      if (response.data?.success) {
        toast.success(`${name} created successfully!`);
        setName(""); // Clear the input
        await getallcategory(); // Fetch updated categories
      } else {
        toast.error(response.data?.message || "Failed to create category!");
      }
    } catch (error) {
      console.error("Error creating category:", error);
      toast.error(error.response?.data?.message || "Error creating category!");
    } finally {
      setLoading(false);
    }
  };

  const getallcategory = async () => {
    try {
      const { data } = await axiosInstance.get(
        "/api/v1/category/get-categories"
      );

      if (data?.success) {
        setCategories(data.categories);
      } else {
        toast.error(data?.message || "Failed to fetch categories");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Something went wrong while getting categories");
    }
  };

  useEffect(() => {
    getallcategory();
  }, []);

  const handleUpdatedSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosInstance.put(
        `/api/v1/category/update-category/${selected._id}`,
        { name: updatedName } // Send name in the request body
      );
      if (data.success) {
        toast.success(data.message);
        setSelected(null);
        setupdatedName("");
        setVisible(false);
        getallcategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Error while updating category"
      );
    }
  };

  const handleDelete = async (pID) => {
    try {
      const { data } = await axiosInstance.delete(
        `/api/v1/category/delete-category/${pID}`
      );
      if (data.success) {
        toast.success(data.message);
        getallcategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Error while deleting category"
      );
    }
  };

  return (
    <Layout>
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h5 className="mb-4">Manage Categories</h5>

            <div className="card mb-4">
              <div className="card-body">
                <CategoryForm
                  handleSubmit={handleSubmit}
                  value={name}
                  setValue={setName}
                  loading={loading}
                />
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                {loading ? (
                  <div className="text-center py-3">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead className="table-light">
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Category Name</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {categories?.length > 0 ? (
                          categories.map((category, index) => (
                            <tr key={category._id}>
                              <td>{index + 1}</td>
                              <td>{category.name}</td>
                              <td className="text-center">
                                <button
                                  className="btn btn-primary btn-sm ms-3"
                                  onClick={() => {
                                    setVisible(true);
                                    setupdatedName(category.name);
                                    setSelected(category);
                                  }}
                                >
                                  Edit
                                </button>
                                <button
                                  className="btn btn-danger btn-sm ms-3"
                                  onClick={() => {
                                    handleDelete(category._id);
                                  }}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="3" className="text-center">
                              No categories available
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
            <Modal
              onCancel={() => {
                setVisible(false);
              }}
              footer={null}
              open={visible}
            >
              <CategoryForm
                value={updatedName}
                setValue={setupdatedName}
                handleSubmit={handleUpdatedSubmit}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
