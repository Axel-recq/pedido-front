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

  // Esta función maneja tanto colapsar (desktop) como abrir/cerrar (mobile)
  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 overflow-hidden">
      
      {/* Sidebar */}
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        toggleSidebar={toggleSidebar} 
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* CORRECCIÓN: Pasamos toggleSidebar al Header */}
        <Header toggleSidebar={toggleSidebar} />

        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8 scroll-smooth custom-scrollbar">
          <div className="container-app mx-auto max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default MainLayout