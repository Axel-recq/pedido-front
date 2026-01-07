
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
  // Estilos base
  const baseStyles = 'bg-white rounded-lg border border-gray-200 transition-all'

  // Variantes
  const variants = {
    default: '',
    hover: 'hover:shadow-md cursor-pointer',
    bordered: 'border-2',
  }

  // Sombras
  const shadows = {
    none: '',
    sm: 'shadow-sm',
    default: 'shadow',
    md: 'shadow-md',
    lg: 'shadow-lg',
  }

  // Padding
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
        <div className={`border-b border-gray-200 pb-4 mb-4 ${paddingClass} ${headerClassName}`}>
          {title && (
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          )}
          {subtitle && (
            <p className="mt-1 text-sm text-gray-600">{subtitle}</p>
          )}
        </div>
      )}

      {/* Body */}
      <div className={`${paddingClass} ${bodyClassName}`}>
        {children}
      </div>

      {/* Footer */}
      {footer && (
        <div className={`border-t border-gray-200 pt-4 mt-4 ${paddingClass} ${footerClassName}`}>
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
