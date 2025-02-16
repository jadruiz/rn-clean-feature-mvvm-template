# Arquitectura del Proyecto

## 🚀 Visión General

El **React Native Clean Feature MVVM Architecture Template** es una plantilla base diseñada para desarrollar aplicaciones en React Native, utilizando principios modernos de arquitectura y desarrollo de software.

### Principales Enfoques:
- **Feature-Based Architecture**: Organización modular por funcionalidad para mejorar mantenibilidad y escalabilidad.
- **Clean Architecture**: Separación clara de responsabilidades en capas, desacoplando lógica de negocio, datos y presentación.
- **MVVM (Model-View-ViewModel)**: Patrón que separa la UI de la lógica de presentación, facilitando pruebas y mantenibilidad.

Diseñado para el **bare workflow** de React Native, este template ofrece soporte para internacionalización, accesibilidad, logging estructurado, telemetría y pruebas automatizadas.

---

## 🏗️ Capas y Componentes de la Arquitectura

La arquitectura del proyecto se organiza en varias capas, cada una con una responsabilidad específica:

### 1. **Core** (Servicios y Configuraciones Globales)

#### 📌 Propósito:
Proveer configuraciones y servicios transversales utilizados en toda la aplicación.

#### 📂 Estructura:
- **config/**: Configuración centralizada.
  - `environment/`: Configuración por entorno (dev, staging, prod).
  - `security/`: Configuración de seguridad y cifrado.
  - `theme/`: Temas globales y breakpoints de diseño.
  - `AppConfig.ts`: Configuración general de la aplicación.
- **a11y/**: Soporte para accesibilidad.
  - Incluye `AccessibilityHelper.ts`, `ScreenReaderService.ts`, `HighContrastMode.ts`, etc.
- **telemetry/**: Monitoreo y telemetría.
- **logging/**: Logging estructurado y adaptadores.
- **state/**: Gestión del estado global.
  - `store.ts`: Configuración de Redux/Zustand.
  - `slices/`: Módulos de estado (`authSlice.ts`, `settingsSlice.ts`).
  - `selectors/`: Selectores con memoización.
  - `middlewares/`: Middlewares específicos del estado.
- **di/**: Inyección de dependencias y Service Locator.
- **observability/**: Monitoreo de rendimiento y analítica.
- **utils/**: Funciones de utilidad global.

---

### 2. **Domain** (Lógica de Negocio Pura)

#### 📌 Propósito:
Encapsular la lógica de negocio y reglas de la aplicación de manera independiente a frameworks.

#### 📂 Estructura:
- **entities/**: Definición de modelos de negocio (`User.ts`, `Product.ts`).
- **repositories/**: Interfaces de acceso a datos (`IUserRepository.ts`, `IProductRepository.ts`).
- **useCases/**: Casos de uso (`GetUserUseCase.ts`, `CreateProductUseCase.ts`).

---

### 3. **Infrastructure** (Acceso a Datos y Servicios Externos)

#### 📌 Propósito:
Implementar los mecanismos técnicos necesarios para la comunicación con APIs, bases de datos y almacenamiento.

#### 📂 Estructura:
- **data/**: Implementación de la capa de datos.
  - `repositories/`: Implementaciones concretas (`UserRepository.ts`).
  - `sources/`: Fuentes de datos (`ApiSource.ts`, `LocalSource.ts`, `CacheSource.ts`).
  - `mappers/`: Conversión de datos (`UserMapper.ts`).
- **storage/**: Persistencia local (`StorageService.ts`).
- **messaging/**: Manejo de WebSockets y notificaciones (`MessagingService.ts`).
- **network/**: Gestión de conectividad (`NetworkManager.ts`).
- **integrations/**: Integraciones con servicios externos (`ThirdPartyService.ts`).

---

### 4. **Presentation** (Capa de UI y Navegación)

#### 📌 Propósito:
Definir la interfaz de usuario y manejar la navegación global.

#### 📂 Estructura:
- **base/**: Componentes base y vistas genéricas (`BaseViewModel.ts`, `BaseScreen.tsx`).
- **features/**: Organización modular por funcionalidad.
  - `auth/`
    - `view/`: Vistas (`LoginScreen.tsx`, `RegisterScreen.tsx`).
    - `viewModel/`: Lógica de presentación (`LoginViewModel.ts`).
    - `model/`: Modelos específicos (`AuthModel.ts`).
    - `authAPI.ts`, `authTypes.ts`, `index.ts`.
  - `settings/`: Estructura similar para la configuración.
- **components/**: Componentes UI reutilizables.
- **shared/**: Componentes y hooks compartidos.
- **navigation/**: Gestión de navegación global.
  - **stacks/**:
    - `AuthStack.tsx`: Flujo de autenticación.
    - `MainStack.tsx`: Navegación principal.
    - `SettingsStack.tsx`: Configuración.
    - `TabNavigator.tsx`: Pestañas de navegación.
- **i18n/**: Internacionalización.
  - `locales/`: Archivos de traducción (`en.json`, `es.json`).
  - `i18n.ts`: Configuración de i18next.
  - `LanguageSwitcher.tsx`: Selector de idioma.
- **api/**: Cliente API y endpoints (`axiosClient.ts`, `apiEndpoints.ts`).
- **middlewares/**: Middlewares globales (`AuthMiddleware.ts`, `GlobalMiddleware.ts`).

---

### 5. **Tipos Globales**

#### 📌 Propósito:
Centralizar definiciones de tipos y interfaces reutilizables.

#### 📂 Ubicación:
- `src/types/index.ts`

---

## 📌 Principales Beneficios de esta Arquitectura

### 🔹 Escalabilidad y Mantenimiento
- Separación de responsabilidades clara y modularidad para facilitar la evolución del código.
- Facilita la incorporación de nuevas funcionalidades sin generar deuda técnica.

### 🔹 Flexibilidad Tecnológica
- Desacople de la lógica de negocio e infraestructura, permitiendo cambiar tecnologías sin impactar la aplicación.

### 🔹 Modularidad y Reutilización
- Organización por features para evitar duplicación de código y mejorar la mantenibilidad.

### 🔹 Mejores Prácticas de Ingeniería de Software
- Aplicación de principios como **Clean Architecture**, **MVVM**, **inyección de dependencias**, **gestión centralizada del estado** y **separación de responsabilidades**.

### 🔹 Integración de Herramientas Modernas
- Automatización con **Plop.js** para scaffolding.
- **Storybook** para documentación y testing visual de componentes.
- **Pipelines CI/CD** para pruebas automatizadas y despliegue continuo.