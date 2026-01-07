# 🚀 Sistema de Gestión de Pedidos

Aplicación Fullstack para gestión de pedidos con React y .NET

## 📋 Características

- ✅ Autenticación con JWT
- ✅ CRUD completo de Pedidos
- ✅ Interfaz responsive con Tailwind CSS
- ✅ Arquitectura limpia y escalable
- ✅ Manejo de estado con React Query

## 🛠️ Tecnologías

- **Frontend**: React 18 + Vite
- **Estilos**: Tailwind CSS
- **Routing**: React Router DOM
- **Estado**: React Query + Context API
- **Formularios**: React Hook Form + Yup
- **HTTP**: Axios
- **Iconos**: Lucide React

## 📦 Instalación
```bash
# Instalar dependencias
npm install

# Iniciar desarrollo
npm run dev

# Build para producción
npm run build
```

## 🌐 Variables de Entorno

Crear archivo `.env.development` con:
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=Sistema de Pedidos
VITE_TOKEN_KEY=auth_token
```

## 📂 Estructura del Proyecto
```
src/
├── assets/          # Recursos estáticos
├── config/          # Configuraciones
├── core/            # Lógica de negocio
│   ├── models/      # Modelos de datos
│   ├── services/    # Servicios API
│   └── hooks/       # Custom hooks
├── features/        # Módulos por funcionalidad
│   ├── auth/        # Autenticación
│   └── pedidos/     # Gestión de pedidos
├── shared/          # Componentes compartidos
│   ├── components/  # UI, Layout, Common
│   ├── utils/       # Utilidades
│   └── contexts/    # Context API
└── routes/          # Configuración de rutas
```

## 🎯 Pantallas Implementadas

1. **Login** - Autenticación de usuarios
2. **Listado de Pedidos** - Vista de todos los pedidos
3. **Crear Pedido** - Formulario de creación
4. **Editar Pedido** - Formulario de edición
5. **Eliminar Pedido** - Modal de confirmación
6. **Menú de Navegación** - Navegación principal