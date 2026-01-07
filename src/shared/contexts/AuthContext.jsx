/**
 * Contexto de Autenticación
 * Maneja el estado global de autenticación en toda la aplicación
 */

import { createContext, useState, useEffect, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { authService } from '@/core/services'
import { User } from '@/core/models'

// Crear el contexto
export const AuthContext = createContext(null)

/**
 * Provider de Autenticación
 * Envuelve la aplicación y proporciona el estado de autenticación
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isInitialized, setIsInitialized] = useState(false)

  /**
   * Inicializa el estado de autenticación
   * Verifica si hay un usuario logueado al cargar la app
   */
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setIsLoading(true)

        // Verificar si hay token válido
        if (authService.isAuthenticated()) {
          // Obtener usuario del localStorage
          const currentUser = authService.getCurrentUser()

          if (currentUser) {
            setUser(currentUser)
            setIsAuthenticated(true)

            // Opcional: Validar token con el servidor
            // Esto es útil para verificar que el token siga siendo válido
            try {
              // Si el backend tiene endpoint /auth/me, descomenta esto:
              // const userFromServer = await authService.getProfile()
              // setUser(userFromServer)
            } catch (error) {
              console.warn('Token inválido, cerrando sesión:', error)
              handleLogout()
            }
          } else {
            // Si hay token pero no hay usuario, limpiar
            handleLogout()
          }
        } else {
          // No hay token válido
          setUser(null)
          setIsAuthenticated(false)
        }
      } catch (error) {
        console.error('Error al inicializar autenticación:', error)
        handleLogout()
      } finally {
        setIsLoading(false)
        setIsInitialized(true)
      }
    }

    initializeAuth()
  }, [])

  /**
   * Maneja el login exitoso
   * @param {User} userData - Datos del usuario
   * @param {string} token - Token JWT
   */
  const login = useCallback((userData, token) => {
    try {
      // Crear instancia de User si no lo es
      const userInstance = userData instanceof User ? userData : new User(userData)

      // Guardar token
      if (token) {
        authService.setToken(token)
      }

      // Guardar usuario
      authService.setUser(userInstance)

      // Actualizar estado
      setUser(userInstance)
      setIsAuthenticated(true)

      console.log('✅ Usuario autenticado:', userInstance.email)
    } catch (error) {
      console.error('Error al establecer sesión:', error)
      throw error
    }
  }, [])

  /**
   * Maneja el logout
   */
  const handleLogout = useCallback(() => {
    // Limpiar sesión en el servicio
    authService.clearSession()

    // Actualizar estado
    setUser(null)
    setIsAuthenticated(false)

    console.log('👋 Sesión cerrada')
  }, [])

  /**
   * Cierra la sesión (wrapper asíncrono)
   */
  const logout = useCallback(async () => {
    try {
      // Intentar cerrar sesión en el servidor
      await authService.logout()
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    } finally {
      // Siempre limpiar sesión local
      handleLogout()
    }
  }, [handleLogout])

  /**
   * Actualiza los datos del usuario
   * @param {Object} updates - Datos a actualizar
   */
  const updateUser = useCallback((updates) => {
    setUser((prevUser) => {
      if (!prevUser) return null

      const updatedUser = new User({
        ...prevUser,
        ...updates,
      })

      // Guardar en localStorage
      authService.setUser(updatedUser)

      return updatedUser
    })
  }, [])

  /**
   * Verifica si el usuario tiene un rol específico
   * @param {string} role - Rol a verificar
   * @returns {boolean}
   */
  const hasRole = useCallback(
    (role) => {
      if (!user) return false
      return user.role === role
    },
    [user]
  )

  /**
   * Verifica si el usuario es administrador
   * @returns {boolean}
   */
  const isAdmin = useCallback(() => {
    return hasRole('Admin')
  }, [hasRole])

  /**
   * Obtiene el token actual
   * @returns {string|null}
   */
  const getToken = useCallback(() => {
    return authService.getToken()
  }, [])

  /**
   * Verifica si el token está por expirar
   * @returns {boolean}
   */
  const isTokenExpiringSoon = useCallback(() => {
    return authService.isTokenExpiringSoon()
  }, [])

  /**
   * Refresca el token
   */
  const refreshToken = useCallback(async () => {
    try {
      const newToken = await authService.refreshToken()
      return newToken
    } catch (error) {
      console.error('Error al refrescar token:', error)
      handleLogout()
      throw error
    }
  }, [handleLogout])

  /**
   * Verifica el token periódicamente
   * Si está por expirar, intenta refrescarlo
   */
  useEffect(() => {
    if (!isAuthenticated) return

    const checkTokenExpiration = () => {
      if (isTokenExpiringSoon()) {
        console.warn('⚠️ Token por expirar, intentando refrescar...')
        refreshToken().catch((error) => {
          console.error('No se pudo refrescar el token:', error)
        })
      }
    }

    // Verificar cada 5 minutos
    const interval = setInterval(checkTokenExpiration, 5 * 60 * 1000)

    return () => clearInterval(interval)
  }, [isAuthenticated, isTokenExpiringSoon, refreshToken])

  // Memoizar el valor del contexto para evitar re-renders innecesarios
  const contextValue = useMemo(
    () => ({
      // Estado
      user,
      isAuthenticated,
      isLoading,
      isInitialized,

      // Métodos
      login,
      logout,
      updateUser,
      hasRole,
      isAdmin,
      getToken,
      isTokenExpiringSoon,
      refreshToken,
    }),
    [
      user,
      isAuthenticated,
      isLoading,
      isInitialized,
      login,
      logout,
      updateUser,
      hasRole,
      isAdmin,
      getToken,
      isTokenExpiringSoon,
      refreshToken,
    ]
  )

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AuthContext