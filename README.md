# React Native Clean Feature MVVM Architecture Template

Este repositorio provee un template base para desarrollar aplicaciones en React Native, integrando **Feature-Based Architecture**, **Clean Architecture** y el patrón **MVVM**. Está diseñado para el bare workflow y viene preparado con soporte para internacionalización, accesibilidad, logging, telemetría y pruebas automatizadas.

---

## 📖 Tabla de Contenidos

- [Visión General](#visión-general)
- [Arquitectura del Proyecto](#arquitectura-del-proyecto)
  - [Feature-Based Architecture](#feature-based-architecture)
  - [Clean Architecture](#clean-architecture)
  - [MVVM (Model-View-ViewModel)](#mvvm-model-view-viewmodel)
- [Principios Claves](#principios-claves)
- [Interacción entre Capas y Patrones de Diseño](#interacción-entre-capas-y-patrones-de-diseño)
  - [1. Capa de Dominio](#1-capa-de-dominio)
  - [2. Capa de Infraestructura](#2-capa-de-infraestructura)
  - [3. Capa de Presentación](#3-capa-de-presentación)
  - [4. Capa Central](#4-capa-central)
- [Gestión de Seguridad, Logs, Middlewares y Configuraciones](#gestión-de-seguridad-logs-middlewares-y-configuraciones)
- [Estructura de Directorios](#estructura-de-directorios)
- [Uso](#uso)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)

---

## 👀 Visión General

Este template está orientado a:
- Mantener un **código ordenado, escalable y mantenible**.
- Aplicar las mejores prácticas de ingeniería de software.
- Proveer una estructura modular que facilite el desarrollo y la integración de nuevas funcionalidades.
- Servir como punto de partida para proyectos React Native (bare workflow).

---

## 🏗 Arquitectura del Proyecto

### Feature-Based Architecture
Agrupa todo lo relacionado con una funcionalidad (por ejemplo, *auth*, *levels*, *settings*) en un solo módulo, facilitando la modularidad y el mantenimiento.

### Clean Architecture
Separa la aplicación en capas bien definidas (dominio, infraestructura, presentación, core) para evitar dependencias circulares y promover la testabilidad y flexibilidad.

### MVVM (Model-View-ViewModel)
Dentro de la capa de presentación, se utiliza MVVM para separar la vista (UI) de la lógica de estado y eventos, manteniendo los componentes UI ligeros y fáciles de probar.

---

## 🔥 Principios Claves

1. **Separación de responsabilidades:** Cada capa y módulo tiene una función específica.
2. **Modularidad:** Facilita la integración de nuevas funcionalidades sin romper otras partes.
3. **Escalabilidad:** La arquitectura permite que la aplicación crezca en complejidad y tamaño.
4. **Reutilización de código:** Uso de patrones de diseño y componentes reutilizables para evitar duplicaciones.
5. **Compatibilidad con React Native (Expo):** Se mantiene la convención de Expo, conservando los archivos principales en la raíz del proyecto.

---

## 🔄 Interacción entre Capas y Patrones de Diseño

### 1. Capa de Dominio (`src/domain/`)
Define la **lógica de negocio** y es independiente de frameworks.

- **Entidades** (`src/domain/entities/`):  
  📄 Modelos de negocio (por ejemplo, `User`, `Level`).
- **Casos de Uso** (`src/domain/useCases/`):  
  📄 Acciones específicas de negocio (por ejemplo, `GetLevelsUseCase.js`).

*Patrones aplicados:* Use Case Pattern, Domain-Driven Design (DDD).

### 2. Capa de Infraestructura (`src/infrastructure/`)
Implementa la lógica técnica como acceso a bases de datos, APIs, seguridad, etc.

- **Base de Datos** (`src/infrastructure/database/`):  
  📄 Configuración, modelos persistentes, repositorios y schemas.
- **Monitoreo** (`src/infrastructure/monitoring/`):  
  📄 Gestión de logs, sincronización y detección de errores.
- **Seguridad** (`src/infrastructure/security/`):  
  📄 Autenticación, autorización y cifrado.
- **Telemetría** (`src/infrastructure/telemetry/`):  
  📄 Monitoreo de rendimiento y métricas.

*Patrones aplicados:* Repository Pattern, Proxy/Adapter.

### 3. Capa de Presentación (`src/presentation/`)
Encargada de la UI, navegación y gestión de estado.

- **Features** (`src/presentation/features/`):  
  📂 Módulos por funcionalidad (ej. *auth*, *levels*, *settings*).
- **Pantallas** (`src/presentation/screens/`):  
  📂 Vistas de la aplicación (ej. Home, Profile).
- **Componentes** (`src/presentation/components/`):  
  📄 Elementos UI reutilizables.
- **Hooks** (`src/presentation/hooks/`):  
  📄 Lógica reactiva y ViewModels (custom hooks).
- **Middlewares** (`src/presentation/middlewares/`):  
  📄 Interceptores para el flujo de acciones en la UI.
- **Store** (`src/presentation/store/`):  
  📄 Gestión global del estado (Redux, Context, etc.).

*Patrones aplicados:* Model-View-Presenter (MVP), Observer Pattern.

### 4. Capa Central (`src/core/`)
Contiene configuraciones globales y utilidades transversales.

- **Configuraciones** (`src/core/config/`):  
  📄 Variables de entorno y setup de la aplicación.
- **Adaptadores** (`src/core/adapters/`):  
  📄 Integraciones con servicios externos.
- **Logging** (`src/core/logging/`):  
  📄 Sistema centralizado de logs y manejo de errores.
- **Telemetría** (`src/core/telemetry/`):  
  📄 Métricas y monitoreo global.
- **Utilidades** (`src/core/utils/`):  
  📄 Funciones helper y utilidades generales.
- **Dependency Injection:**  
  📄 `dependencyContainer.js` centraliza la inyección de dependencias.

---

## 🔒 Gestión de Seguridad, Logs, Middlewares y Configuraciones

### Autenticación y Seguridad
- **Secure Storage:** Almacena tokens y credenciales sensibles.
- **Middleware de Autenticación:** Controla el acceso a recursos.
- **Cifrado y Firmas Digitales:** Aseguran la integridad y confidencialidad de los datos.

### Manejo de Logs y Errores
- **Logger Centralizado:** Registra eventos, errores y excepciones.
- **Monitoreo de Estado:** Detecta fallos y genera alertas.
- **Persistencia de Logs:** Almacena eventos relevantes para auditoría.

### Middleware y Telemetría
- **Middleware de Eventos:** Captura acciones de usuario (clics, navegación, etc.).
- **OpenTelemetry:** Integración para monitorear el rendimiento y la experiencia del usuario.

### Configuraciones Globales
- **Variables de Entorno:** Facilitan la configuración por entorno (desarrollo, producción).
- **Configuraciones Dinámicas:** Permiten activar/desactivar funcionalidades sin recompilar.

---

## 📂 Estructura de Directorios

```bash
📂 .
├── 📂 android/                      # Proyecto nativo Android (generado automáticamente)
├── 📂 ios/                          # Proyecto nativo iOS (generado automáticamente)
├── 📂 assets/                       # Recursos estáticos (imágenes, fuentes, etc.)
│   └── 📄 index.js                  # Archivo índice para incluir la carpeta en Git
├── 📂 src/                          # Código fuente principal
│   ├── 📂 accessibility/            # Configuración y utilidades para mejorar la accesibilidad
│   │   ├── 📄 AccessibilityProvider.js  # Componente Provider con reglas de accesibilidad global
│   │   └── 📄 index.js              # Archivo índice
│   ├── 📂 ai/                       # Módulos de inteligencia artificial (opcional)
│   │   └── 📄 index.js              # Inicialización o servicios de IA
│   ├── 📂 analytics/                # Telemetría y tracking de eventos
│   │   └── 📄 index.js              # Configuración de tracking de eventos
│   ├── 📂 core/                     # Configuraciones y utilidades globales
│   │   ├── 📂 config/               # Variables de entorno y configuraciones generales
│   │   │   ├── 📄 AppConfig.js
│   │   │   ├── 📄 ConfigAdapter.js
│   │   │   ├── 📄 ConfigFactory.js
│   │   │   └── 📄 index.js          # Archivo índice para la carpeta config
│   │   ├── 📂 adapters/             # Adaptadores para servicios externos
│   │   │   └── 📄 DatabaseProxy.js
│   │   ├── 📂 logging/              # Sistema centralizado de logs
│   │   │   └── 📄 index.js
│   │   ├── 📂 telemetry/            # Monitoreo de rendimiento y métricas globales
│   │   │   └── 📄 index.js
│   │   ├── 📂 utils/                # Funciones helper y utilidades generales
│   │   │   └── 📄 index.js
│   │   └── 📄 dependencyContainer.js# Inyección de dependencias para desacoplar módulos
│   ├── 📂 docs/                     # Documentación técnica y de arquitectura
│   │   └── 📄 README.md
│   ├── 📂 domain/                   # Lógica de negocio pura (dominio)
│   │   ├── 📂 entities/             # Modelos de negocio (ej.: Level, Logs, User)
│   │   │   ├── 📄 Level.js
│   │   │   ├── 📄 Logs.js
│   │   │   ├── 📄 User.js
│   │   │   └── 📄 index.js
│   │   └── 📂 useCases/             # Casos de uso que encapsulan la lógica de negocio
│   │       ├── 📄 GetLevelsUseCase.js
│   │       ├── 📄 SaveLogUseCase.js
│   │       ├── 📄 SyncLevelsUseCase.js
│   │       └── 📄 index.js
│   ├── 📂 infrastructure/           # Persistencia, APIs, seguridad, etc.
│   │   ├── 📂 database/             # Configuración e inicialización de la base de datos
│   │   │   ├── 📄 db.js
│   │   │   ├── 📄 index.js
│   │   │   ├── 📂 models/           # Modelos persistentes (ORM, esquemas, etc.)
│   │   │   │   ├── 📄 Level.js
│   │   │   │   ├── 📄 Logs.js
│   │   │   │   ├── 📄 User.js
│   │   │   │   └── 📄 index.js
│   │   │   ├── 📂 repositories/     # Repositorios para abstraer el acceso a datos
│   │   │   │   ├── 📄 LogsRepository.js
│   │   │   │   ├── 📄 UserRepository.js
│   │   │   │   └── 📄 index.js
│   │   │   └── 📄 schema.js         # Definición de esquemas (si aplica)
│   │   ├── 📂 monitoring/           # Gestión y sincronización de estados
│   │   │   └── 📄 SyncStateManager.js
│   │   ├── 📂 security/             # Autenticación, autorización y cifrado
│   │   │   └── 📂 repositories/
│   │   │       └── 📄 secureStorage.js
│   │   ├── 📂 telemetry/            # Telemetría específica para infraestructura
│   │   │   └── 📄 DatabaseTelemetry.js
│   │   └── 📂 utils/                # Utilidades para infraestructura
│   │       └── 📄 index.js
│   ├── 📂 i18n/                     # Configuración de internacionalización
│   │   ├── 📄 en.json               # Traducciones en inglés
│   │   ├── 📄 es.json               # Traducciones en español
│   │   └── 📄 index.js              # Configuración de i18n (ej. i18next)
│   ├── 📂 presentation/             # Capa de presentación: UI, navegación y gestión de estado
│   │   ├── 📂 store/                # Gestión de estado global (Redux, Context, etc.)
│   │   │   └── 📄 index.js
│   │   ├── 📂 features/             # Funcionalidades agrupadas por feature
│   │   │   ├── 📂 auth/             # Ejemplo: Autenticación
│   │   │   │   └── 📄 index.js
│   │   │   ├── 📂 levels/           # Ejemplo: Niveles o gamificación
│   │   │   │   └── 📄 index.js
│   │   │   ├── 📂 settings/         # Ejemplo: Ajustes de la aplicación
│   │   │   │   └── 📄 index.js
│   │   │   └── 📂 sublevels/        # Ejemplo: Funcionalidades secundarias
│   │   │       └── 📄 index.js
│   │   ├── 📂 screens/              # Pantallas o vistas de la aplicación
│   │   │   ├── 📂 navigation/       # Configuración de navegación (React Navigation)
│   │   │   │   └── 📄 MainNavigator.js
│   │   │   ├── 📂 home/             # Pantalla de inicio
│   │   │   │   └── 📄 index.js
│   │   │   ├── 📂 profile/          # Pantalla de perfil de usuario
│   │   │   │   └── 📄 index.js
│   │   │   ├── 📂 settings/         # Pantalla de ajustes
│   │   │   │   └── 📄 index.js
│   │   │   └── 📂 layouts/          # Layouts reutilizables (header, footer, contenedores)
│   │   │       └── 📄 index.js
│   │   ├── 📂 components/           # Componentes UI específicos de la presentación
│   │   │   └── 📄 index.js
│   │   ├── 📂 hooks/                # Hooks personalizados para la UI
│   │   │   └── 📄 index.js
│   │   └── 📂 middlewares/          # Middlewares para el flujo de la UI
│   │       └── 📄 index.js
│   ├── 📂 shared/                   # Elementos reutilizables en varias capas
│   │   ├── 📂 components/           # Componentes UI compartidos (botones, modals, etc.)
│   │   ├── 📂 hooks/                # Hooks compartidos
│   │   ├── 📂 middlewares/          # Middlewares reutilizables
│   │   ├── 📂 themes/               # Temas y estilos globales, con pautas de accesibilidad
│   │   ├── 📂 utils/                # Utilidades transversales
│   │   └── 📂 validators/           # Validadores de formularios o datos
│   └── 📂 tests/                    # Pruebas automatizadas (unitarias, integración, e2e)
│       ├── 📂 e2e/                 # Pruebas end-to-end
│       ├── 📂 integration/         # Pruebas de integración
│       └── 📂 unit/                # Pruebas unitarias
├── 📄 .gitignore
├── 📄 App.js                        # Punto de entrada principal de Expo
├── 📄 app.json                      # Configuración de la app (Expo)
├── 📄 babel.config.js
├── 📄 env.example                   # Ejemplo de variables de entorno
├── 📄 index.js
├── 📄 package.json
└── 📄 README.md
