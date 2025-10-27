import { Storage } from "./storageService";

const allowed = ["open", "in_progress", "closed"];

export async function fetchTickets() {
  try {
    return await Storage.fetchTickets();
  } catch (e) {
    throw new Error("Failed to load tickets. Please retry.");
  }
}

export async function createTicket(payload) {
  if (!payload.title) throw new Error("Title is required.");
  if (!allowed.includes(payload.status)) throw new Error("Invalid status.");
  return await Storage.createTicket(payload);
}

export async function updateTicket(id, payload) {
  if (payload.title && payload.title.trim().length === 0)
    throw new Error("Title is required.");
  if (payload.status && !allowed.includes(payload.status))
    throw new Error("Invalid status.");
  return await Storage.updateTicket(id, payload);
}

export async function deleteTicket(id) {
  return await Storage.deleteTicket(id);
}
