import api from "./api";

export const adminService = {
  assignIssue: async (issueId, staffId) => {
    const response = await api.post("/admin/assign", { issueId, staffId });
    return response.data;
  },

  getAssignedIssues: async () => {
    const response = await api.get("/admin/assigned");
    return response.data;
  },

  getAllStaff: async () => {
    const response = await api.get("/admin/staff");
    return response.data;
  },
};
