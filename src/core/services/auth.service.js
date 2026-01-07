/**
 * Servicio de Autenticación
 * Maneja login, logout y gestión de sesión
 */

import httpService from './http.service'
import { API_ENDPOINTS } from '@/config/api.config'
import { STORAGE_KEYS } from '@/config/constants'
import { AuthResponse, User } from '@/core/models'
import { jwtDecode } from 'jwt-decode'

class AuthService {
  /**
   * Realiza el login del usuario
   * @param {Object} credentials - Credenciales de acceso
   * @param {string} credentials.email - Email del usuario
   * @param {string} credentials.password - Contraseña del usuario
   * @returns {Promise<AuthResponse>} Respuesta con token y datos de usuario
   */
  async login(credentials) {
    try {
      // Validar que se proporcionen credenciales
      if (!credentials.email || !credentials.password) {
        throw new Error('Email y contraseña son requeridos')
      }

      // Realizar petición de login
      const response = await httpService.post(API_ENDPOINTS.AUTH.LOGIN, {
        email: credentials.email.trim(),
        password: credentials.password,
      })

      // Procesar respuesta
      const authResponse = new AuthResponse(response)

      // Guardar token
      if (authResponse.token) {
        this.setToken(authResponse.token)

        // Decodificar y guardar usuario si viene en el token
        try {
          const decoded = jwtDecode(authResponse.token)
          const user = new User({
            id: decoded.id || decoded.sub,
            email: decoded.email,
            name: decoded.name || decoded.unique_name,
            role: decoded.role,
          })
          this.setUser(user)
          authResponse.user = user
        } catch (error) {
          console.warn('No se pudo decodificar el token:', error)
        }
      }

      return authResponse
    } catch (error) {
      console.error('Error en login:', error)
      throw error
    }
  }

  /**
   * Cierra la sesión del usuario
   * @returns {Promise<void>}
   */
  async logout() {
    try {
      // Intentar llamar al endpoint de logout si existe
      if (httpService.hasAuthToken()) {
        try {
          await httpService.post(API_ENDPOINTS.AUTH.LOGOUT)
        } catch (error) {
          // Si falla el logout en el servidor, igual limpiamos local
          console.warn('Error al cerrar sesión en servidor:', error)
        }
      }
    } finally {
      // Siempre limpiar datos locales
      this.clearSession()
    }
  }

  /**
   * Verifica si el usuario está autenticado
   * @returns {boolean} True si está autenticado
   */
  isAuthenticated() {
    const token = this.getToken()
    if (!token) return false

    // Verificar si el token no ha expirado
    try {
      const decoded = jwtDecode(token)
      const currentTime = Date.now() / 1000

      // Si el token tiene exp y ya expiró
      if (decoded.exp && decoded.exp < currentTime) {
        this.clearSession()
        return false
      }

      return true
    } catch (error) {
      // Si no se puede decodificar, considerar inválido
      this.clearSession()
      return false
    }
  }

  /**
   * Obtiene el token actual
   * @returns {string|null} Token JWT
   */
  getToken() {
    return localStorage.getItem(STORAGE_KEYS.TOKEN)
  }

  /**
   * Guarda el token en localStorage
   * @param {string} token - Token JWT
   */
  setToken(token) {
    localStorage.setItem(STORAGE_KEYS.TOKEN, token)
    httpService.setAuthToken(token)
  }

  /**
   * Obtiene los datos del usuario actual
   * @returns {User|null} Usuario actual o null
   */
  getCurrentUser() {
    try {
      const userJson = localStorage.getItem(STORAGE_KEYS.USER)
      if (!userJson) return null

      const userData = JSON.parse(userJson)
      return new User(userData)
    } catch (error) {
      console.error('Error al obtener usuario:', error)
      return null
    }
  }

  /**
   * Guarda los datos del usuario en localStorage
   * @param {User} user - Datos del usuario
   */
  setUser(user) {
    try {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user))
    } catch (error) {
      console.error('Error al guardar usuario:', error)
    }
  }

  /**
   * Obtiene información del usuario desde el token
   * @returns {Object|null} Datos decodificados del token
   */
  getTokenData() {
    try {
      const token = this.getToken()
      if (!token) return null

      return jwtDecode(token)
    } catch (error) {
      console.error('Error al decodificar token:', error)
      return null
    }
  }

  /**
   * Verifica si el usuario tiene un rol específico
   * @param {string} role - Rol a verificar
   * @returns {boolean} True si tiene el rol
   */
  hasRole(role) {
    const user = this.getCurrentUser()
    if (!user) return false

    return user.role === role
  }

  /**
   * Verifica si el usuario es administrador
   * @returns {boolean} True si es admin
   */
  isAdmin() {
    return this.hasRole('Admin')
  }

  /**
   * Limpia toda la sesión (token y usuario)
   */
  clearSession() {
    localStorage.removeItem(STORAGE_KEYS.TOKEN)
    localStorage.removeItem(STORAGE_KEYS.USER)
    httpService.clearAuthToken()
  }

  /**
   * Refresca el token (si el backend lo soporta)
   * @returns {Promise<string>} Nuevo token
   */
  async refreshToken() {
    try {
      const response = await httpService.post(API_ENDPOINTS.AUTH.REFRESH)
      
      if (response.token) {
        this.setToken(response.token)
        return response.token
      }

      throw new Error('No se recibió token en la respuesta')
    } catch (error) {
      console.error('Error al refrescar token:', error)
      this.clearSession()
      throw error
    }
  }

  /**
   * Obtiene el perfil del usuario actual desde el servidor
   * @returns {Promise<User>} Datos del usuario
   */
  async getProfile() {
    try {
      const response = await httpService.get(API_ENDPOINTS.AUTH.ME)
      const user = new User(response)
      this.setUser(user)
      return user
    } catch (error) {
      console.error('Error al obtener perfil:', error)
      throw error
    }
  }

  /**
   * Calcula el tiempo restante del token en segundos
   * @returns {number} Segundos restantes (0 si expiró)
   */
  getTokenExpirationTime() {
    try {
      const decoded = this.getTokenData()
      if (!decoded || !decoded.exp) return 0

      const currentTime = Date.now() / 1000
      const remaining = decoded.exp - currentTime

      return remaining > 0 ? Math.floor(remaining) : 0
    } catch (error) {
      return 0
    }
  }

  /**
   * Verifica si el token está por expirar (menos de 5 minutos)
   * @returns {boolean} True si está por expirar
   */
  isTokenExpiringSoon() {
    const remaining = this.getTokenExpirationTime()
    return remaining > 0 && remaining < 300 // 5 minutos
  }
}

// Exportar instancia única (Singleton)
const authService = new AuthService()

export default authService