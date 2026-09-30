// Thin localStorage wrapper. Falls back to memory if storage is blocked (private mode, etc.)
const memory = {};

export const store = {
  get(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return memory[key] ?? fallback;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      memory[key] = value;
    }
  },
};
