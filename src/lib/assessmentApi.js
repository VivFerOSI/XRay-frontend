// Cliente del módulo de autoevaluación. La URL base se toma de VITE_API_URL
// (ver .env.example); por defecto apunta al backend local.
const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api'

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) {
    let detail
    try {
      detail = (await res.json())?.message
    } catch {
      detail = res.statusText
    }
    const message = Array.isArray(detail) ? detail.join(', ') : detail
    throw new Error(message || 'Error de comunicación con el servidor')
  }
  return res.json()
}

export const assessmentApi = {
  bootstrap: () => request('/assessment/bootstrap'),
  register: (payload) =>
    request('/assessment/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  submit: (assessmentId, answers) =>
    request(`/assessment/${assessmentId}/submit`, {
      method: 'POST',
      body: JSON.stringify({ answers }),
    }),
  result: (assessmentId) => request(`/assessment/${assessmentId}/result`),
}
