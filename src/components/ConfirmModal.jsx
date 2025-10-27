import React from "react";

export default function ConfirmModal({
  open,
  title,
  message,
  onCancel,
  onConfirm,
}) {
  if (!open) return null;
  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
    >
      <div className="modal">
        <h3 id="confirm-title">{title}</h3>
        <p className="helper">{message}</p>
        <div
          style={{
            display: "flex",
            gap: 10,
            justifyContent: "flex-end",
            marginTop: 16,
          }}
        >
          <button className="btn ghost" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn danger" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
