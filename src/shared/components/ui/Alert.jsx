
/**
 * Componente Alert
 * Mensajes de alerta con diferentes tipos
 */

import PropTypes from 'prop-types'
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from 'lucide-react'

export const Alert = ({
  type = 'info',
  title,
  message,
  onClose,
  className = '',
}) => {
  // Configuración por tipo
  const types = {
    success: {
      icon: CheckCircle,
      bgColor: 'bg-success-50',
      borderColor: 'border-success-200',
      textColor: 'text-success-800',
      iconColor: 'text-success-600',
    },
    error: {
      icon: AlertCircle,
      bgColor: 'bg-error-50',
      borderColor: 'border-error-200',
      textColor: 'text-error-800',
      iconColor: 'text-error-600',
    },
    warning: {
      icon: AlertTriangle,
      bgColor: 'bg-warning-50',
      borderColor: 'border-warning-200',
      textColor: 'text-warning-800',
      iconColor: 'text-warning-600',
    },
    info: {
      icon: Info,
      bgColor: 'bg-primary-50',
      borderColor: 'border-primary-200',
      textColor: 'text-primary-800',
      iconColor: 'text-primary-600',
    },
  }

  const config = types[type]
  const Icon = config.icon

  return (
    <div
      className={`
        ${config.bgColor}
        ${config.borderColor}
        ${config.textColor}
        border rounded-lg p-4
        ${className}
      `}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className={`flex-shrink-0 ${config.iconColor}`}>
          <Icon size={20} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {title && (
            <h4 className="font-semibold mb-1">{title}</h4>
          )}
          {message && (
            <p className="text-sm">{message}</p>
          )}
        </div>

        {/* Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className={`flex-shrink-0 ${config.iconColor} hover:opacity-70 transition-opacity`}
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  )
}

Alert.propTypes = {
  type: PropTypes.oneOf(['success', 'error', 'warning', 'info']),
  title: PropTypes.string,
  message: PropTypes.string,
  onClose: PropTypes.func,
  className: PropTypes.string,
}

export default Alert
