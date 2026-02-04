

import { QueryClient } from '@tanstack/react-query'

/**
 * Configuración del QueryClient
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Tiempo que los datos se consideran frescos (5 minutos)
      staleTime: 1000 * 60 * 5,
      
      // Tiempo que los datos permanecen en cache (10 minutos)
      cacheTime: 1000 * 60 * 10,
      
      // Reintentos en caso de error
      retry: 2,
      
      // Delay entre reintentos (exponencial)
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      
      // Refetch al enfocar la ventana
      refetchOnWindowFocus: false,
      
      // Refetch al reconectar
      refetchOnReconnect: true,
      
      // Refetch al montar el componente
      refetchOnMount: true,
    },
    mutations: {
      // Reintentos para mutations
      retry: 1,
      
      // Delay entre reintentos
      retryDelay: 1000,
    },
  },
})

export default queryClient
