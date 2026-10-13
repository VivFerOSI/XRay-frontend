// Cliente del panel de administración.
const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api'
const CLAVE_TOKEN = 'xray_admin_token'

export function getToken() {
  try {
    return localStorage.getItem(CLAVE_TOKEN)
  } catch {
    // Modo privado o almacenamiento bloqueado: la sesión dura lo que la pestaña.
    return null
  }
}

export function setToken(token) {
  try {
    if (token) localStorage.setItem(CLAVE_TOKEN, token)
    else localStorage.removeItem(CLAVE_TOKEN)
  } catch {
    /* sin almacenamiento, el token vive sólo en memoria del módulo */
  }
}

/** Se dispara cuando el backend rechaza el token, para volver al login. */
const oyentesSesion = new Set()
export function onSesionVencida(fn) {
  oyentesSesion.add(fn)
  return () => oyentesSesion.delete(fn)
}

async function request(path, { method = 'GET', body, raw = false } = {}) {
  const token = getToken()
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      ...(body ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  })

  if (res.status === 401) {
    setToken(null)
    oyentesSesion.forEach((fn) => fn())
    throw new Error('Tu sesión venció. Volvé a entrar.')
  }
  if (!res.ok) {
    let detalle
    try {
      detalle = (await res.json())?.message
    } catch {
      detalle = res.statusText
    }
    const mensaje = Array.isArray(detalle) ? detalle.join(', ') : detalle
    throw new Error(mensaje || 'Error de comunicación con el servidor')
  }
  return raw ? res : res.json()
}

export const adminApi = {
  async login(email, password) {
    const data = await request('/admin/login', {
      method: 'POST',
      body: { email, password },
    })
    setToken(data.accessToken)
    return data
  },

  logout() {
    setToken(null)
  },

  // ── Cuestionarios ──
  assessments: () => request('/admin/assessments'),
  assessment: (key) => request(`/admin/assessments/${key}`),
  guardarAssessment: (key, definition) =>
    request(`/admin/assessments/${key}`, { method: 'PUT', body: definition }),

  // ── Resultados ──
  submission: (id) => request(`/admin/submissions/${id}`),

  submissions: (filtros = {}) => {
    const qs = new URLSearchParams(
      Object.entries(filtros).filter(([, v]) => v !== '' && v != null),
    ).toString()
    return request(`/admin/submissions${qs ? `?${qs}` : ''}`)
  },

  // ── Evaluaciones 360° ──
  rondas360: (filtros = {}) => {
    const qs = new URLSearchParams(
      Object.entries(filtros).filter(([, v]) => v !== '' && v != null),
    ).toString()
    return request(`/admin/evaluaciones-360${qs ? `?${qs}` : ''}`)
  },

  /** El id es el de la autoevaluación: hay una sola ronda por cada una. */
  ronda360: (submissionId) => request(`/admin/evaluaciones-360/${submissionId}`),

  /** Descarga el CSV respetando los filtros de la pantalla. */
  async descargarCsv(filtros = {}) {
    const qs = new URLSearchParams(
      Object.entries(filtros).filter(([, v]) => v !== '' && v != null),
    ).toString()
    const res = await request(`/admin/submissions/export.csv${qs ? `?${qs}` : ''}`, {
      raw: true,
    })
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `xray-resultados-${new Date().toISOString().slice(0, 10)}.csv`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  },
}
