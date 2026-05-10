const FilterBar = ({ filters, onFilterChange, onSearch }) => {
  return (
    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "8px",
        marginBottom: "20px",
        display: "flex",
        gap: "15px",
        flexWrap: "wrap",
        alignItems: "center",
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
      }}
    >
      <div style={{ flex: 1, minWidth: "250px" }}>
        <input
          type="text"
          placeholder="🔍 Search issues by title..."
          value={filters.searchTerm}
          onChange={(e) => onSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 15px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            fontSize: "14px",
            boxSizing: "border-box",
          }}
        />
      </div>

      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <label style={{ fontSize: "14px", fontWeight: "500", color: "#333" }}>Filter by status:</label>
        <select
          value={filters.status}
          onChange={(e) => onFilterChange("status", e.target.value)}
          style={{
            padding: "10px 15px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            fontSize: "14px",
            backgroundColor: "white",
            cursor: "pointer",
          }}
        >
          <option value="">All Statuses</option>
          <option value="pending">⏳ Pending</option>
          <option value="assigned">👤 Assigned</option>
          <option value="resolved">✅ Resolved</option>
        </select>
      </div>

      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <label style={{ fontSize: "14px", fontWeight: "500", color: "#333" }}>Filter by category:</label>
        <select
          value={filters.category}
          onChange={(e) => onFilterChange("category", e.target.value)}
          style={{
            padding: "10px 15px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            fontSize: "14px",
            backgroundColor: "white",
            cursor: "pointer",
          }}
        >
          <option value="">All Categories</option>
          <option value="infrastructure">🏗️ Infrastructure</option>
          <option value="academic">📚 Academic</option>
          <option value="facilities">🏢 Facilities</option>
          <option value="other">📌 Other</option>
        </select>
      </div>

      {(filters.searchTerm || filters.status || filters.category) && (
        <button
          onClick={() => onFilterChange("reset", true)}
          style={{
            padding: "10px 15px",
            background: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500",
          }}
        >
          Clear Filters
        </button>
      )}
    </div>
  );
};

export default FilterBar;
