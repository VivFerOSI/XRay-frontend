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

// Las rutas sin key responden el cuestionario por defecto (emprendimiento).
const base = (key) => (key ? `/stress-test/${key}` : '/stress-test')

export const stressTestApi = {
  // Cuestionarios disponibles.
  list: () => request('/stress-test'),
  content: (key) => request(`${base(key)}/content`),
  submit: (payload, key) =>
    request(`${base(key)}/submit`, {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  // Informe ya enviado, para el enlace permanente que va en el correo.
  submission: (id) => request(`/stress-test/submission/${id}`),

  // ── Evaluación 360° ──
  estado360: (submissionId) => request(`/evaluacion-360/${submissionId}`),
  invitar360: (submissionId, evaluadores) =>
    request(`/evaluacion-360/${submissionId}/invitar`, {
      method: 'POST',
      body: JSON.stringify({ evaluadores }),
    }),
  comparativo360: (submissionId) =>
    request(`/evaluacion-360/${submissionId}/comparativo`),

  // Lo que abre quien fue invitado a evaluar, con el token de su enlace.
  evaluacion: (token) => request(`/evaluacion/${token}`),
  responderEvaluacion: (token, answers) =>
    request(`/evaluacion/${token}`, {
      method: 'POST',
      body: JSON.stringify({ answers }),
    }),
}
