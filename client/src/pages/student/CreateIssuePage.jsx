import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import IssueForm from "../../components/issue/IssueForm";
import Toast from "../../components/common/Toast";
import { issueService } from "../../services/issueService";

const CreateIssuePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCreateIssue = async (formData) => {
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await issueService.createIssue(formData);

      setSuccessMessage("✅ Issue created successfully!");

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate("/student/my-issues");
      }, 2000);
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Failed to create issue. Please try again.";
      setErrorMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div>
        <div style={{ marginBottom: "30px" }}>
          <h1 style={{ margin: "0 0 10px 0" }}>Report an Issue 📝</h1>
          <p style={{ color: "#666", margin: 0 }}>
            Help us improve by reporting issues you encounter on campus
          </p>
        </div>

        <IssueForm onSubmit={handleCreateIssue} loading={loading} />

        {successMessage && (
          <Toast
            message={successMessage}
            type="success"
            duration={2000}
            onClose={() => setSuccessMessage("")}
          />
        )}

        {errorMessage && (
          <Toast
            message={errorMessage}
            type="error"
            duration={3000}
            onClose={() => setErrorMessage("")}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default CreateIssuePage;
