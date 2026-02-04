 
import { PEDIDO_ESTADOS } from '@/config/constants'

export class Pedido {
  constructor(data = {}) {
    this.id = data.id || null
    this.numeroPedido = data.numeroPedido || ''
    this.cliente = data.cliente || ''
    this.fecha = data.fecha || new Date().toISOString().split('T')[0]
    this.total = data.total || 0
    this.estado = data.estado || PEDIDO_ESTADOS.REGISTRADO
  }

  // Validar pedido
  validate() {
    const errors = {}

    if (!this.numeroPedido || this.numeroPedido.trim() === '') {
      errors.numeroPedido = 'El número de pedido es requerido'
    }

    if (!this.cliente || this.cliente.trim() === '') {
      errors.cliente = 'El nombre del cliente es requerido'
    } else if (this.cliente.trim().length < 3) {
      errors.cliente = 'El nombre del cliente debe tener al menos 3 caracteres'
    }

    if (!this.fecha) {
      errors.fecha = 'La fecha es requerida'
    }

    if (this.total <= 0) {
      errors.total = 'El total debe ser mayor a 0'
    }

    if (!this.estado || !Object.values(PEDIDO_ESTADOS).includes(this.estado)) {
      errors.estado = 'El estado no es válido'
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    }
  }

  // Convertir a objeto plano para enviar al backend
  toJSON() {
    return {
      id: this.id,
      numeroPedido: this.numeroPedido.trim(),
      cliente: this.cliente.trim(),
      fecha: this.fecha,
      total: parseFloat(this.total),
      estado: this.estado,
    }
  }

  // Crear instancia desde respuesta del servidor
  static fromJSON(json) {
    return new Pedido({
      id: json.id,
      numeroPedido: json.numeroPedido,
      cliente: json.cliente,
      fecha: json.fecha,
      total: json.total,
      estado: json.estado,
    })
  }

  // Verificar si el pedido está completado
  isCompleted() {
    return this.estado === PEDIDO_ESTADOS.COMPLETADO
  }

  // Verificar si el pedido está cancelado
  isCancelled() {
    return this.estado === PEDIDO_ESTADOS.CANCELADO
  }

  // Verificar si el pedido puede ser editado
  canBeEdited() {
    return !this.isCompleted() && !this.isCancelled()
  }

  // Verificar si el pedido puede ser eliminado
  canBeDeleted() {
    return true // Por ahora todos pueden ser eliminados
  }
}

export class PedidoFormData {
  constructor(pedido = null) {
    if (pedido instanceof Pedido) {
      this.numeroPedido = pedido.numeroPedido
      this.cliente = pedido.cliente
      this.fecha = pedido.fecha
      this.total = pedido.total
      this.estado = pedido.estado
    } else {
      this.numeroPedido = ''
      this.cliente = ''
      this.fecha = new Date().toISOString().split('T')[0]
      this.total = ''
      this.estado = PEDIDO_ESTADOS.REGISTRADO
    }
  }

  // Convertir a Pedido
  toPedido(id = null) {
    return new Pedido({
      id,
      numeroPedido: this.numeroPedido,
      cliente: this.cliente,
      fecha: this.fecha,
      total: parseFloat(this.total) || 0,
      estado: this.estado,
    })
  }
}

//export default Pedido
