import api from "./api";

export const commentService = {
  getComments: async (issueId) => {
    const response = await api.get(`/comments/${issueId}`);
    return response.data;
  },

  addComment: async (issueId, message) => {
    const response = await api.post("/comments", { issueId, message });
    return response.data;
  },
};
