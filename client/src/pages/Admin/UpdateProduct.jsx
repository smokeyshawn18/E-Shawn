import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [existingPhoto, setExistingPhoto] = useState("");
  const [id, setId] = useState("");

  const API = import.meta.env.VITE_API || "http://localhost:8000";

  // Get auth token dynamically from server
  const getAuthToken = () => {
    const token = localStorage.getItem("auth");
    return token ? JSON.parse(token)?.token : null;
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

  // Get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axiosInstance.get(
        `/api/v1/product/single-product/${params.slug}`
      );
      if (data?.success) {
        const product = data.product;
        setId(product._id); // Set the product ID
        setName(product.name);
        setDescription(product.description);
        setPrice(product.price);
        setCategory(product.category._id);
        setQuantity(product.quantity);
        setShipping(product.shipping ? "1" : "0");
        setExistingPhoto(`${API}/api/v1/product/product-photo/${product._id}`);
      } else {
        toast.error("Failed to fetch product details");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while fetching product details");
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, [params.slug]);

  // Get all categories
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

  // Handle product update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      if (photo) productData.append("photo", photo);
      productData.append("category", category);
      productData.append("shipping", shipping === "1");

      const { data } = await axiosInstance.put(
        `/api/v1/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.success("Product Updated Successfully");

        // Update the existing photo state with the new photo URL
        if (photo) {
          setExistingPhoto(
            `${API}/api/v1/product/product-photo/${id}?timestamp=${Date.now()}`
          );
        }
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message || "Failed to update product");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while updating the product");
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      let ans = window.prompt("Are you sure want to delete?");
      if (!ans) return;
      const { data } = await axiosInstance.delete(
        `/api/v1/product/productdel/${id}`
      );
      toast.success("Product deleted sucessfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Error while deleting Product");
    }
  };

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
                <h5 className="mb-0">Update Product</h5>
              </div>
              <div className="card-body">
                <div className="m-1 w-75">
                  <Select
                    variant={false}
                    placeholder="Select a category"
                    size="large"
                    showSearch
                    className="form-select mb-3"
                    onChange={(value) => setCategory(value)}
                    value={category}
                  >
                    {categories?.map((c) => (
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
                  <div className="mb-3">
                    {photo ? (
                      <div className="text-center">
                        <img
                          src={URL.createObjectURL(photo)}
                          alt="product_photo"
                          height={"200px"}
                          className="img img-responsive"
                        />
                      </div>
                    ) : (
                      <div className="text-center">
                        <img
                          src={existingPhoto}
                          alt="product_photo"
                          height={"200px"}
                          className="img img-responsive"
                        />
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      value={name}
                      placeholder="Write a name"
                      className="form-control"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <textarea
                      type="text"
                      value={description}
                      placeholder="Write a description"
                      className="form-control"
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="number"
                      value={price}
                      placeholder="Write a Price"
                      className="form-control"
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="number"
                      value={quantity}
                      placeholder="Write a quantity"
                      className="form-control"
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <Select
                      bordered={false}
                      placeholder="Select Shipping"
                      size="large"
                      showSearch
                      className="form-select mb-3"
                      onChange={(value) => setShipping(value)}
                      value={shipping}
                    >
                      <Option value="0">No</Option>
                      <Option value="1">Yes</Option>
                    </Select>
                  </div>
                  <div className="mb-3">
                    <button className="btn btn-primary" onClick={handleUpdate}>
                      Update Product
                    </button>
                    <button
                      className="btn btn-danger m-3"
                      onClick={handleDelete}
                    >
                      Delete Product
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
