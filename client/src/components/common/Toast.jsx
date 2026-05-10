import { useState, useEffect } from "react";

const Toast = ({ message, type = "success", duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const bgColor = type === "success" ? "#d4edda" : "#f8d7da";
  const textColor = type === "success" ? "#155724" : "#721c24";
  const borderColor = type === "success" ? "#c3e6cb" : "#f5c6cb";

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        background: bgColor,
        color: textColor,
        padding: "15px 20px",
        borderRadius: "5px",
        border: `1px solid ${borderColor}`,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        zIndex: 9999,
        animation: "slideIn 0.3s ease-in-out",
      }}
    >
      {message}
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default Toast;
