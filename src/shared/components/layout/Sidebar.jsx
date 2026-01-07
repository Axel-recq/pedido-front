/**
 * Componente Sidebar
 * Barra lateral simplificada: Solo Inicio y Pedidos
 */
import { NavLink } from 'react-router-dom'
import { 
  LayoutDashboard, 
  ShoppingCart, 
  ChevronsLeft, 
  ChevronsRight 
} from 'lucide-react'
import { ROUTES } from '@/config/routes.config'

// Configuración del Menú Simplificada
const MENU_ITEMS = [
  { 
    label: 'Inicio', 
    icon: LayoutDashboard, 
    path: '/' // Redirigirá a Pedidos según tus rutas, o a un Dashboard futuro
  },
  {
    label: 'Gestión de Pedidos',
    icon: ShoppingCart,
    path: ROUTES.PRIVATE.PEDIDOS.path 
  }
]

export const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  // Clases para items activos e inactivos
  const itemClasses = (isActive) => `
    flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 cursor-pointer text-sm font-medium
    ${isActive 
      ? 'bg-primary-600 text-white shadow-lg shadow-primary-900/20' 
      : 'text-gray-400 hover:bg-gray-800 hover:text-white'}
  `

  return (
    <aside 
      className={`
        relative h-screen bg-[#1a1c23] border-r border-gray-800 text-white flex flex-col transition-all duration-300 z-50
        ${isCollapsed ? 'w-20' : 'w-72'}
      `}
    >
      {/* Header del Sidebar (Logo) */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-800">
        {!isCollapsed && (
          <div className="flex items-center gap-2 animate-in fade-in duration-200">
            <div className="w-8 h-8 bg-primary-600 rounded flex items-center justify-center font-bold text-lg">
              S
            </div>
            <div>
              <h1 className="font-bold text-sm leading-tight">SISTEMA</h1>
              <span className="text-[10px] text-gray-500 tracking-wider">PEDIDOS</span>
            </div>
          </div>
        )}
        
        <button 
          onClick={toggleSidebar}
          className={`
            p-1.5 rounded-lg bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors
            ${isCollapsed ? 'mx-auto' : ''}
          `}
        >
          {isCollapsed ? <ChevronsRight size={18} /> : <ChevronsLeft size={18} />}
        </button>
      </div>

      {/* Lista de Navegación */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
        {MENU_ITEMS.map((item, index) => {
          const Icon = item.icon

          return (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) => itemClasses(isActive)}
              title={isCollapsed ? item.label : ''}
            >
              <div className="flex items-center gap-3">
                <Icon size={20} className="flex-shrink-0" />
                {!isCollapsed && <span className="whitespace-nowrap">{item.label}</span>}
              </div>
            </NavLink>
          )
        })}
      </div>

      {/* Footer del Sidebar */}
      <div className="p-4 border-t border-gray-800">
        <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-orange-500 flex items-center justify-center text-xs font-bold text-white shadow-lg flex-shrink-0">
            A
          </div>
          {!isCollapsed && (
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-white truncate">Axel Dev</p>
              <p className="text-xs text-gray-500 truncate">Administrador</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}

export default Sidebar