
// Variables de entorno
export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 30000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
}

// Endpoints de la API
export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
  },
  // Pedidos
  PEDIDOS: {
    BASE: '/pedidos',
    BY_ID: (id) => `/pedidos/${id}`,
    CREATE: '/pedidos',
    UPDATE: (id) => `/pedidos/${id}`,
    DELETE: (id) => `/pedidos/${id}`,
  },
}

// Configuración de reintentos
export const RETRY_CONFIG = {
  retries: 3,
  retryDelay: 1000,
  retryCondition: (error) => {
    // Reintentar solo en errores de red o 5xx
    return !error.response || (error.response.status >= 500 && error.response.status < 600)
  },
}

// Headers personalizados
export const getAuthHeader = (token) => ({
  Authorization: `Bearer ${token}`,
})

export default API_CONFIG
