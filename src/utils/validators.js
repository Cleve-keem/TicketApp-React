export function validateTicketData(data) {
  const errors = {};
  const allowed = ["open", "in_progress", "closed"];
  if (!data.title || data.title.trim().length < 3) {
    errors.title = "Title is required (3+ chars).";
  } else if (data.title.length > 120) {
    errors.title = "Title must be 120 chars or less.";
  }
  if (!data.status || !allowed.includes(data.status)) {
    errors.status = "Status must be one of: open, in_progress, closed.";
  }
  if (data.description && data.description.length > 2000) {
    errors.description = "Description is too long.";
  }
  return errors;
}
