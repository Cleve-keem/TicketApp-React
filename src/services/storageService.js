const SESSION_KEY = "ticketapp_session";
const TICKETS_KEY = "ticketapp_tickets";
const USERS_KEY = "ticketapp_users";

function _nowIso() {
  return new Date().toISOString();
}
function _randomId(prefix = "id") {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}

export function seedInitialData() {
  if (!localStorage.getItem(USERS_KEY)) {
    const demo = {
      id: "user_demo",
      username: "demo",
      password: "demo123",
      name: "Demo User",
    };
    localStorage.setItem(USERS_KEY, JSON.stringify([demo]));
  }
  if (!localStorage.getItem(TICKETS_KEY)) {
    const seed = [
      {
        id: _randomId("t"),
        title: "Can't login to account",
        description: "I get a 401 when I try to login",
        status: "open",
        priority: "high",
        created_at: _nowIso(),
        updated_at: _nowIso(),
        owner: "demo",
      },
      {
        id: _randomId("t"),
        title: "Feature request: dark mode",
        description: "Please add dark theme support",
        status: "in_progress",
        priority: "low",
        created_at: _nowIso(),
        updated_at: _nowIso(),
        owner: "demo",
      },
      {
        id: _randomId("t"),
        title: "Typo on landing page",
        description: "Small typo in hero subtitle",
        status: "closed",
        priority: "low",
        created_at: _nowIso(),
        updated_at: _nowIso(),
        owner: "demo",
      },
    ];
    localStorage.setItem(TICKETS_KEY, JSON.stringify(seed));
  }
}

/* simple simulated latency helper */
function simulateLatency(resp, ms = 300) {
  return new Promise((res) => setTimeout(() => res(resp), ms));
}

export const Storage = {
  SESSION_KEY,
  TICKETS_KEY,
  USERS_KEY,
  getSession() {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (!raw) return null;
      const obj = JSON.parse(raw);
      if (obj.expiresAt && Date.now() > obj.expiresAt) {
        localStorage.removeItem(SESSION_KEY);
        return null;
      }
      return obj;
    } catch {
      return null;
    }
  },
  setSession(payload) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(payload));
  },
  clearSession() {
    localStorage.removeItem(SESSION_KEY);
  },
  getUsers() {
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    } catch {
      return [];
    }
  },
  addUser(user) {
    const users = Storage.getUsers();
    users.push(user);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return user;
  },
  getTickets() {
    try {
      return JSON.parse(localStorage.getItem(TICKETS_KEY) || "[]");
    } catch {
      return [];
    }
  },
  setTickets(tickets) {
    localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));
  },
  async fetchTickets() {
    return simulateLatency(
      JSON.parse(localStorage.getItem(TICKETS_KEY) || "[]")
    );
  },
  async createTicket(data) {
    const tickets = Storage.getTickets();
    const t = {
      ...data,
      id: _randomId("t"),
      created_at: _nowIso(),
      updated_at: _nowIso(),
    };
    tickets.unshift(t);
    Storage.setTickets(tickets);
    return simulateLatency(t);
  },
  async updateTicket(id, data) {
    let tickets = Storage.getTickets();
    const idx = tickets.findIndex((t) => t.id === id);
    if (idx === -1) throw new Error("Ticket not found");
    tickets[idx] = { ...tickets[idx], ...data, updated_at: _nowIso() };
    Storage.setTickets(tickets);
    return simulateLatency(tickets[idx]);
  },
  async deleteTicket(id) {
    let tickets = Storage.getTickets();
    tickets = tickets.filter((t) => t.id !== id);
    Storage.setTickets(tickets);
    return simulateLatency({ success: true });
  },
  async findUserByCredentials(username, password) {
    const users = Storage.getUsers();
    const found = users.find(
      (u) => u.username === username && u.password === password
    );
    return simulateLatency(found || null);
  },
};
