/**
 * Constantes globales de la aplicación
 * Centraliza valores que se usan en múltiples lugares
 */

// Estados de pedidos
export const PEDIDO_ESTADOS = {
  REGISTRADO: 'Registrado',
  EN_PROCESO: 'En Proceso',
  COMPLETADO: 'Completado',
  CANCELADO: 'Cancelado',
}

// Lista de estados para selects
export const PEDIDO_ESTADOS_OPTIONS = [
  { value: 'Registrado', label: 'Registrado' },
  { value: 'En Proceso', label: 'En Proceso' },
  { value: 'Completado', label: 'Completado' },
  { value: 'Cancelado', label: 'Cancelado' },
]

// Códigos de estado HTTP
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
}

// Mensajes de error
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Error de conexión. Verifica tu conexión a internet.',
  UNAUTHORIZED: 'No tienes autorización. Por favor inicia sesión nuevamente.',
  SERVER_ERROR: 'Error en el servidor. Intenta nuevamente más tarde.',
  NOT_FOUND: 'Recurso no encontrado.',
  VALIDATION_ERROR: 'Error de validación. Verifica los datos ingresados.',
  GENERIC_ERROR: 'Ha ocurrido un error. Por favor intenta nuevamente.',
}

// Mensajes de éxito
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Inicio de sesión exitoso',
  PEDIDO_CREATED: 'Pedido creado exitosamente',
  PEDIDO_UPDATED: 'Pedido actualizado exitosamente',
  PEDIDO_DELETED: 'Pedido eliminado exitosamente',
}

// Configuración de paginación
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
}

// Timeouts
export const TIMEOUTS = {
  DEBOUNCE_SEARCH: 500,
  TOAST_DURATION: 3000,
  API_TIMEOUT: 30000,
}

// Regex patterns
export const PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[0-9]{9,15}$/,
  NUMBER: /^[0-9]+$/,
  DECIMAL: /^\d+(\.\d{1,2})?$/,
}

// Roles de usuario
export const USER_ROLES = {
  ADMIN: 'Admin',
  USER: 'User',
}

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: import.meta.env.VITE_TOKEN_KEY || 'auth_token',
  USER: 'user_data',
  THEME: 'app_theme',
}

// Rutas de la aplicación
export const APP_ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  PEDIDOS: '/pedidos',
  PEDIDOS_CREAR: '/pedidos/crear',
  PEDIDOS_EDITAR: '/pedidos/editar/:id',
  NOT_FOUND: '*',
}