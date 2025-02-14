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
├── 📂 assets/                           # Recursos estáticos
│   ├── 📂 fonts/                        # Fuentes personalizadas
│   │   └── 📄 main.ttf
│   ├── 📂 images/                       # Imágenes, íconos y SVGs
│   │   └── 📄 logo.png
│   ├── 📂 scripts/                      # Scripts JS globales (si aplica)
│   │   └── 📄 main.js
│   └── 📂 styles/                       # Estilos globales (CSS, SASS, etc.)
│       └── 📄 main.css
├── 📂 docs/                             # Documentación técnica y de arquitectura
│   └── 📄 index.md                      # Documentación principal
├── 📂 src/                              # Código fuente principal
│   ├── 📂 core/                         # Configuraciones y utilidades globales
│   │   ├── 📂 config/                   # Configuración, variables de entorno y constantes
│   │   │   ├── 📄 AppConfig.js
│   │   │   ├── 📄 ConfigAdapter.js
│   │   │   └── 📄 index.js
│   │   ├── 📂 adapters/                 # Adaptadores para servicios externos
│   │   │   ├── 📄 HttpAdapter.js        # Consumo de APIs
│   │   │   ├── 📄 DatabaseAdapter.js    # Abstracción de conexión a BD
│   │   │   📄 BaseAdapter.js         # Clase base para adaptadores
│   │   ├── 📂 di/                       # Dependency Injection container
│   │   │   └── 📄 dependencyContainer.js
│   │   ├── 📂 interfaces/               # Contratos e interfaces comunes
│   │   │   ├── 📄 ILogger.js            # Interfaz para logging
│   │   │   └── 📄 IRepository.js        # Interfaz base para repositorios
│   │   ├── 📂 logging/                  # Sistema centralizado de logs
│   │   │   └── 📄 Logger.js
│   │   ├── 📂 middleware/               # Middlewares globales (para peticiones, etc.)
│   │   │   └── 📄 GlobalMiddleware.js
│   │   ├── 📂 navigation/               # Configuración global de navegación
│   │   │   └── 📄 AppNavigator.js
│   │   ├── 📂 utils/                    # Funciones helper y utilidades comunes
│   │   │   └── 📄 helper.js
│   │   ├── 📂 constants/                # Constantes globales, endpoints, etc.
│   │   └── 📂 errors/                   # Manejo centralizado de errores y excepciones
│   ├── 📂 domain/                       # Lógica de negocio pura (sin dependencias de frameworks)
│   │   ├── 📂 entities/                 # Entidades y modelos de dominio
│   │   │   ├── 📄 User.js
│   │   │   ├── 📄 Level.js
│   │   │   └── 📄 index.js
│   │   ├── 📂 repositories/             # Contratos (interfaces) de repositorios
│   │   │   ├── 📄 IUserRepository.js
│   │   │   ├── 📄 ILevelRepository.js
│   │   │   📄 BaseRepository.js         # Clase base para repositorios
│   │   └── 📂 useCases/                 # Casos de uso que encapsulan la lógica de negocio
│   │       ├── 📄 GetUserUseCase.js
│   │       ├── 📄 GetLevelsUseCase.js
│   │       📄 BaseUseCase.js            # Clase base para casos de uso
│   ├── 📂 infrastructure/               # Implementaciones técnicas y acceso a datos
│   │   ├── 📂 database/                 # Conexión a la base de datos y modelos
│   │   │   ├── 📂 connection/           # Configuración y conexión a la base de datos
│   │   │   │   └── 📄 DatabaseConnection.js
│   │   │   ├── 📂 models/               # Esquemas y modelos (ORM o validación de datos)
│   │   │   │   ├── 📄 UserModel.js
│   │   │   │   └── 📄 LevelModel.js
│   │   │   └── 📂 repositories/         # Implementación de repositorios de datos
│   │   │       ├── 📄 UserRepository.js
│   │   │       └── 📄 LevelRepository.js
│   │   ├── 📂 services/                 # Servicios externos y lógica de integración
│   │   │   ├── 📂 adapters/             # Adaptadores para consumo de APIs externas
│   │   │   │   └── 📄 ApiAdapter.js
│   │   │   └── 📂 implementations/      # Implementación de servicios (p.ej. autenticación)
│   │   │       └── 📄 AuthService.js
│   │   ├── 📂 security/                 # Seguridad, autenticación y autorización
│   │   │   └── 📂 auth/                 # Módulo de autenticación y cifrado
│   │   │       ├── 📄 SecureStorage.js
│   │   │       └── 📄 EncryptionService.js
│   │   ├── 📂 telemetry/                # Monitoreo y tracking de métricas
│   │   │   └── 📄 TelemetryService.js
│   │   └── 📂 middleware/               # Middlewares específicos de la infraestructura
│   │       └── 📄 InfrastructureMiddleware.js
│   ├── 📂 presentation/                 # Capa de presentación: UI, navegación y gestión de estado
│   │   ├── 📂 base/                     # Componentes base de presentación
│   │   │   📄 BaseViewModel.js          # Clase base para ViewModels
│   │   ├── 📂 components/               # Componentes UI reutilizables
│   │   │   ├── 📄 Button.js
│   │   │   └── 📄 Input.js
│   │   ├── 📂 hooks/                    # Hooks personalizados para la UI
│   │   │   └── 📄 useCustomHook.js
│   │   ├── 📂 screens/                  # Pantallas (vistas) organizadas por feature
│   │   │   ├── 📂 Home/                 # Ejemplo: Pantalla de inicio
│   │   │   │   ├── 📄 HomeScreen.js     # Vista (View)
│   │   │   │   └── 📄 HomeViewModel.js  # Lógica de presentación (ViewModel)
│   │   │   ├── 📂 Profile/              # Ejemplo: Pantalla de perfil
│   │   │   │   ├── 📄 ProfileScreen.js
│   │   │   │   └── 📄 ProfileViewModel.js
│   │   │   └── 📂 Settings/             # Ejemplo: Pantalla de ajustes
│   │   │       ├── 📄 SettingsScreen.js
│   │   │       └── 📄 SettingsViewModel.js
│   │   ├── 📂 state/                    # Gestión del estado global (Redux, Context API, etc.)
│   │   │   ├── 📂 actions/              # Acciones para el store
│   │   │   │   └── 📄 userActions.js
│   │   │   ├── 📂 reducers/             # Reducers o slices del estado
│   │   │   │   └── 📄 userReducer.js
│   │   │   ├── 📂 middleware/           # Middlewares para el store (ej. logger, etc.)
│   │   │   │   └── 📄 loggerMiddleware.js
│   │   │   └── 📄 store.js              # Configuración y creación del store
│   │   └── 📂 navigation/               # Navegación propia de la capa de presentación
│   │       └── 📄 AppNavigator.js
│   ├── 📂 shared/                       # Recursos y utilidades compartidas entre capas
│   │   ├── 📂 components/               # Componentes UI compartidos (botones, cards, etc.)
│   │   │   └── 📄 Card.js
│   │   ├── 📂 hooks/                    # Hooks compartidos entre módulos
│   │   │   └── 📄 useAuth.js
│   │   ├── 📂 themes/                   # Temas y estilos globales (incluyendo pautas de accesibilidad)
│   │   │   └── 📄 lightTheme.js
│   │   └── 📂 utils/                    # Funciones helper, validadores y utilidades comunes
│   │       └── 📄 formatDate.js
│   └── 📂 i18n/                         # Internacionalización y localización
│       ├── 📄 en.json
│       ├── 📄 es.json
│       └── 📄 index.js
├── 📂 tests/                            # Pruebas automatizadas
│   ├── 📂 unit/                         # Pruebas unitarias
│   │   └── 📄 sample.unit.test.js
│   ├── 📂 integration/                  # Pruebas de integración
│   │   └── 📄 sample.integration.test.js
│   └── 📂 e2e/                          # Pruebas end-to-end
│       └── 📄 sample.e2e.test.js
├── 📄 .gitignore
├── 📄 package.json
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
### Opción 3: Usando `comandos`
# Crear la carpetas y archivos
```bash
# Crear directorios para assets
mkdir -p assets/fonts assets/images assets/scripts assets/styles

# Crear directorios para la capa core
mkdir -p src/core/config src/core/adapters src/core/di src/core/interfaces src/core/logging src/core/middleware src/core/navigation src/core/utils src/core/constants src/core/errors docs

# Crear directorios para la capa domain
mkdir -p src/domain/entities src/domain/repositories src/domain/useCases

# Crear directorios para la infraestructura
mkdir -p src/infrastructure/database/connection src/infrastructure/database/models src/infrastructure/database/repositories
mkdir -p src/infrastructure/services/adapters src/infrastructure/services/implementations
mkdir -p src/infrastructure/security/auth src/infrastructure/telemetry src/infrastructure/middleware

# Crear directorios para la presentación (UI)
mkdir -p src/presentation/base src/presentation/components src/presentation/hooks
mkdir -p src/presentation/screens/Home src/presentation/screens/Profile src/presentation/screens/Settings
mkdir -p src/presentation/state/actions src/presentation/state/reducers src/presentation/state/middleware
mkdir -p src/presentation/navigation

# Crear directorios para recursos compartidos
mkdir -p src/shared/components src/shared/hooks src/shared/themes src/shared/utils

# Crear directorios para internacionalización
mkdir -p src/i18n

# Crear directorios para pruebas
mkdir -p tests/unit tests/integration tests/e2e

touch docs/index.md

# Archivos en src/core/config
touch src/core/config/AppConfig.js src/core/config/ConfigAdapter.js src/core/config/index.js

# Archivos en src/core/adapters
touch src/core/adapters/HttpAdapter.js src/core/adapters/DatabaseAdapter.js
touch src/core/adapters/BaseAdapter.js  # Clase base para adaptadores

# Archivo en src/core/di
touch src/core/di/dependencyContainer.js

# Archivos en src/core/interfaces
touch src/core/interfaces/ILogger.js src/core/interfaces/IRepository.js

# Archivo en src/core/logging
touch src/core/logging/Logger.js

# Archivo en src/core/middleware
touch src/core/middleware/GlobalMiddleware.js

# Archivo en src/core/navigation
touch src/core/navigation/AppNavigator.js

# Archivo en src/core/utils
touch src/core/utils/helper.js

# Archivos en src/core/constants y src/core/errors (nuevos)
touch src/core/constants/Constants.js  # Constantes globales
touch src/core/errors/CustomErrors.js    # Manejo centralizado de errores

# Archivos en src/domain/entities
touch src/domain/entities/User.js src/domain/entities/Level.js src/domain/entities/index.js

# Archivos en src/domain/repositories
touch src/domain/repositories/IUserRepository.js src/domain/repositories/ILevelRepository.js
touch src/domain/repositories/BaseRepository.js  # Clase base para repositorios

# Archivos en src/domain/useCases
touch src/domain/useCases/GetUserUseCase.js src/domain/useCases/GetLevelsUseCase.js
touch src/domain/useCases/BaseUseCase.js   # Clase base para casos de uso

# Archivos en src/infrastructure/database/connection
touch src/infrastructure/database/connection/DatabaseConnection.js

# Archivos en src/infrastructure/database/models
touch src/infrastructure/database/models/UserModel.js src/infrastructure/database/models/LevelModel.js

# Archivos en src/infrastructure/database/repositories
touch src/infrastructure/database/repositories/UserRepository.js src/infrastructure/database/repositories/LevelRepository.js

# Archivos en src/infrastructure/services/adapters y implementations
touch src/infrastructure/services/adapters/ApiAdapter.js
touch src/infrastructure/services/implementations/AuthService.js

# Archivos en src/infrastructure/security/auth
touch src/infrastructure/security/auth/SecureStorage.js src/infrastructure/security/auth/EncryptionService.js

# Archivo en src/infrastructure/telemetry
touch src/infrastructure/telemetry/TelemetryService.js

# Archivo en src/infrastructure/middleware
touch src/infrastructure/middleware/InfrastructureMiddleware.js

# Archivos en src/presentation/base (nuevos)
touch src/presentation/base/BaseViewModel.js  # Clase base para ViewModels

# Archivos en src/presentation/components
touch src/presentation/components/Button.js src/presentation/components/Input.js

# Archivo en src/presentation/hooks
touch src/presentation/hooks/useCustomHook.js

# Archivos en src/presentation/screens/Home
mkdir -p src/presentation/screens/Home  # Asegurarse de que el directorio exista
touch src/presentation/screens/Home/HomeScreen.js src/presentation/screens/Home/HomeViewModel.js

# Archivos en src/presentation/screens/Profile
mkdir -p src/presentation/screens/Profile
touch src/presentation/screens/Profile/ProfileScreen.js src/presentation/screens/Profile/ProfileViewModel.js

# Archivos en src/presentation/screens/Settings
mkdir -p src/presentation/screens/Settings
touch src/presentation/screens/Settings/SettingsScreen.js src/presentation/screens/Settings/SettingsViewModel.js

# Archivos en src/presentation/state (acciones, reducers, middleware y store)
mkdir -p src/presentation/state/actions src/presentation/state/reducers src/presentation/state/middleware
touch src/presentation/state/actions/userActions.js
touch src/presentation/state/reducers/userReducer.js
touch src/presentation/state/middleware/loggerMiddleware.js
touch src/presentation/state/store.js

# Archivo en src/presentation/navigation
mkdir -p src/presentation/navigation
touch src/presentation/navigation/AppNavigator.js

# Archivos en src/shared
touch src/shared/components/Card.js
touch src/shared/hooks/useAuth.js
touch src/shared/themes/lightTheme.js
touch src/shared/utils/formatDate.js

# Archivos en src/i18n
touch src/i18n/en.json src/i18n/es.json src/i18n/index.js

# Archivos en tests
mkdir -p tests/unit tests/integration tests/e2e
touch tests/unit/sample.unit.test.js tests/integration/sample.integration.test.js tests/e2e/sample.e2e.test.js

# Crear archivos dummy en cada carpeta
touch assets/fonts/main.ttf
touch assets/images/logo.png
touch assets/scripts/main.js
touch assets/styles/main.css
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
