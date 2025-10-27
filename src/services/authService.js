import { Storage } from "./storageService";

const SESSION_KEY = Storage.SESSION_KEY;

export function getSession() {
  return Storage.getSession();
}

export async function login({ username, password }) {
  // finds user in seeded localStorage users
  const user = await Storage.findUserByCredentials(username, password);
  if (!user) {
    const err = new Error("Invalid credentials");
    err.code = 401;
    throw err;
  }
  const session = {
    token: `fake-token-${Math.random().toString(36).slice(2, 9)}`,
    user: { username: user.username, name: user.name, id: user.id },
    expiresAt: Date.now() + 1000 * 60 * 60 * 24, // 24 hours
  };
  Storage.setSession(session);
  return session;
}

export async function signup({ username, password, name }) {
  const users = Storage.getUsers();
  if (users.find((u) => u.username === username)) {
    const err = new Error("User already exists");
    err.code = 409;
    throw err;
  }
  const newUser = {
    id: `user_${Math.random().toString(36).slice(2, 9)}`,
    username,
    password,
    name,
  };
  Storage.addUser(newUser);
  // auto-login after signup
  return login({ username, password });
}

export function logout() {
  Storage.clearSession();
}
