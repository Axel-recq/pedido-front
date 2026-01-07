/**
 * Modelo de autenticación
 * Define la estructura de datos para login y tokens
 */

export class AuthResponse {
  constructor(data = {}) {
    this.token = data.token || ''
    this.expiresIn = data.expiresIn || 3600
    this.user = data.user || null
  }

  // Validar si el token es válido
  isValid() {
    return this.token && this.token.length > 0
  }
}

export class LoginRequest {
  constructor(email = '', password = '') {
    this.email = email
    this.password = password
  }

  // Validar credenciales básicas
  validate() {
    const errors = {}

    if (!this.email || this.email.trim() === '') {
      errors.email = 'El email es requerido'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      errors.email = 'El email no es válido'
    }

    if (!this.password || this.password.trim() === '') {
      errors.password = 'La contraseña es requerida'
    } else if (this.password.length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres'
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    }
  }

  // Convertir a objeto plano para enviar al backend
  toJSON() {
    return {
      email: this.email.trim(),
      password: this.password,
    }
  }
}

export class User {
  constructor(data = {}) {
    this.id = data.id || null
    this.email = data.email || ''
    this.name = data.name || ''
    this.role = data.role || 'User'
  }

  // Verificar si el usuario es admin
  isAdmin() {
    return this.role === 'Admin'
  }

  // Obtener iniciales del nombre
  getInitials() {
    if (!this.name) return '?'
    const names = this.name.split(' ')
    return names
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }
}

export default {
  AuthResponse,
  LoginRequest,
  User,
}