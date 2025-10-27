import React, { useEffect, useState } from "react";
import { fetchTickets } from "../services/ticketService";
import { toast } from "../components/Toasts";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [tickets, setTickets] = useState([]);

  async function load() {
    setLoading(true);
    try {
      const t = await fetchTickets();
      setTickets(t);
    } catch (e) {
      toast.error(e.message || "Failed to load tickets. Please retry.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const total = tickets.length;
  const open = tickets.filter((t) => t.status === "open").length;
  const closed = tickets.filter((t) => t.status === "closed").length;
  const inProgress = tickets.filter((t) => t.status === "in_progress").length;

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="card-grid">
        <div className="card">
          <div className="stat-title">Total tickets</div>
          <div className="stat-value">{total}</div>
        </div>
        <div className="card">
          <div className="stat-title">Open tickets</div>
          <div className="stat-value">{open}</div>
        </div>
        <div className="card">
          <div className="stat-title">In progress</div>
          <div className="stat-value">{inProgress}</div>
        </div>
        <div className="card">
          <div className="stat-title">Resolved / closed</div>
          <div className="stat-value">{closed}</div>
        </div>
      </div>

      <div style={{ marginTop: 20 }} className="card">
        <h3 style={{ marginTop: 0 }}>Quick actions</h3>
        <div style={{ display: "flex", gap: 10 }}>
          <Link to="/tickets" className="btn primary">
            Manage tickets
          </Link>
          <a href="/" className="btn ghost">
            Go Home
          </a>
        </div>
      </div>
    </div>
  );
}
