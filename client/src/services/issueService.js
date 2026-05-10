import api from "./api";

export const issueService = {
  createIssue: async (formData) => {
    // formData should be FormData object with: title, description, category, image
    const response = await api.post("/issues", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  getIssues: async () => {
    const response = await api.get("/issues");
    return response.data;
  },

  getMyIssues: async () => {
    const response = await api.get("/issues/my");
    return response.data;
  },

  getIssueById: async (issueId) => {
    const response = await api.get(`/issues/${issueId}`);
    return response.data;
  },

  updateIssueStatus: async (issueId, status) => {
    const response = await api.put(`/issues/${issueId}/status`, { status });
    return response.data;
  },
};
