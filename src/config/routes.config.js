
export const ROUTES = {
  // Rutas públicas
  PUBLIC: {
    LOGIN: {
      path: '/login',
      name: 'Login',
      title: 'Iniciar Sesión',
    },
  },
  // Rutas privadas
  PRIVATE: {
    PEDIDOS: {
      path: '/pedidos',
      name: 'Pedidos',
      title: 'Gestión de Pedidos',
      icon: 'ShoppingCart',
    },
    PEDIDOS_CREAR: {
      path: '/pedidos/crear',
      name: 'CrearPedido',
      title: 'Crear Pedido',
      parent: 'PEDIDOS',
    },
    PEDIDOS_EDITAR: {
      path: '/pedidos/editar/:id',
      name: 'EditarPedido',
      title: 'Editar Pedido',
      parent: 'PEDIDOS',
    },
  },
  // Ruta por defecto después del login
  DEFAULT_PRIVATE: '/pedidos',
  // Ruta por defecto para usuarios no autenticados
  DEFAULT_PUBLIC: '/login',
}

// Menú de navegación (solo rutas principales)
export const NAVIGATION_MENU = [
  {
    name: 'Pedidos',
    path: '/pedidos',
    icon: 'ShoppingCart',
  },
]

export default ROUTES
