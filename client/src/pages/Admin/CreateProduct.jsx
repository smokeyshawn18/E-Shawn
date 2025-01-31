import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState(null);
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");

  const API = import.meta.env.VITE_API || "http://localhost:8000";
  const axiosInstance = axios.create({ baseURL: API });

  const getAuthToken = () => {
    const token = localStorage.getItem("auth");
    return token ? JSON.parse(token)?.token : null;
  };

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

  useEffect(() => {
    const getAllCategories = async () => {
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
    getAllCategories();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!name || !description || !price || !quantity || !category || !photo) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("shipping", shipping === "1");
      productData.append("category", category);

      const { data } = await axiosInstance.post(
        "/api/v1/product/create-product",
        productData
      );

      if (data?.success) {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.error("Error creating product:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        toast.error(error.response.data?.message || "Server error occurred");
      } else if (error.request) {
        console.error("No response received:", error.request);
        toast.error("No response from server");
      } else {
        console.error("Error setting up request:", error.message);
        toast.error("Error in request setup");
      }
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
            <div className="card shadow-sm border-0">
              <div className="card-header bg-light">
                <h5 className="mb-0">Create Product</h5>
                <div className="m-1 w-75">
                  <form onSubmit={handleCreate}>
                    <Select
                      placeholder="Select a category"
                      size="large"
                      showSearch
                      className="form-select mb-3"
                      onChange={(value) => setCategory(value)}
                    >
                      {categories.map((c) => (
                        <Option key={c._id} value={c._id}>
                          {c.name}
                        </Option>
                      ))}
                    </Select>

                    <div className="mb-3">
                      <label className="btn btn-outline-secondary">
                        {photo ? photo.name : "Upload Photo"}
                        <input
                          type="file"
                          name="photo"
                          accept="image/*"
                          onChange={(e) => setPhoto(e.target.files[0])}
                          hidden
                        />
                      </label>
                    </div>

                    {photo && (
                      <div className="text-center mb-3">
                        <img
                          src={URL.createObjectURL(photo)}
                          height="150px"
                          className="img img-responsive"
                          alt="product preview"
                        />
                      </div>
                    )}

                    <input
                      type="text"
                      value={name}
                      placeholder="Write a name"
                      className="form-control mb-3"
                      onChange={(e) => setName(e.target.value)}
                    />

                    <textarea
                      value={description}
                      placeholder="Write a description"
                      className="form-control mb-3"
                      onChange={(e) => setDescription(e.target.value)}
                    />

                    <input
                      type="number"
                      value={price}
                      placeholder="Write a price"
                      className="form-control mb-3"
                      onChange={(e) => setPrice(e.target.value)}
                    />

                    <input
                      type="number"
                      value={quantity}
                      placeholder="Write a quantity"
                      className="form-control mb-3"
                      onChange={(e) => setQuantity(e.target.value)}
                    />

                    <Select
                      placeholder="Select Shipping"
                      size="large"
                      showSearch
                      className="form-select mb-3"
                      onChange={(value) => setShipping(value)}
                    >
                      <Option value="0">No</Option>
                      <Option value="1">Yes</Option>
                    </Select>

                    <button type="submit" className="btn btn-primary">
                      Create Product
                    </button>
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

export default CreateProduct;
