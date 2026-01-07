
/**
 * Componente Card
 * Tarjeta contenedora reutilizable
 */

import PropTypes from 'prop-types'

export const Card = ({
  children,
  title,
  subtitle,
  footer,
  padding = 'default',
  variant = 'default',
  shadow = 'default',
  className = '',
  headerClassName = '',
  bodyClassName = '',
  footerClassName = '',
  onClick,
}) => {
  // Estilos base con soporte dark mode
  const baseStyles = 'bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-200'

  const variants = {
    default: '',
    hover: 'hover:shadow-md cursor-pointer hover:border-gray-300 dark:hover:border-gray-600',
    bordered: 'border-2',
  }

  const shadows = {
    none: '',
    sm: 'shadow-sm',
    default: 'shadow dark:shadow-none', // Quitamos sombras fuertes en dark mode
    md: 'shadow-md dark:shadow-none',
    lg: 'shadow-lg dark:shadow-none',
  }

  const paddings = {
    none: '',
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8',
  }

  const combinedClasses = `
    ${baseStyles}
    ${variants[variant]}
    ${shadows[shadow]}
    ${className}
  `.trim()

  const paddingClass = paddings[padding]

  return (
    <div className={combinedClasses} onClick={onClick}>
      {/* Header */}
      {(title || subtitle) && (
        <div className={`border-b border-gray-200 dark:border-gray-700 pb-4 mb-4 ${paddingClass} ${headerClassName}`}>
          {title && (
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
          )}
          {subtitle && (
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{subtitle}</p>
          )}
        </div>
      )}

      {/* Body */}
      <div className={`${paddingClass} ${bodyClassName} text-gray-700 dark:text-gray-300`}>
        {children}
      </div>

      {/* Footer */}
      {footer && (
        <div className={`border-t border-gray-200 dark:border-gray-700 pt-4 mt-4 bg-gray-50 dark:bg-gray-800/50 rounded-b-lg ${paddingClass} ${footerClassName}`}>
          {footer}
        </div>
      )}
    </div>
  )
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  footer: PropTypes.node,
  padding: PropTypes.oneOf(['none', 'sm', 'default', 'lg']),
  variant: PropTypes.oneOf(['default', 'hover', 'bordered']),
  shadow: PropTypes.oneOf(['none', 'sm', 'default', 'md', 'lg']),
  className: PropTypes.string,
  headerClassName: PropTypes.string,
  bodyClassName: PropTypes.string,
  footerClassName: PropTypes.string,
  onClick: PropTypes.func,
}

export default Card