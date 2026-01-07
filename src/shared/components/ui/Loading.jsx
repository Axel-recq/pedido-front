
/**
 * Componente Loading
 * Indicador de carga con diferentes variantes
 */

import PropTypes from 'prop-types'
import { Loader2 } from 'lucide-react'

export const Loading = ({
  size = 'md',
  text,
  variant = 'spinner',
  fullScreen = false,
  className = '',
}) => {
  // Tamaños
  const sizes = {
    sm: 16,
    md: 24,
    lg: 32,
    xl: 48,
  }

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  }

  // Contenedor
  const containerClasses = fullScreen
    ? 'fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50'
    : 'flex items-center justify-center'

  // Spinner animado
  const Spinner = () => (
    <Loader2
      size={sizes[size]}
      className="animate-spin text-primary-600"
    />
  )

  // Dots animados
  const Dots = () => (
    <div className="flex space-x-2">
      <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
      <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
      <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
    </div>
  )

  // Pulse
  const Pulse = () => (
    <div className="flex space-x-2">
      <div className="w-3 h-3 bg-primary-600 rounded-full animate-pulse"></div>
      <div className="w-3 h-3 bg-primary-600 rounded-full animate-pulse" style={{ animationDelay: '200ms' }}></div>
      <div className="w-3 h-3 bg-primary-600 rounded-full animate-pulse" style={{ animationDelay: '400ms' }}></div>
    </div>
  )

  // Seleccionar variante
  const renderLoader = () => {
    switch (variant) {
      case 'dots':
        return <Dots />
      case 'pulse':
        return <Pulse />
      case 'spinner':
      default:
        return <Spinner />
    }
  }

  return (
    <div className={`${containerClasses} ${className}`}>
      <div className="flex flex-col items-center gap-3">
        {renderLoader()}
        {text && (
          <p className={`text-gray-600 font-medium ${textSizes[size]}`}>
            {text}
          </p>
        )}
      </div>
    </div>
  )
}

Loading.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  text: PropTypes.string,
  variant: PropTypes.oneOf(['spinner', 'dots', 'pulse']),
  fullScreen: PropTypes.bool,
  className: PropTypes.string,
}

export default Loading
