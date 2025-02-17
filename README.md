# 🚀 React Native Clean Feature MVVM Architecture Template 🚀

Este repositorio proporciona una plantilla base para desarrollar aplicaciones en **React Native**, combinando **Feature-Based Architecture**, **Clean Architecture** y el patrón **MVVM**. Diseñado para el **bare workflow**, incluye soporte para:

- 🌍 **Internacionalización**
- ♿ **Accesibilidad**
- 📝 **Logging estructurado**
- 📊 **Telemetría**
- 🛠 **Pruebas automatizadas**

---

## 📖 Tabla de Contenidos

- [🔍 Visión General](#-visión-general)
- [🏢 Arquitectura del Proyecto](#-arquitectura-del-proyecto)
- [📚 Estructura de Directorios](#-estructura-de-directorios)
- [🚀 Uso](#-uso)
- [🛠 Contribuciones](#-contribuciones)
- [📚 Documentación Adicional](#-documentación-adicional)
- [📝 Licencia](#-licencia)

---

## 🔍 Visión General

Este template está diseñado para:
- Garantizar un **código limpio, modular y escalable**.
- Aplicar las mejores prácticas de desarrollo en React Native.
- Proporcionar una estructura organizada que facilite la integración de nuevas funcionalidades.
- Servir como punto de partida para proyectos en React Native con **bare workflow**.

Documentación detallada en la carpeta [`/docs`](docs/):

- [📚 Arquitectura y Diseño](docs/architecture.md)
- [🏢 Configuración del Proyecto](docs/setup.md)
- [🛡 Seguridad y Autenticación](docs/security.md)
- [📝 Logging y Telemetría](docs/logging.md)
- [🌍 Internacionalización](docs/i18n.md)
- [🛠 Pruebas y Calidad de Código](docs/testing.md)

---

## 🏢 Arquitectura del Proyecto

La aplicación sigue los principios de **Clean Architecture**, **Feature-Based Architecture** y el patrón **MVVM**.

📚 **División por capas:**
1. **Capa de Dominio (`src/domain/`)** → Lógica de negocio independiente de frameworks.
2. **Capa de Infraestructura (`src/infrastructure/`)** → Bases de datos, API y seguridad.
3. **Capa de Presentación (`src/presentation/`)** → UI y gestión del estado.
4. **Capa Central (`src/core/`)** → Configuración global, logging, telemetría.
5. **Capas transversales (`src/navigation/`, `src/i18n/`, `src/accessibility/`)** → Manejo de navegación, internacionalización y accesibilidad.

📃 **Organización por Features:**
- Cada funcionalidad es independiente dentro de `src/presentation/features/`
- Cada feature tiene su propio `ViewModel`, asegurando modularidad.

📖 Para más detalles, consulta [`docs/architecture.md`](docs/architecture.md).

---

## 📚 Estructura de Directorios

```bash
📂 .
├── 📂 assets/                           # Recursos estáticos
│   ├── 📂 fonts/                        # Fuentes personalizadas
│   │   ├── 📄 .gitkeep
│   ├── 📂 images/                       # Imágenes, íconos y SVGs
│   │   ├── 📂 icons/                    # Íconos unificados
│   │   │   ├── 📄 .gitkeep
│   │   ├── 📄 .gitkeep
│   ├── 📂 sounds/                       # Sonidos para la app
│   │   ├── 📄 .gitkeep
│   ├── 📂 animations/                   # Animaciones y efectos visuales
│   │   ├── 📂 lottie/                   # Archivos de animación Lottie
│   │   │   ├── 📄 .gitkeep
│   │   ├── 📂 gifs/                     # Gifs animados
│   │   │   ├── 📄 .gitkeep
│   │   ├── 📂 svgs/                     # Íconos y elementos vectoriales
│   │       ├── 📄 .gitkeep
│
├── 📂 docs/                             # Documentación del proyecto
│   ├── 📄 README.md                     # Documentación principal
│   ├── 📄 architecture.md               # Explicación de la arquitectura
│   ├── 📄 setup.md                      # Configuración y primeros pasos
│   ├── 📄 testing.md                    # Guía de pruebas automatizadas
│   ├── 📄 security.md                   # Consideraciones de seguridad
│   ├── 📄 i18n.md                        # Internacionalización y localización
│   ├── 📄 logging.md                     # Logging y monitoreo
│   ├── 📄 contributing.md                # Guía para contribuidores
│
📂 src/                              # Código fuente principal
│
│   ├── 📂 core/                     # Configuraciones y utilidades globales
│   │   ├── 📂 config/                # Configuración centralizada
│   │   │   ├── 📂 environment/        # Configuración de entornos
│   │   │   │   ├── 📄 EnvConfig.ts     # Carga de variables de entorno (.env)
│   │   │   │   ├── 📄 ConfigAdapter.ts # Adaptador para diferentes entornos
│   │   │   │   ├── 📄 FeatureFlags.ts  # Flags para activar/desactivar funcionalidades
│   │   │   │   ├── 📄 Constants.ts     # Variables constantes de la app
│   │   │   │
│   │   │   ├── 📂 security/           # Configuración de seguridad
│   │   │   │   ├── 📄 SecureConfig.ts  # Configuración de seguridad y cifrado
│   │   │   │
│   │   │   ├── 📂 theme/              # Configuración de temas y estilos
│   │   │   │   ├── 📄 ThemeConfig.ts   # Definición de temas claros/oscuros
│   │   │   │
│   │   │   ├── 📄 AppConfig.ts        # Configuración general de la aplicación
│   │   │
│   │   ├── 📂 di/                     # Inyección de dependencias
│   │   │   ├── 📄 dependencyContainer.ts
│   │   │   ├── 📄 serviceLocator.ts    # Patrón service locator
│   │   │
│   │   ├── 📂 observability/          # Monitoreo y logging
│   │   │   ├── 📄 LoggerService.ts
│   │   │   ├── 📄 LogAdapter.ts
│   │   │   ├── 📄 AnalyticsTracker.ts  # Tracking de eventos
│   │   │
│   │   ├── 📂 security/               # Seguridad y autenticación
│   │   │   ├── 📄 AuthService.ts
│   │   │   ├── 📄 EncryptionService.ts
│   │   │   ├── 📄 KeychainService.ts
│   │   │   ├── 📄 BiometricService.ts  # Soporte para autenticación biométrica
│   │   │
│   │   ├── 📂 utils/                   # Utilidades globales
│   │   │   ├── 📄 helper.ts
│   │   │   ├── 📄 formatDate.ts
│   │   │   ├── 📄 debounce.ts
│   │   │   ├── 📄 validateInput.ts
│   │   │   ├── 📄 networkUtils.ts      # Detección de estado de red
│
│   ├── 📂 domain/                      # Lógica de negocio pura
│   │   ├── 📂 entities/                 # Modelos de negocio
│   │   │   ├── 📄 User.ts
│   │   │   ├── 📄 Product.ts
│   │   │
│   │   ├── 📂 repositories/             # Interfaces de repositorios
│   │   │   ├── 📄 IUserRepository.ts
│   │   │   ├── 📄 IProductRepository.ts
│   │   │
│   │   ├── 📂 useCases/                 # Casos de uso
│   │   │   ├── 📄 GetUserUseCase.ts
│   │   │   ├── 📄 CreateProductUC.ts
│
│   ├── 📂 infrastructure/               # Implementaciones técnicas
│   │   ├── 📂 database/                  # Configuración de base de datos
│   │   │   ├── 📄 DatabaseConnection.ts
│   │   │   ├── 📂 migrations/            # Migraciones de base de datos
│   │   │   │   ├── 📄 init.sql
│   │   │
│   │   ├── 📂 api/                       # Cliente API
│   │   │   ├── 📄 axiosClient.ts
│   │   │   ├── 📄 apiEndpoints.ts
│   │   │
│   │   ├── 📂 middleware/                 # Middlewares
│   │   │   ├── 📄 AuthMiddleware.ts
│   │   │   ├── 📄 GlobalMiddleware.ts
│
│   ├── 📂 presentation/                  # Capa de UI y estado global
│   │   ├── 📂 base/                      
│   │   │   ├── 📄 BaseViewModel.ts
│   │   │   ├── 📄 BaseScreen.tsx         # Componente base para pantallas
│   │   │
│   │   ├── 📂 features/                  # Features modulares
│   │   │   ├── 📂 auth/
│   │   │   │   ├── 📄 AuthViewModel.ts
│   │   │   │   ├── 📄 AuthScreen.tsx
│   │   │   │   ├── 📄 authAPI.ts
│   │   │   │
│   │   │   ├── 📂 settings/
│   │   │   │   ├── 📄 SettingsViewModel.ts
│   │   │   │   ├── 📄 SettingsScreen.tsx
│   │   │
│   │   ├── 📂 components/                # Componentes UI reutilizables
│   │   │   ├── 📂 common/                # Botones, inputs, etc.
│   │   │   │   ├── 📄 Button.tsx
│   │   │   │   ├── 📄 Input.tsx
│   │   │   ├── 📂 layout/                # Contenedores, headers
│
│   ├── 📂 a11y/                 # Accesibilidad en UI
│   │   ├── 📄 AccessibilityHelper.ts
│
│   ├── 📂 navigation/                    # Navegación global
│   │   ├── 📄 AppNavigator.tsx
│   │   ├── 📄 NavigationService.ts
│   │   ├── 📄 RouteConfig.ts
│
│   ├── 📂 i18n/                          # Internacionalización
│   │   ├── 📄 en.json
│   │   ├── 📄 es.json
│   │   ├── 📄 index.ts
│   │   ├── 📄 i18nTypes.ts
│
├── 📂 tests/                             # 📄 Pruebas automatizadas
│   ├── 📂 unit/                          
│   ├── 📂 integration/                   
│   ├── 📂 e2e/                           
│
├── 📂 scripts/                           # Scripts de automatización
│   ├── 📄 bootstrap.sh
│   ├── 📄 codegen.ts
│
├── 📂 .github/                           # Configuración CI/CD
│   ├── 📂 workflows/
│   │   ├── 📄 tests.yml
│   │   ├── 📄 deploy-store.yml
│
├── 📄 .env.example                       # Plantilla de variables de entorno
├── 📄 babel.config.js                    
├── 📄 app.json                            # Configuración de Expo
├── 📄 metro.config.js                     # Configuración de alias
├── 📄 tsconfig.json                       # Configuración TypeScript
└── 📄 README.md                           # Documentación principal
```

---
## 🚀 Uso

### Clonando el repositorio
```bash
git clone https://github.com/usuario/rn-clean-feature-mvvm-template.git
cd rn-clean-feature-mvvm-template
rm -rf .git
git init
git add .
git commit -m "Inicializando proyecto con el template"
npm install
npx react-native run-android  # Para Android
npx react-native run-ios      # Para iOS
```

## 🚀 Uso de Funciones Clave

El template incluye varias abstracciones que permiten la configuración de entornos, logging, telemetría, accesibilidad y seguridad.

### 📜 **Ejemplo: Configuración global**
El sistema de configuración utiliza `ConfigAdapter` para obtener valores desde las variables de entorno.

```tsx
import { Config } from '@core/config/environment/EnvConfig';

const apiUrl = Config.get<string>('API_URL');
console.log('API Base URL:', apiUrl);
```

### 📝 **Ejemplo: Logging estructurado**
El sistema de logging sigue una arquitectura de adaptadores. Puedes utilizarlo de la siguiente manera:

```tsx
import { Logger, consoleAdapter, LogLevel } from '@core/logging';

const logger = new Logger(consoleAdapter, LogLevel.INFO);
logger.info('Evento importante', { userId: 123 });
```

### 📊 **Ejemplo: Registro de eventos con AnalyticsTracker**
```tsx
import { AnalyticsTracker } from '@core/observability/AnalyticsTracker';

AnalyticsTracker.trackFeatureUsage('Login', { method: 'OAuth' });
```

### 🔐 **Ejemplo: Encriptación de datos**
```tsx
import { EncryptionService } from '@core/security/EncryptionService';

const encryptedData = EncryptionService.encrypt('Información sensible');
console.log('Texto cifrado:', encryptedData);

const decryptedData = EncryptionService.decrypt(encryptedData);
console.log('Texto descifrado:', decryptedData);
```

Consulta la [documentación detallada](docs/) para más ejemplos.

## 🛠 Contribuciones

Consulta [`docs/contributing.md`](docs/contributing.md) para conocer el flujo de trabajo y las reglas de contribución.

**Flujo de Ramas:**
1. `main` → Rama estable y lista para producción.
2. `develop` → Rama para integración de nuevas funcionalidades.
3. `feature/nombre-feature` → Nueva funcionalidad.
4. `bugfix/nombre-bug` → Corrección de errores.
5. `hotfix/nombre-hotfix` → Solución urgente en producción.

**Convenciones de Commits:**
```bash
feat(auth): implementar autenticación con Firebase
fix(login): corregir error al validar tokens
docs(readme): actualizar guía de instalación
```

## 📚 Documentación Adicional

- [📄 Arquitectura y Diseño](docs/architecture.md)
- [📄 Configuración del Proyecto](docs/setup.md)
- [📄 Seguridad y Autenticación](docs/security.md)
- [📄 Logging y Telemetría](docs/logging.md)
- [📄 Internacionalización](docs/i18n.md)
- [📄 Pruebas y Calidad de Código](docs/testing.md)

## 📝 Licencia

Este proyecto está bajo la **Licencia MIT**. Consulta el archivo [`LICENSE`](LICENSE) para más detalles.

---

🚀 **¡Comienza a desarrollar con una arquitectura sólida y escalable en React Native!** 🎯
