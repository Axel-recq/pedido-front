/**
 * Componente ErrorBoundary
 * Captura errores en la aplicación y muestra UI de fallback
 */

import { Component } from 'react'
import PropTypes from 'prop-types'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import { Button } from '@/shared/components/ui'

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    this.setState({
      error,
      errorInfo,
    })
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-error-100 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="text-error-600" size={32} />
              </div>

              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                ¡Oops! Algo salió mal
              </h1>

              <p className="text-gray-600 mb-6">
                Ha ocurrido un error inesperado en la aplicación. Por favor, intenta recargar la página.
              </p>

              {import.meta.env.DEV && this.state.error && (
                <details className="w-full mb-6 text-left">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 mb-2">
                    Detalles del error (solo en desarrollo)
                  </summary>
                  <div className="bg-gray-50 rounded p-3 text-xs text-gray-600 overflow-auto max-h-40">
                    <p className="font-semibold mb-1">{this.state.error.toString()}</p>
                    <pre className="whitespace-pre-wrap">
                      {this.state.errorInfo?.componentStack}
                    </pre>
                  </div>
                </details>
              )}

              <div className="flex gap-3 w-full">
                <Button
                  onClick={this.handleReset}
                  variant="outline"
                  fullWidth
                  icon={RefreshCw}
                >
                  Intentar de nuevo
                </Button>
                <Button
                  onClick={() => window.location.href = '/'}
                  variant="primary"
                  fullWidth
                >
                  Ir al inicio
                </Button>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ErrorBoundary