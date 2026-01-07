/**
 * Funciones de validación de datos
 * Validaciones reutilizables para formularios
 */

import { PATTERNS } from '@/config/constants'

/**
 * Valida si un email es válido
 * @param {string} email - Email a validar
 * @returns {boolean} True si es válido
 */
export const isValidEmail = (email) => {
  if (!email) return false
  return PATTERNS.EMAIL.test(email.trim())
}

/**
 * Valida si una contraseña cumple los requisitos mínimos
 * @param {string} password - Contraseña a validar
 * @param {number} minLength - Longitud mínima
 * @returns {object} Resultado de validación
 */
export const validatePassword = (password, minLength = 6) => {
  const errors = []

  if (!password) {
    return { isValid: false, errors: ['La contraseña es requerida'] }
  }

  if (password.length < minLength) {
    errors.push(`La contraseña debe tener al menos ${minLength} caracteres`)
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

/**
 * Valida si un número de teléfono es válido
 * @param {string} phone - Teléfono a validar
 * @returns {boolean} True si es válido
 */
export const isValidPhone = (phone) => {
  if (!phone) return false
  const cleaned = phone.replace(/\D/g, '')
  return PATTERNS.PHONE.test(cleaned)
}

/**
 * Valida si un número es válido
 * @param {any} value - Valor a validar
 * @returns {boolean} True si es válido
 */
export const isValidNumber = (value) => {
  return !isNaN(parseFloat(value)) && isFinite(value)
}

/**
 * Valida si un número decimal es válido
 * @param {string} value - Valor a validar
 * @returns {boolean} True si es válido
 */
export const isValidDecimal = (value) => {
  if (!value) return false
  return PATTERNS.DECIMAL.test(String(value))
}

/**
 * Valida si un string no está vacío
 * @param {string} value - Valor a validar
 * @param {number} minLength - Longitud mínima
 * @returns {boolean} True si es válido
 */
export const isNotEmpty = (value, minLength = 1) => {
  if (!value) return false
  return value.trim().length >= minLength
}

/**
 * Valida si una fecha es válida
 * @param {string|Date} date - Fecha a validar
 * @returns {boolean} True si es válida
 */
export const isValidDate = (date) => {
  if (!date) return false
  const dateObj = new Date(date)
  return dateObj instanceof Date && !isNaN(dateObj.getTime())
}

/**
 * Valida si una fecha está en el futuro
 * @param {string|Date} date - Fecha a validar
 * @returns {boolean} True si está en el futuro
 */
export const isFutureDate = (date) => {
  if (!isValidDate(date)) return false
  const dateObj = new Date(date)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return dateObj > today
}

/**
 * Valida si una fecha está en el pasado
 * @param {string|Date} date - Fecha a validar
 * @returns {boolean} True si está en el pasado
 */
export const isPastDate = (date) => {
  if (!isValidDate(date)) return false
  const dateObj = new Date(date)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return dateObj < today
}

/**
 * Valida un rango de valores numéricos
 * @param {number} value - Valor a validar
 * @param {number} min - Valor mínimo
 * @param {number} max - Valor máximo
 * @returns {boolean} True si está en el rango
 */
export const isInRange = (value, min, max) => {
  if (!isValidNumber(value)) return false
  const num = parseFloat(value)
  return num >= min && num <= max
}

/**
 * Valida longitud de un string
 * @param {string} value - String a validar
 * @param {number} min - Longitud mínima
 * @param {number} max - Longitud máxima
 * @returns {object} Resultado de validación
 */
export const validateLength = (value, min = 0, max = Infinity) => {
  if (!value) {
    return {
      isValid: min === 0,
      message: 'El campo es requerido',
    }
  }

  const length = value.trim().length

  if (length < min) {
    return {
      isValid: false,
      message: `Debe tener al menos ${min} caracteres`,
    }
  }

  if (length > max) {
    return {
      isValid: false,
      message: `Debe tener máximo ${max} caracteres`,
    }
  }

  return { isValid: true, message: '' }
}

/**
 * Valida que un valor sea mayor a cero
 * @param {number} value - Valor a validar
 * @returns {boolean} True si es mayor a cero
 */
export const isPositive = (value) => {
  return isValidNumber(value) && parseFloat(value) > 0
}

/**
 * Valida un número de documento (DNI peruano)
 * @param {string} dni - DNI a validar
 * @returns {boolean} True si es válido
 */
export const isValidDNI = (dni) => {
  if (!dni) return false
  const cleaned = dni.replace(/\D/g, '')
  return cleaned.length === 8 && PATTERNS.NUMBER.test(cleaned)
}

/**
 * Valida un RUC peruano
 * @param {string} ruc - RUC a validar
 * @returns {boolean} True si es válido
 */
export const isValidRUC = (ruc) => {
  if (!ruc) return false
  const cleaned = ruc.replace(/\D/g, '')
  return cleaned.length === 11 && PATTERNS.NUMBER.test(cleaned)
}

/**
 * Sanitiza un string removiendo caracteres especiales
 * @param {string} value - String a sanitizar
 * @returns {string} String sanitizado
 */
export const sanitizeString = (value) => {
  if (!value) return ''
  return value.trim().replace(/[<>\"\']/g, '')
}

/**
 * Valida un objeto completo contra un schema
 * @param {object} data - Datos a validar
 * @param {object} schema - Schema de validación
 * @returns {object} Resultado de validación
 */
export const validateObject = (data, schema) => {
  const errors = {}

  Object.keys(schema).forEach((key) => {
    const validator = schema[key]
    const value = data[key]

    if (typeof validator === 'function') {
      const result = validator(value)
      if (result !== true) {
        errors[key] = result
      }
    }
  })

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

export default {
  isValidEmail,
  validatePassword,
  isValidPhone,
  isValidNumber,
  isValidDecimal,
  isNotEmpty,
  isValidDate,
  isFutureDate,
  isPastDate,
  isInRange,
  validateLength,
  isPositive,
  isValidDNI,
  isValidRUC,
  sanitizeString,
  validateObject,
}