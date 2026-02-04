 

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '@/core/services'
import { useAuth } from '@/core/hooks'
import toast from 'react-hot-toast'
import { SUCCESS_MESSAGES } from '@/config/constants'
import { ROUTES } from '@/config/routes.config'

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const { login: setAuthState } = useAuth()

  /**
   * Realiza el login
   * @param {Object} credentials - Credenciales de acceso
   */
  const login = async (credentials) => {
    try {
      setIsLoading(true)
      setError(null)

      // Validar credenciales básicas
      if (!credentials.email || !credentials.password) {
        throw new Error('Email y contraseña son requeridos')
      }

      // Llamar al servicio de autenticación
      const response = await authService.login(credentials)

      // Si el login fue exitoso
      if (response.token) {
        // Actualizar el contexto de autenticación
        setAuthState(response.user, response.token)

        // Mostrar mensaje de éxito
        toast.success(SUCCESS_MESSAGES.LOGIN_SUCCESS)

        // Redireccionar a la página principal
        navigate(ROUTES.DEFAULT_PRIVATE, { replace: true })
      } else {
        throw new Error('No se recibió token de autenticación')
      }
    } catch (err) {
      const errorMessage = err.message || 'Error al iniciar sesión'
      setError(errorMessage)
      toast.error(errorMessage)
      console.error('Error en login:', err)
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Limpia el error
   */
  const clearError = () => {
    setError(null)
  }

  return {
    login,
    isLoading,
    error,
    clearError,
  }
}

export default useLogin
