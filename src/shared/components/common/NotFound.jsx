/**
 * Componente NotFound
 * Página 404 - No encontrado
 */

import { useNavigate } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'
import { Button } from '@/shared/components/ui'
import { ROUTES } from '@/config/routes.config'

export const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary-600 mb-2">404</h1>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Página no encontrada
          </h2>
          <p className="text-gray-600">
            Lo sentimos, la página que buscas no existe o ha sido movida.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            icon={ArrowLeft}
          >
            Volver atrás
          </Button>
          <Button
            onClick={() => navigate(ROUTES.PRIVATE.PEDIDOS.path)}
            icon={Home}
          >
            Ir al inicio
          </Button>
        </div>

        <div className="mt-12 text-sm text-gray-500">
          <p>Si crees que esto es un error, por favor contacta al administrador.</p>
        </div>
      </div>
    </div>
  )
}

export default NotFound