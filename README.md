# React Native Clean Feature MVVM Architecture Template

Este repositorio proporciona una plantilla base para desarrollar aplicaciones en React Native, combinando **Feature-Based Architecture**, **Clean Architecture** y el patrón **MVVM**. Diseñado para el bare workflow, incluye soporte para internacionalización, accesibilidad, logging, telemetría y pruebas automatizadas.

---

## 📖 Tabla de Contenidos

- [Visión General](#visión-general)
- [Arquitectura del Proyecto](#arquitectura-del-proyecto)
  - [Feature-Based Architecture](#feature-based-architecture)
  - [Clean Architecture](#clean-architecture)
  - [MVVM (Model-View-ViewModel)](#mvvm-model-view-viewmodel)
- [Principios Claves](#principios-claves)
- [Capas y Patrones de Diseño](#capas-y-patrones-de-diseño)
  - [Capa de Dominio](#capa-de-dominio)
  - [Capa de Infraestructura](#capa-de-infraestructura)
  - [Capa de Presentación](#capa-de-presentación)
  - [Capa Central](#capa-central)
- [Seguridad, Logs, Middleware y Configuración](#seguridad-logs-middleware-y-configuración)
- [Estructura de Directorios](#estructura-de-directorios)
- [Uso](#uso)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)

---

## 👀 Visión General

Este template está diseñado para:
- Garantizar un **código limpio, modular y escalable**.
- Aplicar las mejores prácticas de desarrollo.
- Proporcionar una estructura organizada que facilite la integración de nuevas funcionalidades.
- Servir como punto de partida para proyectos en React Native (bare workflow).

---

## 🏗 Arquitectura del Proyecto

### Feature-Based Architecture
Organiza el código por funcionalidades, agrupando lógica de negocio, UI y servicios relacionados en módulos independientes (por ejemplo, *auth*, *levels*, *settings*). Esto mejora la modularidad y facilita el mantenimiento.

### Clean Architecture
Separa la aplicación en capas bien definidas (**dominio**, **infraestructura**, **presentación**, **core**) para reducir acoplamientos innecesarios, mejorar la testabilidad y facilitar la escalabilidad.

### MVVM (Model-View-ViewModel)
Dentro de la capa de presentación, se utiliza MVVM para desacoplar la UI de la lógica de negocio y gestión del estado, lo que facilita pruebas y mantenimiento.

---

## 🔥 Principios Claves

1. **Separación de responsabilidades:** Cada capa y módulo cumple una función específica.
2. **Modularidad:** Facilita la extensión sin afectar otras partes del sistema.
3. **Escalabilidad:** Soporta el crecimiento de la aplicación sin comprometer su rendimiento.
4. **Reutilización de código:** Uso de patrones y componentes reutilizables para minimizar redundancias.
5. **Compatibilidad con Expo:** Mantiene la convención de Expo sin perder la flexibilidad del bare workflow.

---

## 🔄 Capas y Patrones de Diseño

### Capa de Dominio (`src/domain/`)
Contiene la lógica de negocio pura, independiente de frameworks.
- **Entidades (`entities/`)**: Modelos de negocio (ej. `User`, `Level`).
- **Casos de Uso (`useCases/`)**: Acciones específicas de negocio (ej. `GetLevelsUseCase.js`).

*Patrones aplicados:* Use Case Pattern, Domain-Driven Design (DDD).

### Capa de Infraestructura (`src/infrastructure/`)
Implementa la lógica técnica, como acceso a bases de datos, APIs y seguridad.
- **Base de Datos (`database/`)**: Configuración y persistencia de datos.
- **Monitoreo (`monitoring/`)**: Logs, sincronización y detección de errores.
- **Seguridad (`security/`)**: Autenticación, autorización y cifrado.
- **Telemetría (`telemetry/`)**: Monitoreo de rendimiento.

*Patrones aplicados:* Repository Pattern, Proxy/Adapter.

### Capa de Presentación (`src/presentation/`)
Gestiona la UI, navegación y estado.
- **Features (`features/`)**: Módulos organizados por funcionalidad.
- **Pantallas (`screens/`)**: Vistas principales de la app.
- **Componentes (`components/`)**: Elementos UI reutilizables.
- **Hooks (`hooks/`)**: Custom hooks para lógica reactiva.
- **Middleware (`middlewares/`)**: Interceptores de acciones UI.
- **Store (`store/`)**: Gestión global del estado (Redux, Context, etc.).

*Patrones aplicados:* Model-View-Presenter (MVP), Observer Pattern.

### Capa Central (`src/core/`)
Contiene configuraciones globales y utilidades.
- **Configuraciones (`config/`)**: Variables de entorno y setup.
- **Adaptadores (`adapters/`)**: Integraciones con servicios externos.
- **Logging (`logging/`)**: Sistema centralizado de logs.
- **Telemetría (`telemetry/`)**: Métricas y monitoreo global.
- **Utilidades (`utils/`)**: Funciones helper y helpers transversales.
- **Dependency Injection (`dependencyContainer.js`)**: Centraliza la inyección de dependencias.

---

## 🔒 Seguridad, Logs, Middleware y Configuración

### Autenticación y Seguridad
- **Secure Storage:** Almacena credenciales de forma segura.
- **Middleware de Autenticación:** Controla el acceso a recursos.
- **Cifrado y Firmas Digitales:** Protege la integridad de los datos.

### Logs y Monitoreo
- **Logger Centralizado:** Registra eventos y errores.
- **Monitoreo de Estado:** Detecta fallos y genera alertas.
- **Persistencia de Logs:** Facilita auditorías y seguimiento de eventos.

### Middleware y Telemetría
- **Middleware de Eventos:** Captura interacciones del usuario.
- **OpenTelemetry:** Permite el monitoreo del rendimiento y la UX.

### Configuración Global
- **Variables de Entorno:** Configuración adaptable a distintos entornos.
- **Flags de Características:** Permiten activar/desactivar funcionalidades sin recompilación.

---

## 📂 Estructura de Directorios

```bash
📂 .
├── 📂 assets/                        # Recursos estáticos (imágenes, fuentes, etc.)
│   ├── 📂 images/                    # Imágenes como PNG, JPG, SVG, GIF, etc.
│   │   └── 📄 icon.svg               # Ejemplo de imagen SVG (dummy eliminar)
│   ├── 📂 fonts/                     # Fuentes personalizadas o webfonts
│   │   ├── 📄 main.ttf               # Ejemplo de fuente TTF (dummy eliminar)
│   ├── 📂 styles/                    # Archivos CSS, SASS, LESS, o preprocesadores de CSS
│   │   └── 📄 main.css               # Estilos generales del proyecto (dummy eliminar)
│   ├── 📂 scripts/                   # Archivos JavaScript (funciones globales, etc.)
│   │   └── 📄 main.js                # Funciones JS generales
├── 📂 src/                          # Código fuente principal
│   ├── 📂 accessibility/            # Configuración y utilidades para mejorar la accesibilidad (opcional)
│   │   ├── 📄 AccessibilityProvider.js  # Componente Provider con reglas de accesibilidad global
│   │   └── 📄 index.js              # Archivo índice
│   ├── 📂 ai/                       # Módulos de inteligencia artificial (opcional)
│   │   └── 📄 index.js              # Inicialización o servicios de IA
│   ├── 📂 analytics/                # Telemetría y tracking de eventos
│   │   └── 📄 index.js              # Configuración de tracking de eventos (recomendado)
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
│   │   ├── 📂 telemetry/            # Monitoreo de rendimiento y métricas globales (recomendado)
│   │   │   └── 📄 index.js
│   │   ├── 📂 utils/                # Funciones helper y utilidades generales
│   │   │   └── 📄 index.js
│   │   └── 📄 dependencyContainer.js# Inyección de dependencias para desacoplar módulos
│   ├── 📂 docs/                     # Documentación técnica y de arquitectura
│   │   └── 📄 index.md
│   ├── 📂 domain/                   # Lógica de negocio pura (dominio)
│   │   ├── 📂 entities/             # Modelos de negocio (ej.: Level, Logs, User)
│   │   │   ├── 📄 Level.js
│   │   │   ├── 📄 Logs.js
│   │   │   ├── 📄 User.js
│   │   │   └── 📄 index.js
│   │   └── 📂 useCases/             # Casos de uso que encapsulan la lógica de negocio
│   │       ├── 📄 SaveLogUseCase.js
│   │       └── 📄 index.js
│   ├── 📂 infrastructure/           # Persistencia, APIs, seguridad, etc.
│   │   ├── 📂 database/             # Configuración e inicialización de la base de datos
│   │   │   ├── 📄 db.js
│   │   │   ├── 📄 index.js
│   │   │   ├── 📂 models/           # Modelos persistentes (ORM, esquemas, etc.)
│   │   │   │   ├── 📄 Logs.js
│   │   │   │   ├── 📄 User.js
│   │   │   │   └── 📄 index.js
│   │   │   ├── 📂 repositories/     # Repositorios para abstraer el acceso a datos
│   │   │   │   ├── 📄 LogsRepository.js
│   │   │   │   ├── 📄 UserRepository.js
│   │   │   │   └── 📄 index.js
│   │   │   └── 📄 schema.js         # Definición de esquemas (si aplica)
│   │   ├── 📂 monitoring/           # Gestión y sincronización de estados (recomendado)
│   │   │   └── 📄 SyncStateManager.js
│   │   ├── 📂 security/             # Autenticación, autorización y cifrado
│   │   │   └── 📂 repositories/
│   │   │       └── 📄 secureStorage.js
│   │   ├── 📂 telemetry/            # Telemetría específica para infraestructura (recomendado)
│   │   │   └── 📄 DatabaseTelemetry.js
│   │   └── 📂 utils/                # Utilidades para infraestructura
│   │       └── 📄 index.js
│   ├── 📂 i18n/                     # Configuración de internacionalización(opcional)
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
├── 📂 shared/                   # Elementos reutilizables en varias capas
│   ├── 📂 components/           # Componentes UI compartidos (botones, modals, etc.)
│   │   └── 📄 Button.js         # Ejemplo de componente compartido (Button)
│   ├── 📂 hooks/                # Hooks compartidos
│   │   └── 📄 useCustomHook.js  # Ejemplo de hook compartido
│   ├── 📂 middlewares/          # Middlewares reutilizables
│   │   └── 📄 authMiddleware.js # Ejemplo de middleware de autenticación
│   ├── 📂 themes/               # Temas y estilos globales, con pautas de accesibilidad
│   │   └── 📄 lightTheme.js     # Ejemplo de tema claro
│   ├── 📂 utils/                # Utilidades transversales
│   │   └── 📄 formatDate.js     # Ejemplo de utilidad para formatear fechas
│   └── 📂 validators/           # Validadores de formularios o datos
│       └── 📄 emailValidator.js # Ejemplo de validador de emails
│   └── 📂 tests/                    # Pruebas automatizadas (unitarias, integración, e2e)
│       ├── 📂 e2e/                 # Pruebas end-to-end
│       │   └── 📄 example.e2e.js    # Ejemplo de prueba end-to-end
│       ├── 📂 integration/         # Pruebas de integración
│       │   └── 📄 example.integration.js # Ejemplo de prueba de integración
│       └── 📂 unit/                # Pruebas unitarias
│           └── 📄 example.unit.js   # Ejemplo de prueba unitaria
├── 📄 .gitignore
├── 📄 env.example                   # Ejemplo de variables de 
└── 📄 README.md
```

---
## 🚀 Uso

Tienes dos opciones para usar este template:

### Opción 1: Clonando el repositorio

1. Clona el repositorio y elimina la carpeta `.git` para desvincularlo del origen:
   ```bash
   git clone https://github.com/jadruiz/rn-clean-feature-mvvm-template.git
   cd rn-clean-feature-mvvm-template
   rm -rf .git
   ```
2. Inicializa un nuevo repositorio si lo deseas:
   ```bash
   git init
   git add .
   git commit -m "Inicializando proyecto con el template"
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```
4. Ejecuta el proyecto:
   ```bash
   npx react-native run-android  # Para Android
   npx react-native run-ios      # Para iOS
   ```

### Opción 2: Usando `degit`

1. Usa `degit` para copiar el repositorio sin historial de Git:
   ```bash
   npx degit jadruiz/rn-clean-feature-mvvm-template mi-nuevo-proyecto
   cd mi-nuevo-proyecto
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Ejecuta el proyecto:
   ```bash
   npx react-native run-android  # Para Android
   npx react-native run-ios      # Para iOS
   ```

---

## 🤝 Contribuciones

## 1️⃣ Ramas principales  
Estas son las ramas centrales del proyecto:  

- **`main`** (o `master`): Rama estable y lista para producción. Solo se fusionan (`merge`) cambios bien probados.  
- **`develop`**: Rama de integración donde se combinan nuevas funcionalidades antes de ir a producción.  

## 2️⃣ Ramas de trabajo  
Para mantener el código organizado, usa ramas específicas para distintas tareas:  

- **`feature/nombre-feature`**: Para nuevas funcionalidades (ej. `feature/menu-deslizante`).  
- **`bugfix/nombre-bug`**: Para corregir errores identificados en desarrollo.  
- **`hotfix/nombre-hotfix`**: Para solucionar errores críticos en producción.  

## 3️⃣ Ramas específicas 

- **`release/nombre-version`**: Para preparar versiones antes de subirlas a la tienda (`release/1.0.0`).  
- **`build/android` y `build/ios`** *(opcional)*: Si manejas compilaciones específicas para cada plataforma.  

## 🔄 Flujo de trabajo recomendado  
1. **Crear una rama `feature/nueva-feature` desde `develop`**  
2. **Desarrollar y probar la funcionalidad**  
3. **Merge a `develop` con PR (Pull Request)**  
4. **Cuando se junten varias features en `develop`, crear una `release/x.x.x`**  
5. **Testear y fusionar `release/x.x.x` en `main` cuando esté lista**  
6. **Si hay un bug en producción, usar `hotfix/nombre-hotfix` desde `main`**  

Este flujo ayuda a mantener el proyecto limpio, organizado y listo para producción. 🚀🔥 

## Convenciones de Commits en Git

### Formato de los Mensajes
Los mensajes de commit deben seguir el siguiente formato:

```plaintext
<tipo>(<área opcional>): <mensaje breve>

[Descripción opcional en detalle]

[Referencias a issues o tickets]
```

### Tipos de Commits
| Tipo     | Descripción |
|----------|------------|
| `feat`   | Agregar una nueva funcionalidad |
| `fix`    | Corregir un error |
| `docs`   | Cambios en la documentación |
| `style`  | Cambios de formato o estilo (sin afectar el código) |
| `refactor` | Reestructuración del código sin cambios funcionales |
| `perf`   | Mejoras en el rendimiento |
| `test`   | Agregar o modificar pruebas |
| `chore`  | Tareas de mantenimiento sin afectar la lógica del código |
| `build`  | Cambios en la configuración de compilación o dependencias |
| `ci`     | Cambios en configuración de integración continua |

### Ejemplos de Commits
```plaintext
feat(menu): implementar menú deslizante básico

fix(auth): corregir error de autenticación en login

docs(readme): actualizar guía de instalación
```

### Buenas Prácticas
- Usa un mensaje claro y conciso.
- Escribe en infinitivo y en inglés si el equipo lo requiere.
- Relaciona los commits con tickets de trabajo si es necesario.
- Evita commits genéricos como `fix bug` o `update code`.

---

## 📜 Licencia
Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.
