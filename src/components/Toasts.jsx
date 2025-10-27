import React, { useEffect, useState } from "react";

function showToast(type, text, id) {
  const ev = new CustomEvent("ticketapp:toast", { detail: { type, text, id } });
  window.dispatchEvent(ev);
}
export const toast = {
  success: (text) => showToast("success", text),
  error: (text) => showToast("error", text),
  info: (text) => showToast("info", text),
};

export default function Toasts() {
  const [toasts, setToasts] = useState([]);
  useEffect(() => {
    function listener(e) {
      const t = { id: Date.now() + Math.random(), ...e.detail };
      setToasts((prev) => [t, ...prev]);
      setTimeout(
        () => setToasts((prev) => prev.filter((x) => x.id !== t.id)),
        4200
      );
    }
    window.addEventListener("ticketapp:toast", listener);
    return () => window.removeEventListener("ticketapp:toast", listener);
  }, []);
  return (
    <div className="toasts" aria-live="polite" aria-atomic="true">
      {toasts.map((t) => (
        <div key={t.id} className={`toast ${t.type}`} role="status">
          <div>{t.text}</div>
        </div>
      ))}
    </div>
  );
}
