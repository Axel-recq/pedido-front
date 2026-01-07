import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/core/hooks'
import { ROUTES } from '@/config/routes.config'
import { Loading } from '@/shared/components/ui'

export const PublicRoutes = () => {
  const { isAuthenticated, isLoading, isInitialized } = useAuth()

  // Esperar a que la auth se inicialice
  if (isLoading || !isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loading size="lg" text="Cargando..." />
      </div>
    )
  }

  // Si está autenticado, redirigir al dashboard (Pedidos)
  if (isAuthenticated) {
    return <Navigate to={ROUTES.DEFAULT_PRIVATE} replace />
  }

  // Si no, permitir acceso a hijos (Login)
  return <Outlet />
}

export default PublicRoutes