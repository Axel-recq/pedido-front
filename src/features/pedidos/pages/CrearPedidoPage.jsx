 
/**
 * Página de Crear Pedido
 * Formulario para crear un nuevo pedido
 */

import { ArrowLeft, PackagePlus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { MainLayout } from '@/shared/components/layout'
import { Button } from '@/shared/components/ui'
import { PedidoForm } from '@/features/pedidos/components'
import { usePedidoMutations } from '@/features/pedidos/hooks'
import { ROUTES } from '@/config/routes.config'

export const CrearPedidoPage = () => {
  const navigate = useNavigate()
  const { createPedido, isLoading } = usePedidoMutations()

  const handleSubmit = async (pedidoData) => {
    await createPedido(pedidoData)
  }

  const handleBack = () => {
    navigate(ROUTES.PRIVATE.PEDIDOS.path)
  }

  return (
    <MainLayout showNavbar={false}>
      {/* Breadcrumb / Back button */}
      <div className="mb-6">
        <Button
          variant="ghost"
          icon={ArrowLeft}
          onClick={handleBack}
          className="mb-4"
        >
          Volver a pedidos
        </Button>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
            <PackagePlus className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Crear Nuevo Pedido
            </h1>
            <p className="text-gray-600">
              Completa el formulario para registrar un nuevo pedido en el sistema
            </p>
          </div>
        </div>
      </div>

      {/* Información adicional */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-blue-600 font-bold">💡</span>
          </div>
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">
              Consejos para crear un pedido
            </h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• El número de pedido debe ser único en el sistema</li>
              <li>• El total debe ser mayor a 0</li>
              <li>• Verifica que todos los datos sean correctos antes de guardar</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Formulario */}
      <div className="max-w-3xl">
        <PedidoForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>

      {/* Ayuda adicional */}
      <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-2">
          ¿Necesitas ayuda?
        </h3>
        <p className="text-sm text-gray-600">
          Si tienes dudas sobre cómo crear un pedido, contacta al equipo de soporte o
          consulta la documentación del sistema.
        </p>
      </div>
    </MainLayout>
  )
}

export default CrearPedidoPage
 