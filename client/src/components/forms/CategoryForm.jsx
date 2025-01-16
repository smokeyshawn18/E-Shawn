import React from "react";
// In CategoryForm.jsx
const CategoryForm = ({ handleSubmit, value, setValue, loading }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter category name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={loading}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? "Creating..." : "Create Category"}
      </button>
    </form>
  );
};

export default CategoryForm;
