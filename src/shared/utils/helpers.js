/**
 * Funciones helper generales
 * Utilidades diversas para uso común
 */

/**
 * Genera un ID único
 * @returns {string} ID único
 */
export const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Genera un UUID simple
 * @returns {string} UUID
 */
export const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

/**
 * Hace una pausa (delay) asíncrona
 * @param {number} ms - Milisegundos de espera
 * @returns {Promise} Promesa que se resuelve después del delay
 */
export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Debounce - Retrasa la ejecución de una función
 * @param {Function} func - Función a ejecutar
 * @param {number} wait - Tiempo de espera en ms
 * @returns {Function} Función con debounce
 */
export const debounce = (func, wait = 300) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Throttle - Limita la ejecución de una función
 * @param {Function} func - Función a ejecutar
 * @param {number} limit - Tiempo límite en ms
 * @returns {Function} Función con throttle
 */
export const throttle = (func, limit = 300) => {
  let inThrottle
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * Copia texto al portapapeles
 * @param {string} text - Texto a copiar
 * @returns {Promise<boolean>} True si se copió correctamente
 */
export const copyToClipboard = async (text) => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    } else {
      // Fallback para navegadores antiguos
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      try {
        document.execCommand('copy')
        textArea.remove()
        return true
      } catch (error) {
        console.error('Error al copiar:', error)
        textArea.remove()
        return false
      }
    }
  } catch (error) {
    console.error('Error al copiar al portapapeles:', error)
    return false
  }
}

/**
 * Descarga un archivo JSON
 * @param {object} data - Datos a descargar
 * @param {string} filename - Nombre del archivo
 */
export const downloadJSON = (data, filename = 'data.json') => {
  const json = JSON.stringify(data, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * Obtiene un parámetro de la URL
 * @param {string} param - Nombre del parámetro
 * @returns {string|null} Valor del parámetro
 */
export const getUrlParameter = (param) => {
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get(param)
}

/**
 * Actualiza un parámetro en la URL
 * @param {string} param - Nombre del parámetro
 * @param {string} value - Valor del parámetro
 */
export const updateUrlParameter = (param, value) => {
  const url = new URL(window.location.href)
  url.searchParams.set(param, value)
  window.history.pushState({}, '', url)
}

/**
 * Verifica si un objeto está vacío
 * @param {object} obj - Objeto a verificar
 * @returns {boolean} True si está vacío
 */
export const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object
}

/**
 * Deep clone de un objeto
 * @param {any} obj - Objeto a clonar
 * @returns {any} Copia profunda del objeto
 */
export const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj
  return JSON.parse(JSON.stringify(obj))
}

/**
 * Compara dos objetos superficialmente
 * @param {object} obj1 - Primer objeto
 * @param {object} obj2 - Segundo objeto
 * @returns {boolean} True si son iguales
 */
export const shallowEqual = (obj1, obj2) => {
  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)

  if (keys1.length !== keys2.length) return false

  return keys1.every((key) => obj1[key] === obj2[key])
}

/**
 * Ordena un array de objetos por una propiedad
 * @param {Array} array - Array a ordenar
 * @param {string} key - Propiedad por la cual ordenar
 * @param {string} order - 'asc' o 'desc'
 * @returns {Array} Array ordenado
 */
export const sortByKey = (array, key, order = 'asc') => {
  return [...array].sort((a, b) => {
    const aVal = a[key]
    const bVal = b[key]

    if (aVal < bVal) return order === 'asc' ? -1 : 1
    if (aVal > bVal) return order === 'asc' ? 1 : -1
    return 0
  })
}

/**
 * Agrupa un array de objetos por una propiedad
 * @param {Array} array - Array a agrupar
 * @param {string} key - Propiedad por la cual agrupar
 * @returns {object} Objeto con arrays agrupados
 */
export const groupBy = (array, key) => {
  return array.reduce((result, item) => {
    const group = item[key]
    if (!result[group]) {
      result[group] = []
    }
    result[group].push(item)
    return result
  }, {})
}

/**
 * Obtiene valores únicos de un array
 * @param {Array} array - Array con posibles duplicados
 * @returns {Array} Array sin duplicados
 */
export const unique = (array) => {
  return [...new Set(array)]
}

/**
 * Formatea el tiempo transcurrido desde una fecha
 * @param {string|Date} date - Fecha
 * @returns {string} Tiempo transcurrido
 */
export const timeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000)

  let interval = Math.floor(seconds / 31536000)
  if (interval >= 1) return `hace ${interval} año${interval > 1 ? 's' : ''}`

  interval = Math.floor(seconds / 2592000)
  if (interval >= 1) return `hace ${interval} mes${interval > 1 ? 'es' : ''}`

  interval = Math.floor(seconds / 86400)
  if (interval >= 1) return `hace ${interval} día${interval > 1 ? 's' : ''}`

  interval = Math.floor(seconds / 3600)
  if (interval >= 1) return `hace ${interval} hora${interval > 1 ? 's' : ''}`

  interval = Math.floor(seconds / 60)
  if (interval >= 1) return `hace ${interval} minuto${interval > 1 ? 's' : ''}`

  return 'hace un momento'
}

/**
 * Genera un color aleatorio en formato hex
 * @returns {string} Color en formato hex
 */
export const randomColor = () => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
}

/**
 * Obtiene un color basado en un string (siempre el mismo para el mismo string)
 * @param {string} str - String base
 * @returns {string} Color en formato hex
 */
export const stringToColor = (str) => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  const color = Math.abs(hash).toString(16).substring(0, 6)
  return '#' + '0'.repeat(6 - color.length) + color
}

export default {
  generateId,
  generateUUID,
  sleep,
  debounce,
  throttle,
  copyToClipboard,
  downloadJSON,
  getUrlParameter,
  updateUrlParameter,
  isEmptyObject,
  deepClone,
  shallowEqual,
  sortByKey,
  groupBy,
  unique,
  timeAgo,
  randomColor,
  stringToColor,
}