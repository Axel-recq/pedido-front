/**
 * Funciones de formateo de datos
 * Centraliza el formateo de fechas, números, monedas, etc.
 */

/**
 * Formatea un número como moneda
 * @param {number} amount - Cantidad a formatear
 * @param {string} currency - Código de moneda (default: 'PEN')
 * @returns {string} Cantidad formateada
 */
export const formatCurrency = (amount, currency = 'PEN') => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return 'S/ 0.00'
  }

  const formatter = new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  return formatter.format(amount)
}

/**
 * Formatea una fecha en formato legible
 * @param {string|Date} date - Fecha a formatear
 * @param {string} format - Formato deseado ('short', 'long', 'full')
 * @returns {string} Fecha formateada
 */
export const formatDate = (date, format = 'short') => {
  if (!date) return '-'

  const dateObj = typeof date === 'string' ? new Date(date) : date

  if (isNaN(dateObj.getTime())) return '-'

  const options = {
    short: { year: 'numeric', month: '2-digit', day: '2-digit' },
    long: { year: 'numeric', month: 'long', day: 'numeric' },
    full: { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    },
  }

  return new Intl.DateTimeFormat('es-PE', options[format] || options.short)
    .format(dateObj)
}

/**
 * Formatea una fecha y hora
 * @param {string|Date} datetime - Fecha y hora a formatear
 * @returns {string} Fecha y hora formateada
 */
export const formatDateTime = (datetime) => {
  if (!datetime) return '-'

  const dateObj = typeof datetime === 'string' ? new Date(datetime) : datetime

  if (isNaN(dateObj.getTime())) return '-'

  return new Intl.DateTimeFormat('es-PE', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(dateObj)
}

/**
 * Formatea un número con separadores de miles
 * @param {number} number - Número a formatear
 * @returns {string} Número formateado
 */
export const formatNumber = (number) => {
  if (number === null || number === undefined || isNaN(number)) {
    return '0'
  }

  return new Intl.NumberFormat('es-PE').format(number)
}

/**
 * Formatea un número de teléfono
 * @param {string} phone - Teléfono a formatear
 * @returns {string} Teléfono formateado
 */
export const formatPhone = (phone) => {
  if (!phone) return '-'

  const cleaned = phone.replace(/\D/g, '')
  
  if (cleaned.length === 9) {
    return cleaned.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3')
  }
  
  return phone
}

/**
 * Trunca un texto a un número máximo de caracteres
 * @param {string} text - Texto a truncar
 * @param {number} maxLength - Longitud máxima
 * @returns {string} Texto truncado
 */
export const truncateText = (text, maxLength = 50) => {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

/**
 * Capitaliza la primera letra de un texto
 * @param {string} text - Texto a capitalizar
 * @returns {string} Texto capitalizado
 */
export const capitalize = (text) => {
  if (!text) return ''
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

/**
 * Capitaliza cada palabra de un texto
 * @param {string} text - Texto a capitalizar
 * @returns {string} Texto con cada palabra capitalizada
 */
export const capitalizeWords = (text) => {
  if (!text) return ''
  return text
    .split(' ')
    .map(word => capitalize(word))
    .join(' ')
}

/**
 * Formatea un porcentaje
 * @param {number} value - Valor entre 0 y 1
 * @param {number} decimals - Número de decimales
 * @returns {string} Porcentaje formateado
 */
export const formatPercentage = (value, decimals = 0) => {
  if (value === null || value === undefined || isNaN(value)) {
    return '0%'
  }

  return `${(value * 100).toFixed(decimals)}%`
}

/**
 * Formatea bytes a formato legible (KB, MB, GB)
 * @param {number} bytes - Cantidad de bytes
 * @returns {string} Tamaño formateado
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}

/**
 * Obtiene las iniciales de un nombre
 * @param {string} name - Nombre completo
 * @returns {string} Iniciales
 */
export const getInitials = (name) => {
  if (!name) return '?'
  
  const words = name.trim().split(' ').filter(word => word.length > 0)
  
  if (words.length === 0) return '?'
  if (words.length === 1) return words[0].substring(0, 2).toUpperCase()
  
  return (words[0][0] + words[words.length - 1][0]).toUpperCase()
}

/**
 * Formatea un número de pedido con padding
 * @param {number|string} number - Número de pedido
 * @param {number} length - Longitud total
 * @returns {string} Número formateado
 */
export const formatOrderNumber = (number, length = 6) => {
  if (!number) return ''
  return String(number).padStart(length, '0')
}

export default {
  formatCurrency,
  formatDate,
  formatDateTime,
  formatNumber,
  formatPhone,
  truncateText,
  capitalize,
  capitalizeWords,
  formatPercentage,
  formatFileSize,
  getInitials,
  formatOrderNumber,
}