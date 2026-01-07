/**
 * Componente Input
 * Input reutilizable con label, error y estados
 */

import PropTypes from 'prop-types'
import { AlertCircle } from 'lucide-react'

export const Input = ({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  disabled = false,
  required = false,
  helperText,
  icon: Icon,
  className = '',
  inputClassName = '',
  ...props
}) => {
  const inputId = name || `input-${Math.random().toString(36).substr(2, 9)}`

  const baseInputStyles = 'w-full px-4 py-2 border rounded-lg transition-colors focus:outline-none focus:ring-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500'
  
  const inputStyles = error
    ? 'border-error-500 focus:border-error-500 focus:ring-error-200 dark:focus:ring-error-900/30'
    : 'border-gray-300 dark:border-gray-600 focus:border-primary-500 focus:ring-primary-200 dark:focus:ring-primary-900/30'

  const disabledStyles = disabled ? 'bg-gray-100 dark:bg-gray-800 cursor-not-allowed opacity-70' : ''

  const iconPadding = Icon ? 'pl-10' : ''

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
        >
          {label}
          {required && <span className="text-error-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none">
            <Icon size={18} />
          </div>
        )}

        <input
          id={inputId}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          required={required}
          className={`
            ${baseInputStyles}
            ${inputStyles}
            ${disabledStyles}
            ${iconPadding}
            ${inputClassName}
          `}
          {...props}
        />
      </div>

      {error && (
        <div className="flex items-start gap-1.5 mt-1.5 text-error-600 dark:text-error-400">
          <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {helperText && !error && (
        <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">{helperText}</p>
      )}
    </div>
  )
}

Input.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  helperText: PropTypes.string,
  icon: PropTypes.elementType,
  className: PropTypes.string,
  inputClassName: PropTypes.string,
}

export default Input
