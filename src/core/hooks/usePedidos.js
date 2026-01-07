import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
// Asumiremos que crearemos este servicio en el siguiente paso
import * as pedidoService from '../services/pedido.service'

/**
 * CLAVES DE CONSULTA (Query Keys)
 * Centralizamos las keys para facilitar la invalidación de caché
 */
export const PEDIDOS_KEYS = {
  all: ['pedidos'],
  lists: () => [...PEDIDOS_KEYS.all, 'list'],
  list: (filters) => [...PEDIDOS_KEYS.lists(), { ...filters }],
  details: () => [...PEDIDOS_KEYS.all, 'detail'],
  detail: (id) => [...PEDIDOS_KEYS.details(), id],
  stats: () => [...PEDIDOS_KEYS.all, 'stats'],
}

/**
 * 1. Hook para obtener la lista de pedidos (con filtros opcionales)
 */
export const usePedidos = (filters = {}) => {
  return useQuery({
    queryKey: PEDIDOS_KEYS.list(filters),
    queryFn: () => pedidoService.getPedidos(filters),
    keepPreviousData: true, // Útil para paginación o filtros
    staleTime: 1000 * 60 * 5, // 5 minutos de caché fresco
    retry: 1,
  })
}

/**
 * 2. Hook para buscar pedidos (Alias semántico de usePedidos)
 */
export const useSearchPedidos = (searchTerm) => {
  return usePedidos({ search: searchTerm })
}

/**
 * 3. Hook para filtrar por estado (Alias semántico)
 */
export const usePedidosByEstado = (estado) => {
  return usePedidos({ estado })
}

/**
 * 4. Hook para obtener un solo pedido por ID
 */
export const usePedido = (id) => {
  return useQuery({
    queryKey: PEDIDOS_KEYS.detail(id),
    queryFn: () => pedidoService.getPedidoById(id),
    enabled: !!id, // Solo se ejecuta si hay ID
  })
}

/**
 * 5. Hook para obtener estadísticas (Bonus)
 */
export const usePedidosStats = () => {
  return useQuery({
    queryKey: PEDIDOS_KEYS.stats(),
    queryFn: pedidoService.getPedidosStats,
    staleTime: 1000 * 60 * 10, // 10 minutos
  })
}

/**
 * 6. Hook unificado para Mutaciones (Crear, Actualizar, Borrar)
 * Retorna las funciones individuales para mantener tu index.js limpio
 */
export const usePedidoMutations = () => {
  const queryClient = useQueryClient()

  // --- Crear ---
  const createMutation = useMutation({
    mutationFn: pedidoService.createPedido,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PEDIDOS_KEYS.lists() })
      toast.success('Pedido creado exitosamente')
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Error al crear el pedido')
    },
  })

  // --- Actualizar ---
  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => pedidoService.updatePedido(id, data),
    onSuccess: (_, variables) => {
      // Invalidamos la lista y el detalle específico
      queryClient.invalidateQueries({ queryKey: PEDIDOS_KEYS.lists() })
      queryClient.invalidateQueries({ queryKey: PEDIDOS_KEYS.detail(variables.id) })
      toast.success('Pedido actualizado correctamente')
    },
    onError: (error) => {
      toast.error('No se pudo actualizar el pedido')
    },
  })

  // --- Eliminar ---
  const deleteMutation = useMutation({
    mutationFn: pedidoService.deletePedido,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PEDIDOS_KEYS.lists() })
      toast.success('Pedido eliminado')
    },
    onError: (error) => {
      toast.error('Error al eliminar el pedido')
    },
  })

  return {
    createPedido: createMutation.mutateAsync,
    updatePedido: updateMutation.mutateAsync,
    deletePedido: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  }
}

// Exports individuales para mantener compatibilidad con tu index.js original
export const useCreatePedido = () => {
  const { createPedido, isCreating } = usePedidoMutations()
  return { mutate: createPedido, isLoading: isCreating }
}

export const useUpdatePedido = () => {
  const { updatePedido, isUpdating } = usePedidoMutations()
  return { mutate: updatePedido, isLoading: isUpdating }
}

export const useDeletePedido = () => {
  const { deletePedido, isDeleting } = usePedidoMutations()
  return { mutate: deletePedido, isLoading: isDeleting }
}