 

import { useState, useEffect, useCallback } from 'react'
 
export const useLocalStorage = (key, initialValue) => {
  // Estado para almacenar el valor
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Intentar obtener el valor del localStorage
      const item = window.localStorage.getItem(key)
      
      // Si existe, parsearlo, si no, retornar el valor inicial
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error al leer localStorage key "${key}":`, error)
      return initialValue
    }
  })

  /**
   * Función para actualizar el valor
   */
  const setValue = useCallback(
    (value) => {
      try {
        // Permitir que value sea una función (como setState)
        const valueToStore = value instanceof Function ? value(storedValue) : value

        // Actualizar estado
        setStoredValue(valueToStore)

        // Guardar en localStorage
        window.localStorage.setItem(key, JSON.stringify(valueToStore))

        // Disparar evento personalizado para sincronizar entre pestañas
        window.dispatchEvent(
          new CustomEvent('localStorageChange', {
            detail: { key, value: valueToStore },
          })
        )
      } catch (error) {
        console.error(`Error al guardar en localStorage key "${key}":`, error)
      }
    },
    [key, storedValue]
  )

  /**
   * Función para remover el valor
   */
  const removeValue = useCallback(() => {
    try {
      // Remover del localStorage
      window.localStorage.removeItem(key)

      // Actualizar estado
      setStoredValue(initialValue)

      // Disparar evento
      window.dispatchEvent(
        new CustomEvent('localStorageChange', {
          detail: { key, value: null },
        })
      )
    } catch (error) {
      console.error(`Error al remover localStorage key "${key}":`, error)
    }
  }, [key, initialValue])

  /**
   * Escuchar cambios en localStorage (sincronización entre pestañas)
   */
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue))
        } catch (error) {
          console.error('Error al parsear valor de storage:', error)
        }
      }
    }

    const handleCustomEvent = (e) => {
      if (e.detail.key === key) {
        setStoredValue(e.detail.value)
      }
    }

    // Escuchar cambios nativos de storage
    window.addEventListener('storage', handleStorageChange)

    // Escuchar eventos personalizados
    window.addEventListener('localStorageChange', handleCustomEvent)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('localStorageChange', handleCustomEvent)
    }
  }, [key])

  return [storedValue, setValue, removeValue]
}

export default useLocalStorage
