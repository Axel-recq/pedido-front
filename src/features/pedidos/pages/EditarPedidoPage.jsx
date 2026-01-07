 
/**
 * Página de Editar Pedido
 * Formulario para editar un pedido existente
 */

import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, PackageSearch, AlertCircle } from 'lucide-react'
import { MainLayout } from '@/shared/components/layout'
import { Button, Loading, Alert } from '@/shared/components/ui'
import { PedidoForm } from '@/features/pedidos/components'
import { usePedido } from '@/core/hooks/usePedidos'
import { usePedidoMutations } from '@/features/pedidos/hooks'
import { ROUTES } from '@/config/routes.config'
import { formatDate } from '@/shared/utils/formatters'

export const EditarPedidoPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  
  // Queries y mutations
  const { data: pedido, isLoading, error } = usePedido(id)
  const { updatePedido, isLoading: isUpdating } = usePedidoMutations()

  // Redireccionar si no hay ID
  useEffect(() => {
    if (!id) {
      navigate(ROUTES.PRIVATE.PEDIDOS.path)
    }
  }, [id, navigate])

  const handleSubmit = async (pedidoData) => {
    await updatePedido(id, pedidoData)
  }

  const handleBack = () => {
    navigate(ROUTES.PRIVATE.PEDIDOS.path)
  }

  // Loading state
  if (isLoading) {
    return (
      <MainLayout showNavbar={false}>
        <div className="flex items-center justify-center py-20">
          <Loading size="lg" text="Cargando pedido..." />
        </div>
      </MainLayout>
    )
  }

  // Error state
  if (error) {
    return (
      <MainLayout showNavbar={false}>
        <div className="max-w-2xl mx-auto py-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="text-red-600" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Error al cargar el pedido
            </h2>
            <p className="text-gray-600 mb-6">
              {error.message || 'No se pudo cargar la información del pedido'}
            </p>
            <Button onClick={handleBack} icon={ArrowLeft}>
              Volver a pedidos
            </Button>
          </div>
        </div>
      </MainLayout>
    )
  }

  // Not found state
  if (!pedido) {
    return (
      <MainLayout showNavbar={false}>
        <div className="max-w-2xl mx-auto py-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <PackageSearch className="text-gray-400" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Pedido no encontrado
            </h2>
            <p className="text-gray-600 mb-6">
              El pedido que buscas no existe o ha sido eliminado
            </p>
            <Button onClick={handleBack} icon={ArrowLeft}>
              Volver a pedidos
            </Button>
          </div>
        </div>
      </MainLayout>
    )
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
            <PackageSearch className="text-white" size={24} />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Editar Pedido
            </h1>
            <p className="text-gray-600">
              Modifica la información del pedido{' '}
              <span className="font-semibold">{pedido.numeroPedido}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Información del pedido actual */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 mb-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-blue-600 font-bold text-lg">📦</span>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-blue-900 mb-3">
              Información actual del pedido
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-blue-600 font-medium">Cliente:</span>
                <p className="text-blue-900 font-semibold mt-0.5">
                  {pedido.cliente}
                </p>
              </div>
              <div>
                <span className="text-blue-600 font-medium">Fecha:</span>
                <p className="text-blue-900 font-semibold mt-0.5">
                  {formatDate(pedido.fecha)}
                </p>
              </div>
              <div>
                <span className="text-blue-600 font-medium">Total:</span>
                <p className="text-blue-900 font-semibold mt-0.5">
                  S/ {pedido.total.toFixed(2)}
                </p>
              </div>
              <div>
                <span className="text-blue-600 font-medium">Estado:</span>
                <p className="text-blue-900 font-semibold mt-0.5">
                  {pedido.estado}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alerta de advertencia */}
      {pedido.estado === 'Completado' && (
        <Alert
          type="warning"
          title="⚠️ Pedido Completado"
          message="Este pedido está marcado como completado. Ten cuidado al realizar modificaciones."
          className="mb-6"
        />
      )}

      {/* Formulario */}
      <div className="max-w-3xl">
        <PedidoForm
          pedidoInicial={pedido}
          onSubmit={handleSubmit}
          isLoading={isUpdating}
        />
      </div>

      {/* Información adicional */}
      <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-2">
          Historial del pedido
        </h3>
        <div className="text-sm text-gray-600 space-y-1">
          <p>• Pedido creado originalmente con número: {pedido.numeroPedido}</p>
          <p>• Estado actual: {pedido.estado}</p>
          <p>• Última modificación: Ahora mismo (al guardar)</p>
        </div>
      </div>
    </MainLayout>
  )
}

export default EditarPedidoPage
 