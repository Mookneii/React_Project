export function safeGet(key, fallback = null) {
  try {
    return localStorage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
}

export function safeSet(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {}
}

export function safeRemove(key) {
  try {
    localStorage.removeItem(key);
  } catch {}
}
