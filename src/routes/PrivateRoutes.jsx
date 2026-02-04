import { Outlet } from 'react-router-dom'
import { MainLayout } from '@/shared/components/layout'
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute'

export const PrivateRoutes = () => {
  return (
    <ProtectedRoute>
      <MainLayout>
        
        <Outlet />
      </MainLayout>
    </ProtectedRoute>
  )
}

export default PrivateRoutes
