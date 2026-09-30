import { createContext, useContext, useState } from 'react';
import { store } from '../services/storage';
import { sleep } from '../utils/sleep';

const AuthContext = createContext(null);

// DEMO ONLY: accounts live in this browser's localStorage and passwords are stored as plain text.
// Swap signup() and login() for real API calls before using this for anything serious.
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => store.get('user', null));

  const startSession = (nextUser) => {
    store.set('user', nextUser);
    setUser(nextUser);
  };

  // Both functions resolve to { user } on success or { error } on failure
  const signup = async ({ name, email, password }) => {
    await sleep(800); // fake network delay
    const users = store.get('users', []);
    const cleanEmail = email.trim().toLowerCase();

    if (users.some((u) => u.email === cleanEmail)) {
      return { error: 'An account with this email already exists' };
    }

    const newUser = { name: name.trim(), email: cleanEmail };
    store.set('users', [...users, { ...newUser, password }]);
    startSession(newUser);
    return { user: newUser };
  };

  const login = async ({ email, password }) => {
    await sleep(800);
    const cleanEmail = email.trim().toLowerCase();
    const match = store.get('users', []).find((u) => u.email === cleanEmail && u.password === password);

    if (!match) return { error: 'Invalid email or password' };

    const loggedIn = { name: match.name, email: match.email };
    startSession(loggedIn);
    return { user: loggedIn };
  };

  const logout = () => {
    store.set('user', null);
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, signup, login, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
