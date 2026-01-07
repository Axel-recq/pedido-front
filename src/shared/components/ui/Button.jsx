cat > src/shared/components/ui/Button.jsx << 'EOF'
/**
 * Componente Button
 * Botón reutilizable con variantes y estados
 */

import PropTypes from 'prop-types'
import { Loader2 } from 'lucide-react'

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  onClick,
  disabled = false,
  isLoading = false,
  fullWidth = false,
  icon: Icon,
  iconPosition = 'left',
  className = '',
  ...props
}) => {
  // Estilos base
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

  // Variantes de color
  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 shadow-sm',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400',
    success: 'bg-success-600 text-white hover:bg-success-700 focus:ring-success-500 shadow-sm',
    danger: 'bg-error-600 text-white hover:bg-error-700 focus:ring-error-500 shadow-sm',
    warning: 'bg-warning-600 text-white hover:bg-warning-700 focus:ring-warning-500 shadow-sm',
    outline: 'bg-transparent border-2 border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-400',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-400',
    link: 'bg-transparent text-primary-600 hover:text-primary-700 hover:underline focus:ring-0',
  }

  // Tamaños
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl',
  }

  // Ancho completo
  const widthClass = fullWidth ? 'w-full' : ''

  // Clases combinadas
  const combinedClasses = `
    ${baseStyles}
    ${variants[variant]}
    ${sizes[size]}
    ${widthClass}
    ${className}
  `.trim()

  // Renderizar icono
  const renderIcon = () => {
    if (isLoading) {
      return <Loader2 className="animate-spin" size={16} />
    }
    if (Icon) {
      return <Icon size={16} />
    }
    return null
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={combinedClasses}
      {...props}
    >
      {iconPosition === 'left' && renderIcon() && (
        <span className="mr-2">{renderIcon()}</span>
      )}
      
      {isLoading ? 'Cargando...' : children}
      
      {iconPosition === 'right' && renderIcon() && (
        <span className="ml-2">{renderIcon()}</span>
      )}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf([
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'outline',
    'ghost',
    'link',
  ]),
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  fullWidth: PropTypes.bool,
  icon: PropTypes.elementType,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  className: PropTypes.string,
}

export default Button
EOF