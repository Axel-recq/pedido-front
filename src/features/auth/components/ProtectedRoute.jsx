/**
 * Componente ProtectedRoute
 * Protege rutas que requieren autenticación
 */

import { Navigate, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useAuth } from '@/core/hooks'
import { Loading } from '@/shared/components/ui'
import { ROUTES } from '@/config/routes.config'

export const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { isAuthenticated, isLoading, isInitialized, isAdmin } = useAuth()
  const location = useLocation()

  // Mostrar loading mientras se inicializa la autenticación
  if (!isInitialized || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loading size="lg" text="Verificando sesión..." />
      </div>
    )
  }

  // Si no está autenticado, redireccionar al login
  if (!isAuthenticated) {
    return (
      <Navigate 
        to={ROUTES.DEFAULT_PUBLIC} 
        state={{ from: location }} 
        replace 
      />
    )
  }

  // Si requiere admin y no es admin, redireccionar
  if (requireAdmin && !isAdmin()) {
    return (
      <Navigate 
        to={ROUTES.DEFAULT_PRIVATE} 
        replace 
      />
    )
  }

  // Si está autenticado, renderizar el contenido
  return children
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  requireAdmin: PropTypes.bool,
}

export default ProtectedRoute
