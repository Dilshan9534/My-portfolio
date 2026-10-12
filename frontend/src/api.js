// In dev, Vite proxies /api to localhost:5000 (see vite.config.js).
// In production the backend lives on another domain, so set VITE_API_URL
// at build time to its full URL (e.g. https://your-api.onrender.com).
const BASE = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : '/api';

async function handle(res) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

export const api = {
  getProfile: () => fetch(`${BASE}/profile`).then(handle),
  getExperience: () => fetch(`${BASE}/experience`).then(handle),
  getProjects: () => fetch(`${BASE}/projects`).then(handle),
  getSkills: () => fetch(`${BASE}/skills`).then(handle),
  bookAppointment: (payload) =>
    fetch(`${BASE}/appointments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).then(handle),
};
