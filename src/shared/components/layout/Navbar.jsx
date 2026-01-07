/**
 * Componente Navbar
 * Navegación principal de la aplicación
 */

import { NavLink } from 'react-router-dom'
import { ShoppingCart, Plus } from 'lucide-react'
import { ROUTES } from '@/config/routes.config'
import { Button } from '@/shared/components/ui'

export const Navbar = () => {
  const navLinkClasses = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
      isActive
        ? 'bg-primary-100 text-primary-700'
        : 'text-gray-700 hover:bg-gray-100'
    }`

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container-app">
        <div className="flex items-center justify-between py-3">
          {/* Navigation Links */}
          <div className="flex items-center gap-2">
            <NavLink
              to={ROUTES.PRIVATE.PEDIDOS.path}
              className={navLinkClasses}
            >
              <ShoppingCart size={18} />
              <span>Pedidos</span>
            </NavLink>
          </div>

          {/* Action Button */}
          <NavLink to={ROUTES.PRIVATE.PEDIDOS_CREAR.path}>
            <Button icon={Plus} size="sm">
              Nuevo Pedido
            </Button>
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navbar