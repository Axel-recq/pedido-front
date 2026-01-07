/**
 * Hook de Formulario de Pedido
 * Maneja la lógica del formulario de crear/editar pedido
 */

import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { PEDIDO_ESTADOS } from '@/config/constants'
import { ROUTES } from '@/config/routes.config'
import { Pedido } from '@/core/models'

/**
 * Hook usePedidoForm
 * @param {Pedido} pedidoInicial - Pedido existente para editar
 * @param {Function} onSubmit - Función a ejecutar al enviar el formulario
 * @returns {Object} Form handlers y estado
 */
export const usePedidoForm = (pedidoInicial = null, onSubmit) => {
  const navigate = useNavigate()

  // Valores por defecto del formulario
  const defaultValues = pedidoInicial
    ? {
        numeroPedido: pedidoInicial.numeroPedido,
        cliente: pedidoInicial.cliente,
        fecha: pedidoInicial.fecha,
        total: pedidoInicial.total,
        estado: pedidoInicial.estado,
      }
    : {
        numeroPedido: '',
        cliente: '',
        fecha: new Date().toISOString().split('T')[0],
        total: '',
        estado: PEDIDO_ESTADOS.REGISTRADO,
      }

  // Configurar react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    watch,
    setValue,
    reset,
    getValues,
  } = useForm({
    defaultValues,
    mode: 'onChange',
  })

  /**
   * Maneja el envío del formulario
   */
  const handleFormSubmit = async (data) => {
    try {
      // Crear instancia de Pedido
      const pedido = new Pedido({
        ...data,
        id: pedidoInicial?.id || null,
        total: parseFloat(data.total),
      })

      // Validar
      const validation = pedido.validate()
      if (!validation.isValid) {
        console.error('Errores de validación:', validation.errors)
        return
      }

      // Ejecutar callback de envío
      if (onSubmit) {
        await onSubmit(pedido)
      }
    } catch (error) {
      console.error('Error al enviar formulario:', error)
      throw error
    }
  }

  /**
   * Cancela y vuelve a la lista
   */
  const handleCancel = () => {
    if (isDirty) {
      const confirmed = window.confirm(
        '¿Estás seguro? Los cambios no guardados se perderán.'
      )
      if (!confirmed) return
    }
    navigate(ROUTES.PRIVATE.PEDIDOS.path)
  }

  /**
   * Resetea el formulario
   */
  const handleReset = () => {
    reset(defaultValues)
  }

  /**
   * Validaciones personalizadas
   */
  const validateNumeroPedido = {
    required: 'El número de pedido es requerido',
    minLength: {
      value: 3,
      message: 'Debe tener al menos 3 caracteres',
    },
    maxLength: {
      value: 50,
      message: 'Debe tener máximo 50 caracteres',
    },
  }

  const validateCliente = {
    required: 'El nombre del cliente es requerido',
    minLength: {
      value: 3,
      message: 'Debe tener al menos 3 caracteres',
    },
    maxLength: {
      value: 150,
      message: 'Debe tener máximo 150 caracteres',
    },
  }

  const validateFecha = {
    required: 'La fecha es requerida',
  }

  const validateTotal = {
    required: 'El total es requerido',
    min: {
      value: 0.01,
      message: 'El total debe ser mayor a 0',
    },
    pattern: {
      value: /^\d+(\.\d{1,2})?$/,
      message: 'Formato inválido (máximo 2 decimales)',
    },
  }

  const validateEstado = {
    required: 'El estado es requerido',
  }

  return {
    register,
    handleSubmit: handleSubmit(handleFormSubmit),
    errors,
    isSubmitting,
    isDirty,
    watch,
    setValue,
    reset: handleReset,
    getValues,
    handleCancel,
    // Validaciones
    validations: {
      numeroPedido: validateNumeroPedido,
      cliente: validateCliente,
      fecha: validateFecha,
      total: validateTotal,
      estado: validateEstado,
    },
  }
}

export default usePedidoForm