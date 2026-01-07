 
/**
 * Componente Header
 * Barra superior con navegación, búsqueda, tema y menú de usuario
 */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut, Moon, Sun, Menu } from 'lucide-react'
import { useAuth } from '@/core/hooks'
import { ROUTES } from '@/config/routes.config'
import { useTheme } from '@/shared/contexts/ThemeContext'

export const Header = ({ toggleSidebar }) => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [showUserMenu, setShowUserMenu] = useState(false)
  
  const { theme, toggleTheme } = useTheme()

  const handleLogout = async () => {
    try {
      await logout()
      navigate(ROUTES.PUBLIC.LOGIN.path)
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 shadow-sm transition-colors duration-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* --- IZQUIERDA: Botón Menú Móvil & Título --- */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Menu size={24} />
            </button>

            {/* Título de la sección (Visible en desktop) */}
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white hidden sm:block">
              Dashboard
            </h2>
          </div>

          {/* --- DERECHA: Acciones (Tema, Usuario) --- */}
          <div className="flex items-center gap-2 md:gap-4">
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 rounded-lg transition-colors"
              title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 hidden md:block" />

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-3 hover:opacity-80 transition-opacity outline-none"
              >
                <div className="hidden md:block text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {user?.name || 'Usuario'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user?.role || 'Admin'}
                  </p>
                </div>
                <div className="w-9 h-9 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full flex items-center justify-center font-bold border-2 border-white dark:border-gray-800 shadow-sm">
                  {user?.getInitials() || 'U'}
                </div>
              </button>

              {/* Dropdown */}
              {showUserMenu && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowUserMenu(false)} />
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-1 z-20 animate-in fade-in zoom-in-95 duration-100">
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 md:hidden">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {user?.name}
                      </p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2 transition-colors"
                    >
                      <LogOut size={16} />
                      Cerrar Sesión
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}