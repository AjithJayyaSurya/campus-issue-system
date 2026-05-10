const InputField = ({ label, type = "text", name, value, onChange, placeholder, error }) => {
  return (
    <div style={{ marginBottom: "15px" }}>
      <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "10px",
          border: error ? "2px solid red" : "1px solid #ccc",
          borderRadius: "5px",
          fontSize: "14px",
          boxSizing: "border-box",
        }}
      />
      {error && <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>{error}</p>}
    </div>
  );
};

export default InputField;
