import { useState, useEffect, useRef } from 'react'
import { Search, X, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/config/routes.config'

export const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)
  const navigate = useNavigate()

  // Auto-focus al abrir
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [isOpen])

  // Cerrar con ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      // Navegar a la página de pedidos con el query
      // Nota: Necesitarás ajustar PedidosPage para leer el query param si quieres deep linking,
      // o simplemente usar esto como navegación rápida.
      navigate(`${ROUTES.PRIVATE.PEDIDOS.path}?q=${query}`) 
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] px-4">
      {/* Backdrop con blur */}
      <div 
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <form onSubmit={handleSearch} className="relative flex items-center border-b border-gray-200 dark:border-gray-700">
          <Search className="absolute left-4 w-6 h-6 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            className="w-full h-16 pl-14 pr-12 bg-transparent text-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"
            placeholder="Buscar pedidos, clientes o acciones..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-4 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          ) : (
            <div className="absolute right-4 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs text-gray-500 font-mono">
              ESC
            </div>
          )}
        </form>

        {/* Resultados Sugeridos (Mock visual) */}
        <div className="p-2">
          <div className="text-xs font-semibold text-gray-500 px-3 py-2">ACCIONES RÁPIDAS</div>
          <button 
            onClick={() => { navigate(ROUTES.PRIVATE.PEDIDOS_CREAR.path); onClose(); }}
            className="w-full flex items-center gap-3 px-3 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-left transition-colors group"
          >
            <div className="p-2 bg-primary-50 text-primary-600 rounded-md group-hover:bg-white">
              <ArrowRight size={18} />
            </div>
            <span className="text-gray-700 dark:text-gray-200">Crear Nuevo Pedido</span>
          </button>
        </div>
        
        {/* Footer */}
        <div className="bg-gray-50 dark:bg-gray-900 px-4 py-3 text-xs text-center text-gray-500 border-t border-gray-100 dark:border-gray-700">
          Presiona <kbd className="font-sans font-semibold">Enter</kbd> para buscar
        </div>
      </div>
    </div>
  )
}