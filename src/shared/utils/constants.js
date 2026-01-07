/**
 * Constantes de Utilidad (UI/Formatos)
 * Valores usados por helpers y componentes visuales
 */

// Formatos de fecha (para date-fns o similar)
export const DATE_FORMATS = {
  DISPLAY: 'dd/MM/yyyy',
  API: 'yyyy-MM-dd',
  DATETIME_DISPLAY: 'dd/MM/yyyy HH:mm',
}

// Símbolos de moneda
export const CURRENCY = {
  SYMBOL: 'S/',
  CODE: 'PEN',
  LOCALE: 'es-PE',
}

// Límites de texto
export const TEXT_LIMITS = {
  SHORT_DESCRIPTION: 50,
  LONG_DESCRIPTION: 200,
}

// Tamaños de archivos (en bytes)
export const FILE_SIZES = {
  MAX_UPLOAD: 5 * 1024 * 1024, // 5MB
}

// Tipos de archivo permitidos
export const FILE_TYPES = {
  IMAGES: ['image/jpeg', 'image/png', 'image/webp'],
  DOCUMENTS: ['application/pdf'],
}

// Regex comunes para UI
export const REGEX = {
  ONLY_NUMBERS: /^[0-9]*$/,
  ONLY_LETTERS: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/,
}

export default {
  DATE_FORMATS,
  CURRENCY,
  TEXT_LIMITS,
  FILE_SIZES,
  FILE_TYPES,
  REGEX
}