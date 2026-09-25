// Cliente del Stress Test (Fase 2). La URL base se toma de VITE_API_URL.
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

export const stressTestApi = {
  content: () => request('/stress-test/content'),
  submit: (payload) =>
    request('/stress-test/submit', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  // Informe ya enviado, para el enlace permanente que va en el correo.
  submission: (id) => request(`/stress-test/submission/${id}`),
}
