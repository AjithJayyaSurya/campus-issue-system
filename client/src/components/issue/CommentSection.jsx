import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { commentService } from "../../services/commentService";
import CommentItem from "./CommentItem";

const CommentSection = ({ issueId }) => {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const data = await commentService.getComments(issueId);
        setComments(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load comments");
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [issueId]);

  const handleSubmitComment = async () => {
    if (!newComment.trim()) {
      setError("Comment cannot be empty");
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      const comment = await commentService.addComment(issueId, newComment.trim());
      setComments([...comments, comment]);
      setNewComment("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add comment");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2 style={{ margin: "0 0 20px 0", color: "#333", fontSize: "20px" }}>
        Comments ({comments.length})
      </h2>

      {/* Add Comment Form */}
      <div style={{ marginBottom: "30px" }}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          style={{
            width: "100%",
            padding: "12px",
            border: "1px solid #ddd",
            borderRadius: "6px",
            fontSize: "14px",
            fontFamily: "inherit",
            resize: "vertical",
            minHeight: "80px",
            boxSizing: "border-box",
          }}
        />
        <button
          onClick={handleSubmitComment}
          disabled={submitting || !newComment.trim()}
          style={{
            marginTop: "10px",
            padding: "10px 20px",
            background: submitting ? "#ccc" : "#2196f3",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontSize: "14px",
            fontWeight: "600",
            cursor: submitting ? "not-allowed" : "pointer",
            transition: "background 0.2s",
          }}
        >
          {submitting ? "Posting..." : "Post Comment"}
        </button>
        {error && (
          <p
            style={{
              marginTop: "10px",
              color: "#d32f2f",
              fontSize: "14px",
            }}
          >
            {error}
          </p>
        )}
      </div>

      {/* Comments List */}
      <div>
        {loading ? (
          <p style={{ color: "#999", textAlign: "center" }}>Loading comments...</p>
        ) : comments.length === 0 ? (
          <p style={{ color: "#999", textAlign: "center" }}>No comments yet. Be the first to comment!</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            {comments.map((comment) => (
              <CommentItem key={comment._id} comment={comment} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
