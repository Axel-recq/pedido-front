import { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ROUTES } from '@/config/routes.config'
import { Loading } from '@/shared/components/ui'
import { NotFound, ErrorBoundary } from '@/shared/components/common'

// Layouts de rutas
import PublicRoutes from './PublicRoutes'
import PrivateRoutes from './PrivateRoutes'

// Lazy Loading de Páginas (Mejora rendimiento)
// Auth
const LoginPage = lazy(() => import('@/features/auth/pages/LoginPage'))

// Pedidos
const PedidosPage = lazy(() => import('@/features/pedidos/pages/PedidosPage'))
const CrearPedidoPage = lazy(() => import('@/features/pedidos/pages/CrearPedidoPage'))
const EditarPedidoPage = lazy(() => import('@/features/pedidos/pages/EditarPedidoPage'))

export const AppRoutes = () => {
  return (
    <ErrorBoundary>
      <Suspense 
        fallback={
          <div className="h-screen w-full flex items-center justify-center">
            <Loading size="lg" text="Cargando aplicación..." />
          </div>
        }
      >
        <Routes>
          {/* --- Rutas Públicas (Login) --- */}
          <Route element={<PublicRoutes />}>
            <Route path={ROUTES.PUBLIC.LOGIN.path} element={<LoginPage />} />
          </Route>

          {/* --- Rutas Privadas (Dashboard) --- */}
          <Route element={<PrivateRoutes />}>
            {/* Redirección de raíz '/' a '/pedidos' */}
            <Route 
              path="/" 
              element={<Navigate to={ROUTES.DEFAULT_PRIVATE} replace />} 
            />
            
            {/* Rutas de Pedidos */}
            <Route path={ROUTES.PRIVATE.PEDIDOS.path} element={<PedidosPage />} />
            <Route path={ROUTES.PRIVATE.PEDIDOS_CREAR.path} element={<CrearPedidoPage />} />
            <Route path={ROUTES.PRIVATE.PEDIDOS_EDITAR.path} element={<EditarPedidoPage />} />
          </Route>

          {/* --- 404 Not Found --- */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  )
}

export default AppRoutes