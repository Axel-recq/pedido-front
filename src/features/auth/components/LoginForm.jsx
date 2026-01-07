/**
 * Componente LoginForm
 * Formulario de inicio de sesión  
 */

import { useState } from 'react'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { useLogin } from '@/features/auth/hooks'
import { Button, Input, Alert } from '@/shared/components/ui'

export const LoginForm = () => {
  const { login, isLoading, error, clearError } = useLogin()
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [captcha] = useState('qRukcW') // Simulación de captcha
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    captchaInput: '',
  })
  const [formErrors, setFormErrors] = useState({})

  /**
   * Maneja cambios en los inputs
   */
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Limpiar error del campo al escribir
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }

    // Limpiar error general
    if (error) {
      clearError()
    }
  }

  /**
   * Valida el formulario
   */
  const validateForm = () => {
    const errors = {}

    if (!formData.email.trim()) {
      errors.email = 'El email es requerido'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'El email no es válido'
    }

    if (!formData.password) {
      errors.password = 'La contraseña es requerida'
    }

    if (!formData.captchaInput.trim()) {
      errors.captchaInput = 'Ingresa el código captcha'
    } else if (formData.captchaInput !== captcha) {
      errors.captchaInput = 'El código captcha es incorrecto'
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  /**
   * Maneja el envío del formulario
   */
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validar formulario
    if (!validateForm()) {
      return
    }

    // Realizar login
    await login({
      email: formData.email,
      password: formData.password,
    })
  }

  /**
   * Toggle mostrar/ocultar contraseña
   */
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  /**
   * Recargar captcha
   */
  const reloadCaptcha = () => {
    setFormData((prev) => ({ ...prev, captchaInput: '' }))
    setFormErrors((prev) => ({ ...prev, captchaInput: '' }))
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Error general */}
        {error && (
          <Alert type="error" message={error} onClose={clearError} />
        )}

        {/* Campo Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Email
          </label>
          <div className="relative">
            <Mail
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="email"
              name="email"
              placeholder="usuario@ejemplo.com"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
              autoComplete="email"
              autoFocus
              className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all ${
                formErrors.email
                  ? 'border-red-500'
                  : 'border-gray-300'
              }`}
            />
          </div>
          {formErrors.email && (
            <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
          )}
        </div>

        {/* Campo Contraseña */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Contraseña
          </label>
          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
              autoComplete="current-password"
              className={`w-full pl-10 pr-12 py-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all ${
                formErrors.password
                  ? 'border-red-500'
                  : 'border-gray-300'
              }`}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {formErrors.password && (
            <p className="mt-1 text-sm text-red-600">{formErrors.password}</p>
          )}
        </div>

        {/* Recordar usuario */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="remember"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"
          />
          <label
            htmlFor="remember"
            className="ml-2 text-sm text-gray-700 cursor-pointer"
          >
            Recordar usuario
          </label>
        </div>

        {/* Captcha */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="flex-1 bg-gray-100 border border-gray-300 rounded-lg p-3 text-center">
              <span className="text-2xl font-bold tracking-wider select-none" style={{
                fontFamily: 'monospace',
                textDecoration: 'line-through',
                letterSpacing: '8px'
              }}>
                {captcha}
              </span>
            </div>
            <button
              type="button"
              onClick={reloadCaptcha}
              className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              title="Recargar Captcha"
            >
              🔄
            </button>
          </div>
          <input
            type="text"
            name="captchaInput"
            placeholder="Ingrese captcha"
            value={formData.captchaInput}
            onChange={handleChange}
            disabled={isLoading}
            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all ${
              formErrors.captchaInput
                ? 'border-red-500'
                : 'border-gray-300'
            }`}
          />
          {formErrors.captchaInput && (
            <p className="mt-1 text-sm text-red-600">{formErrors.captchaInput}</p>
          )}
        </div>

        {/* Botón de envío */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>

      {/* Demo credentials (solo para desarrollo) */}
      {import.meta.env.DEV && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs font-semibold text-blue-800 mb-2">
            🔧 Credenciales de prueba (DEV):
          </p>
          <div className="text-xs text-blue-700 space-y-1">
            <p>Email: <code className="bg-blue-100 px-2 py-0.5 rounded">user@example.com</code></p>
            <p>Password: <code className="bg-blue-100 px-2 py-0.5 rounded">123456</code></p>
            <p>Captcha: <code className="bg-blue-100 px-2 py-0.5 rounded">{captcha}</code></p>
          </div>
        </div>
      )}
    </div>
  )
}

export default LoginForm