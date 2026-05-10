import { useState } from "react";
import InputField from "../common/InputField";

const IssueForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});

  const categories = ["infrastructure", "academic", "facilities", "other"];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (formData.title.trim().length < 5) newErrors.title = "Title must be at least 5 characters";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (formData.description.trim().length < 10)
      newErrors.description = "Description must be at least 10 characters";
    if (!formData.category) newErrors.category = "Category is required";
    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, image: "Image size must be less than 5MB" });
        return;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        setErrors({ ...errors, image: "File must be an image" });
        return;
      }

      setImage(file);
      setErrors({ ...errors, image: "" });

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Create FormData for multipart/form-data
    const submitFormData = new FormData();
    submitFormData.append("title", formData.title);
    submitFormData.append("description", formData.description);
    submitFormData.append("category", formData.category);
    if (image) {
      submitFormData.append("image", image);
    }

    onSubmit(submitFormData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: "white",
        padding: "30px",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        maxWidth: "600px",
      }}
    >
      <h2 style={{ marginTop: 0, marginBottom: "30px", color: "#333" }}>Create New Issue</h2>

      <InputField
        label="Title"
        type="text"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        placeholder="e.g., Broken water tap in lab 3"
        error={errors.title}
      />

      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Describe the issue in detail..."
          style={{
            width: "100%",
            padding: "10px",
            border: errors.description ? "2px solid red" : "1px solid #ccc",
            borderRadius: "5px",
            fontSize: "14px",
            boxSizing: "border-box",
            minHeight: "120px",
            fontFamily: "inherit",
            resize: "vertical",
          }}
        />
        {errors.description && (
          <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>{errors.description}</p>
        )}
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>
          Category
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          style={{
            width: "100%",
            padding: "10px",
            border: errors.category ? "2px solid red" : "1px solid #ccc",
            borderRadius: "5px",
            fontSize: "14px",
            boxSizing: "border-box",
          }}
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
        {errors.category && (
          <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>{errors.category}</p>
        )}
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>
          Upload Image (Optional)
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{
            padding: "8px",
            border: errors.image ? "2px solid red" : "1px solid #ccc",
            borderRadius: "5px",
            fontSize: "14px",
            width: "100%",
            boxSizing: "border-box",
          }}
        />
        <p style={{ fontSize: "12px", color: "#666", margin: "5px 0 0 0" }}>
          Max file size: 5MB. Supported formats: JPG, PNG, GIF
        </p>
        {errors.image && (
          <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>{errors.image}</p>
        )}
      </div>

      {imagePreview && (
        <div style={{ marginBottom: "15px" }}>
          <p style={{ fontSize: "14px", fontWeight: "500", marginBottom: "10px" }}>Image Preview:</p>
          <img
            src={imagePreview}
            alt="Preview"
            style={{
              maxWidth: "100%",
              maxHeight: "300px",
              borderRadius: "5px",
              border: "1px solid #ddd",
            }}
          />
          <button
            type="button"
            onClick={() => {
              setImage(null);
              setImagePreview(null);
            }}
            style={{
              marginTop: "10px",
              padding: "6px 12px",
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "12px",
            }}
          >
            Remove Image
          </button>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        style={{
          width: "100%",
          padding: "12px",
          backgroundColor: loading ? "#ccc" : "#28a745",
          color: "white",
          border: "none",
          borderRadius: "5px",
          fontSize: "16px",
          fontWeight: "600",
          cursor: loading ? "not-allowed" : "pointer",
          marginTop: "20px",
        }}
      >
        {loading ? "Creating Issue..." : "Create Issue"}
      </button>
    </form>
  );
};

export default IssueForm;
