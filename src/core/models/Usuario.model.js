/**
 * Modelo de Usuario
 * Define la estructura de datos del usuario
 */

export class Usuario {
  constructor(data = {}) {
    this.id = data.id || null
    this.email = data.email || ''
    this.nombre = data.nombre || ''
    this.apellido = data.apellido || ''
    this.role = data.role || 'User'
    this.activo = data.activo !== undefined ? data.activo : true
    this.fechaCreacion = data.fechaCreacion || null
    
    this.name = this.nombre // El Header busca 'name'
  }

  // Obtener nombre completo
  getNombreCompleto() {
    return `${this.nombre} ${this.apellido}`.trim() || this.email
  }

  // Obtener iniciales
  getIniciales() {
    if (this.nombre && this.apellido) {
      return `${this.nombre[0]}${this.apellido[0]}`.toUpperCase()
    }
    if (this.email) {
      return this.email.substring(0, 2).toUpperCase()
    }
    return 'U'
  }

  // Verificar si es administrador
  esAdmin() {
    return this.role === 'Admin'
  }

  // Verificar si está activo
  estaActivo() {
    return this.activo === true
  }

  // Convertir a JSON
  toJSON() {
    return {
      id: this.id,
      email: this.email,
      nombre: this.nombre,
      apellido: this.apellido,
      role: this.role,
      activo: this.activo,
      fechaCreacion: this.fechaCreacion,
    }
  }

  // Crear desde JSON
  static fromJSON(json) {
    return new Usuario(json)
  }
}

export default Usuario