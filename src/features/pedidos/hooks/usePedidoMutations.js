/**
 * Hook de Mutaciones de Pedidos
 * Simplifica el uso de mutaciones en componentes
 */

import { useNavigate } from 'react-router-dom'
import {
  useCreatePedido,
  useUpdatePedido,
  useDeletePedido,
} from '@/core/hooks/usePedidos'
import { ROUTES } from '@/config/routes.config'

export const usePedidoMutations = () => {
  const navigate = useNavigate()

  const createMutation = useCreatePedido()
  const updateMutation = useUpdatePedido()
  const deleteMutation = useDeletePedido()

  /**
   * Crea un pedido y redirecciona
   */
  const createPedido = async (pedidoData) => {
    try {
      await createMutation.mutateAsync(pedidoData)
      navigate(ROUTES.PRIVATE.PEDIDOS.path)
    } catch (error) {
      console.error('Error al crear pedido:', error)
      throw error
    }
  }

  /**
   * Actualiza un pedido y redirecciona
   */
  const updatePedido = async (id, pedidoData) => {
    try {
      await updateMutation.mutateAsync({ id, data: pedidoData })
      navigate(ROUTES.PRIVATE.PEDIDOS.path)
    } catch (error) {
      console.error('Error al actualizar pedido:', error)
      throw error
    }
  }

  /**
   * Elimina un pedido
   */
  const deletePedido = async (id) => {
    try {
      await deleteMutation.mutateAsync(id)
    } catch (error) {
      console.error('Error al eliminar pedido:', error)
      throw error
    }
  }

  return {
    createPedido,
    updatePedido,
    deletePedido,
    isLoading:
      createMutation.isPending ||
      updateMutation.isPending ||
      deleteMutation.isPending,
    createStatus: createMutation.status,
    updateStatus: updateMutation.status,
    deleteStatus: deleteMutation.status,
  }
}

export default usePedidoMutations