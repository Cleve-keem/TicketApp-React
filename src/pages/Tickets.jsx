import { useEffect, useState } from "react";
import {
  fetchTickets,
  createTicket,
  updateTicket,
  deleteTicket,
} from "../services/ticketService";
import { validateTicketData } from "../utils/validators";
import { toast } from "../components/Toasts";
import ConfirmModal from "../components/ConfirmModal";

const STATUS_OPTIONS = [
  { value: "open", label: "Open" },
  { value: "in_progress", label: "In progress" },
  { value: "closed", label: "Closed" },
];

export default function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    status: "open",
    priority: "medium",
  });
  const [errors, setErrors] = useState({});
  const [deleting, setDeleting] = useState({ open: false, id: null });

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

  function openCreate() {
    setErrors({});
    setFormState({
      title: "",
      description: "",
      status: "open",
      priority: "medium",
    });
    setEditing(null);
    setFormOpen(true);
  }

  function openEdit(ticket) {
    setErrors({});
    setFormState({
      title: ticket.title,
      description: ticket.description || "",
      status: ticket.status,
      priority: ticket.priority || "medium",
    });
    setEditing(ticket);
    setFormOpen(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validateTicketData(formState);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    try {
      if (editing) {
        await updateTicket(editing.id, formState);
        toast.success("Ticket updated");
      } else {
        await createTicket(formState);
        toast.success("Ticket created");
      }
      setFormOpen(false);
      load();
    } catch (err) {
      toast.error(err.message || "Failed to save ticket.");
    }
  }

  async function confirmDelete() {
    try {
      await deleteTicket(deleting.id);
      toast.success("Ticket deleted");
      setDeleting({ open: false, id: null });
      load();
    } catch (e) {
      toast.error("Failed to delete ticket.");
    }
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <h1>Tickets</h1>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn primary" onClick={openCreate}>
            Create ticket
          </button>
        </div>
      </div>

      <div style={{ marginTop: 12 }} className="card">
        <h3 style={{ marginTop: 0 }}>All tickets</h3>
        {loading ? (
          <p className="helper">Loading...</p>
        ) : (
          <>
            {tickets.length === 0 ? (
              <p className="helper">
                No tickets yet. Create one to get started.
              </p>
            ) : (
              <div style={{ display: "grid", gap: 12 }}>
                {tickets.map((t) => (
                  <article
                    className="ticket-card"
                    key={t.id}
                    aria-labelledby={`t-${t.id}`}
                  >
                    <div className="ticket-row">
                      <div>
                        <h4 id={`t-${t.id}`} className="ticket-title">
                          {t.title}
                        </h4>
                        <p className="ticket-desc">{t.description}</p>
                        <div style={{ marginTop: 8 }}>
                          <span
                            className={`tag ${t.status}`}
                            aria-label={`status ${t.status}`}
                          >
                            {t.status.replace("_", " ")}
                          </span>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 8,
                          alignItems: "flex-end",
                        }}
                      >
                        <div className="helper">
                          {new Date(t.created_at).toLocaleString()}
                        </div>
                        <div style={{ display: "flex", gap: 8 }}>
                          <button
                            onClick={() => openEdit(t)}
                            className="btn ghost"
                            aria-label="Edit ticket"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() =>
                              setDeleting({ open: true, id: t.id })
                            }
                            className="btn danger"
                            aria-label="Delete ticket"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {formOpen && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="ticket-form-title"
        >
          <div className="modal">
            <h3 id="ticket-form-title">
              {editing ? "Edit ticket" : "Create ticket"}
            </h3>
            <form onSubmit={handleSubmit} className="form" noValidate>
              <div className="field">
                <label htmlFor="title">Title *</label>
                <input
                  id="title"
                  value={formState.title}
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, title: e.target.value }))
                  }
                />
                {errors.title && (
                  <p role="alert" style={{ color: "var(--error)" }}>
                    {errors.title}
                  </p>
                )}
              </div>

              <div className="field">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  rows="4"
                  value={formState.description}
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, description: e.target.value }))
                  }
                ></textarea>
                {errors.description && (
                  <p role="alert" style={{ color: "var(--error)" }}>
                    {errors.description}
                  </p>
                )}
              </div>

              <div className="field">
                <label htmlFor="status">Status *</label>
                <select
                  id="status"
                  value={formState.status}
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, status: e.target.value }))
                  }
                >
                  {STATUS_OPTIONS.map((o) => (
                    <option value={o.value} key={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
                {errors.status && (
                  <p role="alert" style={{ color: "var(--error)" }}>
                    {errors.status}
                  </p>
                )}
              </div>

              <div className="field">
                <label htmlFor="priority">Priority</label>
                <select
                  id="priority"
                  value={formState.priority}
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, priority: e.target.value }))
                  }
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div
                style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}
              >
                <button
                  type="button"
                  className="btn ghost"
                  onClick={() => setFormOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn primary">
                  {editing ? "Save changes" : "Create ticket"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal
        open={deleting.open}
        title="Delete ticket?"
        message="Are you sure you want to delete this ticket? This action cannot be undone."
        onCancel={() => setDeleting({ open: false, id: null })}
        onConfirm={() => confirmDelete()}
      />
    </div>
  );
}
