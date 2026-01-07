/**
 * Componente MainLayout
 * Layout principal de la aplicación con Header y contenido
 */

import { useState } from 'react'
import PropTypes from 'prop-types'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

export const MainLayout = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }
  return (
    // Contenedor principal: Flex Row (Horizontal) y altura de pantalla completa
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 overflow-hidden">
      
      {/* 1. Sidebar Fijo a la izquierda */}
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        toggleSidebar={toggleSidebar} 
      />

      {/* 2. Área de Contenido (Derecha) */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header Superior */}
        <Header />

        {/* Contenido Scrollable */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8 scroll-smooth custom-scrollbar">
          <div className="container-app mx-auto max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            {children}
          </div>
        </main>
      {/* Footer (opcional) */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto transition-colors duration-200">
        <div className="container-app py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} Sistema de Pedidos. Todos los derechos reservados.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Desarrollado como parte del reto técnico Fullstack Senior
            </p>
          </div>
        </div>
      </footer>
    </div>
    </div>
  )
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
   
}

export default MainLayout