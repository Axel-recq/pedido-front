/**
 * Componente Spinner
 * Spinner simple para uso inline
 */

import PropTypes from 'prop-types'
import { Loader2 } from 'lucide-react'

export const Spinner = ({ size = 20, className = '' }) => {
  return (
    <Loader2
      size={size}
      className={`animate-spin text-current ${className}`}
    />
  )
}

Spinner.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
}

export default Spinner
