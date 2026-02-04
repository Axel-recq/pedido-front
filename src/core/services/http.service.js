 

import axios from 'axios'
import { API_CONFIG } from '@/config/api.config'
import { STORAGE_KEYS, HTTP_STATUS, ERROR_MESSAGES } from '@/config/constants'

// Crear instancia de Axios
const httpClient = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  headers: API_CONFIG.headers,
})

/**
 * Interceptor de Request
 * Agrega el token de autenticación a todas las peticiones
 */
httpClient.interceptors.request.use(
  (config) => {
    // Obtener token del localStorage
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN)

    // Si existe token, agregarlo al header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // Log para desarrollo (puedes removerlo en producción)
    if (import.meta.env.DEV) {
      console.log('📤 Request:', config.method?.toUpperCase(), config.url)
    }

    return config
  },
  (error) => {
    console.error('❌ Request Error:', error)
    return Promise.reject(error)
  }
)

/**
 * Interceptor de Response
 * Maneja respuestas exitosas y errores de forma centralizada
 */
httpClient.interceptors.response.use(
  (response) => {
    // Log para desarrollo
    if (import.meta.env.DEV) {
      console.log('📥 Response:', response.status, response.config.url)
    }

    return response
  },
  (error) => {
    // Log para desarrollo
    if (import.meta.env.DEV) {
      console.error('❌ Response Error:', error.response?.status, error.config?.url)
    }

    // Manejar errores según el código de estado
    if (error.response) {
      const { status, data } = error.response

      switch (status) {
        case HTTP_STATUS.UNAUTHORIZED:
          // Token inválido o expirado - limpiar sesión
          handleUnauthorized()
          break

        case HTTP_STATUS.FORBIDDEN:
          error.message = 'No tienes permisos para realizar esta acción'
          break

        case HTTP_STATUS.NOT_FOUND:
          error.message = data?.message || ERROR_MESSAGES.NOT_FOUND
          break

        case HTTP_STATUS.BAD_REQUEST:
          error.message = data?.message || ERROR_MESSAGES.VALIDATION_ERROR
          break

        case HTTP_STATUS.INTERNAL_SERVER_ERROR:
          error.message = ERROR_MESSAGES.SERVER_ERROR
          break

        default:
          error.message = data?.message || ERROR_MESSAGES.GENERIC_ERROR
      }
    } else if (error.request) {
      // Error de red
      error.message = ERROR_MESSAGES.NETWORK_ERROR
    } else {
      error.message = ERROR_MESSAGES.GENERIC_ERROR
    }

    return Promise.reject(error)
  }
)

/**
 * Maneja el error 401 (No autorizado)
 * Limpia el token y redirecciona al login
 */
const handleUnauthorized = () => {
  // Limpiar token y datos de usuario
  localStorage.removeItem(STORAGE_KEYS.TOKEN)
  localStorage.removeItem(STORAGE_KEYS.USER)

  // Redireccionar al login solo si no estamos ya ahí
  if (window.location.pathname !== '/login') {
    window.location.href = '/login'
  }
}

/**
 * Clase HttpService
 * Proporciona métodos para realizar peticiones HTTP
 */
class HttpService {
  /**
   * GET Request
   * @param {string} url - URL del endpoint
   * @param {object} config - Configuración adicional
   * @returns {Promise} Respuesta del servidor
   */
  async get(url, config = {}) {
    try {
      const response = await httpClient.get(url, config)
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  /**
   * POST Request
   * @param {string} url - URL del endpoint
   * @param {object} data - Datos a enviar
   * @param {object} config - Configuración adicional
   * @returns {Promise} Respuesta del servidor
   */
  async post(url, data = {}, config = {}) {
    try {
      const response = await httpClient.post(url, data, config)
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  /**
   * PUT Request
   * @param {string} url - URL del endpoint
   * @param {object} data - Datos a enviar
   * @param {object} config - Configuración adicional
   * @returns {Promise} Respuesta del servidor
   */
  async put(url, data = {}, config = {}) {
    try {
      const response = await httpClient.put(url, data, config)
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  /**
   * PATCH Request
   * @param {string} url - URL del endpoint
   * @param {object} data - Datos a enviar
   * @param {object} config - Configuración adicional
   * @returns {Promise} Respuesta del servidor
   */
  async patch(url, data = {}, config = {}) {
    try {
      const response = await httpClient.patch(url, data, config)
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  /**
   * DELETE Request
   * @param {string} url - URL del endpoint
   * @param {object} config - Configuración adicional
   * @returns {Promise} Respuesta del servidor
   */
  async delete(url, config = {}) {
    try {
      const response = await httpClient.delete(url, config)
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  /**
   * Maneja errores de forma consistente
   * @param {Error} error - Error capturado
   * @returns {Error} Error procesado
   */
  handleError(error) {
    const handledError = {
      message: error.message || ERROR_MESSAGES.GENERIC_ERROR,
      status: error.response?.status || null,
      data: error.response?.data || null,
      originalError: error,
    }

    // Log solo en desarrollo
    if (import.meta.env.DEV) {
      console.error('🔴 HTTP Error:', handledError)
    }

    return handledError
  }

  /**
   * Obtiene el cliente axios raw (para casos especiales)
   * @returns {AxiosInstance} Instancia de axios
   */
  getClient() {
    return httpClient
  }

  /**
   * Establece el token de autenticación
   * @param {string} token - Token JWT
   */
  setAuthToken(token) {
    if (token) {
      localStorage.setItem(STORAGE_KEYS.TOKEN, token)
    } else {
      localStorage.removeItem(STORAGE_KEYS.TOKEN)
    }
  }

  /**
   * Obtiene el token de autenticación
   * @returns {string|null} Token JWT
   */
  getAuthToken() {
    return localStorage.getItem(STORAGE_KEYS.TOKEN)
  }

  /**
   * Verifica si hay un token válido
   * @returns {boolean} True si hay token
   */
  hasAuthToken() {
    return !!this.getAuthToken()
  }

  /**
   * Limpia el token de autenticación
   */
  clearAuthToken() {
    localStorage.removeItem(STORAGE_KEYS.TOKEN)
    localStorage.removeItem(STORAGE_KEYS.USER)
  }
}

// Exportar instancia única (Singleton)
const httpService = new HttpService()

export default httpService
