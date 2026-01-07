# 📦 Sistema de Gestión de Pedidos (Frontend)

Solución Frontend para el Reto Técnico Fullstack Senior. Aplicación desarrollada con **React 18**, **Vite** y una arquitectura escalable basada en Features.

![Status](https://img.shields.io/badge/Status-Completed-success)
![React](https://img.shields.io/badge/React-18.2-blue)
![Vite](https://img.shields.io/badge/Vite-5.0-purple)

## 🚀 Características Principales

* **Arquitectura Modular:** Basada en *Vertical Slice Architecture* (Features) para alta cohesión y bajo acoplamiento.
* **Gestión de Estado Servidor:** Implementación robusta con **TanStack Query v5** (Caching, Optimistic Updates, Revalidación).
* **Seguridad:** Manejo de JWT, interceptores HTTP automáticos, protección de rutas y auto-logout por expiración.
* **UX/UI Moderna:**
    * Diseño Responsivo (Vista de Tabla en Desktop / Grid en Móvil).
    * Feedback inmediato (Toasts, Loaders, Modales).
    * Filtros en tiempo real con *Debouncing*.
* **Calidad de Código:**
    * Validaciones estrictas con Esquemas.
    * Manejo global de errores (Error Boundaries).
    * Componentes UI atómicos y reutilizables.

## 🛠️ Stack Tecnológico

* **Core:** React 18, React Router DOM 6.
* **Build Tool:** Vite.
* **Estado & API:** TanStack Query (React Query), Axios.
* **Formularios:** React Hook Form.
* **Estilos:** Tailwind CSS, Lucide React (Iconos).
* **Utilidades:** date-fns (o Intl nativo), clsx.

## ⚙️ Instalación y Ejecución

### Prerrequisitos
* Node.js (v18 o superior)
* NPM o Yarn
* Backend .NET corriendo (puerto 5000 por defecto)

### Pasos

1.  **Clonar el repositorio**
    ```bash
    git clone <url-del-repo>
    cd pedidos-app
    ```

2.  **Instalar dependencias**
    ```bash
    npm install
    ```

3.  **Configurar Variables de Entorno**
    Renombrar el archivo  `.env` 
    ```env
    VITE_API_BASE_URL=http://localhost:5000/api
    VITE_TOKEN_KEY=auth_token
    ```

4.  **Correr en Desarrollo**
    ```bash
    npm run dev
    ```
    La aplicación estará disponible en `http://localhost:5173` (o el puerto que asigne Vite).

## 🧪 Credenciales de Prueba

Si estás ejecutando el entorno de desarrollo (`npm run dev`), el login mostrará credenciales sugeridas:

* **Email:** `admin@admin.com`
* **Password:** `123456`

## 📂 Estructura del Proyecto

Para un detalle profundo de las decisiones de diseño, revisar el archivo [ARCHITECTURE.md](./ARCHITECTURE.md).

```text
src/
├── config/       # Configuraciones globales (Axios, QueryClient)
├── core/         # Lógica de negocio agnóstica (Auth, HTTP Service)
├── features/     # Módulos funcionales (Auth, Pedidos)
├── routes/       # Definición de rutas y Guards
├── shared/       # Componentes UI reutilizables y utilidades
└── assets/       # Estilos globales y recursos estáticos