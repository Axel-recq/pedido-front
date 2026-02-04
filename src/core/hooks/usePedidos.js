
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { pedidoService } from '@/core/services'
import toast from 'react-hot-toast'
import { SUCCESS_MESSAGES } from '@/config/constants'

// Query Keys
const PEDIDOS_QUERY_KEY = 'pedidos'

/**
 * Hook para obtener todos los pedidos
 * @param {Object} params - Parámetros de filtrado
 * @returns {Object} Query result
 */
export const usePedidos = (params = {}) => {
  return useQuery({
    queryKey: [PEDIDOS_QUERY_KEY, params],
    queryFn: () => pedidoService.getAll(params),
    staleTime: 1000 * 60 * 5, // 5 minutos
    retry: 2,
    onError: (error) => {
      toast.error(error.message || 'Error al cargar pedidos')
    },
  })
}

/**
 * Hook para obtener un pedido por ID
 * @param {number} id - ID del pedido
 * @returns {Object} Query result
 */
export const usePedido = (id) => {
  return useQuery({
    queryKey: [PEDIDOS_QUERY_KEY, id],
    queryFn: () => pedidoService.getById(id),
    enabled: !!id, // Solo ejecutar si hay ID
    retry: 1,
    onError: (error) => {
      toast.error(error.message || 'Error al cargar pedido')
    },
  })
}

/**
 * Hook para crear un pedido
 * @returns {Object} Mutation result
 */
export const useCreatePedido = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (pedidoData) => pedidoService.create(pedidoData),
    onSuccess: (data) => {
      // Invalidar queries para refrescar la lista
      queryClient.invalidateQueries([PEDIDOS_QUERY_KEY])
      
      toast.success(SUCCESS_MESSAGES.PEDIDO_CREATED)
      
      return data
    },
    onError: (error) => {
      toast.error(error.message || 'Error al crear pedido')
    },
  })
}

/**
 * Hook para actualizar un pedido
 * @returns {Object} Mutation result
 */
export const useUpdatePedido = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }) => pedidoService.update(id, data),
    onSuccess: (data, variables) => {
      // Invalidar queries
      queryClient.invalidateQueries([PEDIDOS_QUERY_KEY])
      queryClient.invalidateQueries([PEDIDOS_QUERY_KEY, variables.id])
      
      toast.success(SUCCESS_MESSAGES.PEDIDO_UPDATED)
      
      return data
    },
    onError: (error) => {
      toast.error(error.message || 'Error al actualizar pedido')
    },
  })
}

/**
 * Hook para eliminar un pedido
 * @returns {Object} Mutation result
 */
export const useDeletePedido = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id) => pedidoService.delete(id),
    onSuccess: (_, id) => {
      // Invalidar queries
      queryClient.invalidateQueries([PEDIDOS_QUERY_KEY])
      
      // Remover el pedido específico del cache
      queryClient.removeQueries([PEDIDOS_QUERY_KEY, id])
      
      toast.success(SUCCESS_MESSAGES.PEDIDO_DELETED)
    },
    onError: (error) => {
      toast.error(error.message || 'Error al eliminar pedido')
    },
  })
}

/**
 * Hook para buscar pedidos
 * @param {string} query - Término de búsqueda
 * @returns {Object} Query result
 */
export const useSearchPedidos = (query) => {
  return useQuery({
    queryKey: [PEDIDOS_QUERY_KEY, 'search', query],
    queryFn: () => pedidoService.search(query),
    enabled: !!query && query.length >= 2, // Buscar solo si hay al menos 2 caracteres
    staleTime: 1000 * 30, // 30 segundos
  })
}

/**
 * Hook para filtrar pedidos por estado
 * @param {string} estado - Estado del pedido
 * @returns {Object} Query result
 */
export const usePedidosByEstado = (estado) => {
  return useQuery({
    queryKey: [PEDIDOS_QUERY_KEY, 'estado', estado],
    queryFn: () => pedidoService.filterByEstado(estado),
    enabled: !!estado,
    staleTime: 1000 * 60 * 2, // 2 minutos
  })
}

/**
 * Hook para obtener estadísticas de pedidos
 * @returns {Object} Query result
 */
export const usePedidosStats = () => {
  return useQuery({
    queryKey: [PEDIDOS_QUERY_KEY, 'stats'],
    queryFn: () => pedidoService.getStatistics(),
    staleTime: 1000 * 60 * 5, // 5 minutos
  })
}

/**
 * Hook combinado para mutaciones de pedidos
 * @returns {Object} Objeto con todas las mutaciones
 */
export const usePedidoMutations = () => {
  const createMutation = useCreatePedido()
  const updateMutation = useUpdatePedido()
  const deleteMutation = useDeletePedido()

  return {
    create: createMutation,
    update: updateMutation,
    delete: deleteMutation,
    isLoading:
      createMutation.isLoading ||
      updateMutation.isLoading ||
      deleteMutation.isLoading,
  }
}

export default {
  usePedidos,
  usePedido,
  useCreatePedido,
  useUpdatePedido,
  useDeletePedido,
  useSearchPedidos,
  usePedidosByEstado,
  usePedidosStats,
  usePedidoMutations,
}
