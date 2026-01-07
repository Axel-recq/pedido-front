/**
 * Hook de Autenticación
 * Proporciona acceso al contexto de autenticación
 */

import { useContext } from 'react'
import { AuthContext } from '@/shared/contexts/AuthContext'

/**
 * Hook useAuth
 * @returns {Object} Contexto de autenticación
 * @throws {Error} Si se usa fuera de AuthProvider
 */
export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider')
  }

  return context
}

export default useAuth