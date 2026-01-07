 
/**
 * Página de Login
 * Diseño moderno con carousel de imágenes y formulario lateral
 */

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useAuth } from '@/core/hooks'
import { LoginForm } from '@/features/auth/components'
import { ROUTES } from '@/config/routes.config'

// Imágenes del carousel
const carouselImages = [
  {
    url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2f/68/90/0d/las-mejores-mesas-y-maquinas.jpg?w=1200&h=-1&s=1',
    title: 'Sistema de pedidos',
    description: 'Gestión eficiente y control total de tus operaciones.',
  },
  {
    url: 'https://media-cdn.tripadvisor.com/media/photo-s/13/07/6b/a9/majestoso.jpg',
    title: 'Administración simple',
    description: 'Todo lo que necesitas en un solo lugar.',
  },
  {
    url: 'https://casinopeep.com/wp-content/uploads/sites/3/2020/06/atlantic.jpg',
    title: 'Seguridad garantizada',
    description: 'Tus datos protegidos con los más altos estándares.',
  },
]

export const LoginPage = () => {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [currentSlide, setCurrentSlide] = useState(0)

  // Redireccionar si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.DEFAULT_PRIVATE, { replace: true })
    }
  }, [isAuthenticated, navigate])

  // Auto-play del carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  return (
    <div className="min-h-screen flex">
      {/* Lado izquierdo - Carousel */}
      <div className="hidden lg:flex lg:w-[55%] relative bg-gray-900 overflow-hidden">
        {/* Imágenes del carousel */}
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </div>
        ))}

        {/* Contenido del slide */}
        <div className="absolute bottom-0 left-0 right-0 p-12 text-white z-10">
          <div className="max-w-2xl">
            <div className="mb-6 inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg">
              <p className="text-sm font-medium">Bienvenido al nuevo</p>
            </div>
            <h2 className="text-4xl font-bold mb-4">
              {carouselImages[currentSlide].title}
            </h2>
            <p className="text-lg text-gray-200 leading-relaxed">
              {carouselImages[currentSlide].description}
            </p>
          </div>
        </div>

        {/* Controles del carousel */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all z-10"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all z-10"
        >
          <ChevronRight size={24} />
        </button>

        {/* Indicadores */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide
                  ? 'w-8 bg-white'
                  : 'w-2 bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Lado derecho - Formulario */}
      <div className="w-full lg:w-[45%] flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Logo y título */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center mb-6">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3588/3588592.png"
                alt="Logo"
                className="w-20 h-20"
              />
            </div>
            <div className="mb-6">
              <h1 className="text-sm font-bold text-gray-700 tracking-wide mb-1">
                GESTIÓN
              </h1>
              <h2 className="text-sm font-bold text-gray-700 tracking-wide">
                DE PEDIDOS
              </h2>
            </div>
          </div>

          {/* Card del formulario */}
          <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Iniciar Sesión
            </h3>

            {/* Formulario */}
            <LoginForm />
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              © 2025 Sistema de Pedidos
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
 