```Bash                    # Documentación principal
.
├── 📂 assets/                           # Recursos estáticos (imágenes, fuentes, sonidos, animaciones)
│   ├── 📂 fonts/
│   │   └── .gitkeep
│   ├── 📂 images/
│   │   ├── 📂 icons/
│   │   │   └── .gitkeep
│   │   └── .gitkeep
│   ├── 📂 sounds/
│   │   └── .gitkeep
│   └── 📂 animations/
│       ├── 📂 lottie/
│       │   └── .gitkeep
│       ├── 📂 gifs/
│       │   └── .gitkeep
│       └── 📂 svgs/
│           └── .gitkeep
├── 📂 constants/                        # Constantes y configuraciones globales
│   └── index.ts
├── 📂 docs/                             # Documentación del proyecto y diagramas (Mermaid/PlantUML)
│   ├── architecture.md
│   ├── directory-structure.md
│   ├── setup.md
│   ├── testing.md
│   ├── security.md
│   ├── i18n.md
│   ├── logging.md
│   ├── contributing.md                  # Guía para contribuidores y onboarding
│   ├── state-management.md              # Manejo del estado global
│   ├── a11y-best-practices.md           # Buenas prácticas de accesibilidad
│   └── feature-development.md           # Guía para desarrollar nuevas features
├── 📂 plop/                             # Generación automática de código (scaffolds)
│   └── plopfile.js                      # Configuración para Plop.js (ej.: `plop feature Auth`)
├── 📂 src/                              # Código fuente principal
│   ├── 📂 core/                         # Configuración global, servicios y utilidades transversales
│   │   ├── 📂 config/                   # Configuración centralizada
│   │   │   ├── 📂 environment/          # Configuración por entorno (dev, staging, prod)
│   │   │   │   ├── EnvConfig.ts
│   │   │   │   ├── ConfigAdapter.ts
│   │   │   │   ├── FeatureFlags.ts
│   │   │   │   └── Constants.ts
│   │   │   ├── 📂 security/             # Seguridad y cifrado
│   │   │   │   └── SecureConfig.ts
│   │   │   ├── 📂 theme/                # Temas globales y diseño responsivo
│   │   │   │   └── ThemeConfig.ts
│   │   │   └── AppConfig.ts             # Configuración general de la aplicación
│   │   ├── 📂 a11y/                     # Accesibilidad (a11y)
│   │   │   ├── AccessibilityHelper.ts
│   │   │   ├── ScreenReaderService.ts
│   │   │   ├── HighContrastMode.ts
│   │   │   ├── DynamicFontSize.ts
│   │   │   ├── FocusManager.ts
│   │   │   └── A11yContext.tsx
│   │   ├── 📂 telemetry/                # Telemetría y monitoreo
│   │   │   ├── TelemetryService.ts
│   │   │   └── AnalyticsAdapter.ts
│   │   ├── 📂 logging/                  # Logging estructurado
│   │   │   ├── Logger.ts
│   │   │   └── LogAdapter.ts
│   │   ├── 📂 state/                    # Gestión del estado global (Redux/Zustand)
│   │   │   ├── store.ts                 # Configuración del store
│   │   │   ├── 📂 slices/               # Módulos de estado
│   │   │   │   ├── authSlice.ts
│   │   │   │   ├── userSlice.ts
│   │   │   │   ├── settingsSlice.ts
│   │   │   │   └── .gitkeep             # Documentación interna para este directorio
│   │   │   ├── 📂 selectors/            # Selectores optimizados
│   │   │   │   ├── authSelectors.ts
│   │   │   │   ├── userSelectors.ts
│   │   │   │   ├── settingsSelectors.ts
│   │   │   │   └── .gitkeep
│   │   │   ├── 📂 hooks/                # Hooks personalizados
│   │   │   │   ├── useAuth.ts
│   │   │   │   ├── useUser.ts
│   │   │   │   ├── useSettings.ts
│   │   │   │   └── .gitkeep
│   │   │   └── 📂 middlewares/          # Middlewares específicos del estado
│   │   │       ├── loggerMiddleware.ts
│   │   │       ├── apiMiddleware.ts
│   │   │       └── .gitkeep
│   │   ├── 📂 di/                       # Inyección de dependencias y Service Locator
│   │   │   ├── dependencyContainer.ts
│   │   │   ├── serviceLocator.ts
│   │   │   └── .gitkeep
│   │   ├── 📂 observability/            # Monitoreo y rendimiento
│   │   │   ├── AnalyticsTracker.ts
│   │   │   ├── PerformanceMonitor.ts
│   │   │   └── .gitkeep
│   │   └── 📂 utils/                    # Funciones y utilidades globales
│   │       ├── helper.ts
│   │       ├── formatDate.ts
│   │       ├── debounce.ts
│   │       ├── validateInput.ts
│   │       └── .gitkeep
│   ├── 📂 domain/                       # Lógica de negocio pura
│   │   ├── 📂 entities/                 # Modelos de negocio
│   │   │   ├── User.ts
│   │   │   ├── Product.ts
│   │   │   └── .gitkeep
│   │   ├── 📂 repositories/             # Interfaces de acceso a datos
│   │   │   ├── IUserRepository.ts
│   │   │   ├── IProductRepository.ts
│   │   │   └── .gitkeep
│   │   └── 📂 useCases/                 # Casos de uso
│   │       ├── GetUserUseCase.ts
│   │       ├── CreateProductUseCase.ts
│   │       └── .gitkeep
│   ├── 📂 infrastructure/               # Capa de acceso a datos y servicios externos
│   │   ├── 📂 data/                     # Implementación de la capa de datos
│   │   │   ├── 📂 repositories/         # Implementaciones concretas
│   │   │   │   ├── UserRepository.ts
│   │   │   │   ├── ProductRepository.ts
│   │   │   │   └── .gitkeep
│   │   │   ├── 📂 sources/              # Fuentes de datos
│   │   │   │   ├── ApiSource.ts
│   │   │   │   ├── LocalSource.ts
│   │   │   │   ├── CacheSource.ts
│   │   │   │   └── .gitkeep
│   │   │   ├── 📂 mappers/              # Mapeadores de datos
│   │   │   │   ├── UserMapper.ts
│   │   │   │   ├── ProductMapper.ts
│   │   │   │   └── .gitkeep
│   │   ├── 📂 storage/                  # Persistencia local
│   │   │   ├── StorageService.ts
│   │   │   └── .gitkeep
│   │   ├── 📂 messaging/                # WebSockets y notificaciones
│   │   │   ├── MessagingService.ts
│   │   │   └── .gitkeep
│   │   ├── 📂 network/                  # Gestión de conectividad
│   │   │   ├── NetworkManager.ts
│   │   │   └── .gitkeep
│   │   └── 📂 integrations/             # Integraciones con servicios externos
│   │       ├── ThirdPartyService.ts
│   │       └── .gitkeep
│   ├── 📂 navigation/                   # Navegación global
│   │   ├── 📂 stacks/                   # Organización de stacks de navegación
│   │   │   ├── AuthStack.tsx
│   │   │   ├── MainStack.tsx
│   │   │   ├── SettingsStack.tsx
│   │   │   ├── TabNavigator.tsx
│   │   │   └── .gitkeep
│   │   ├── AppNavigator.tsx
│   │   ├── NavigationService.ts
│   │   └── RouteConfig.ts
│   ├── 📂 i18n/                         # Internacionalización
│   │   ├── 📂 locales/                  # Traducciones
│   │   │   ├── en.json
│   │   │   ├── es.json
│   │   │   └── .gitkeep
│   │   ├── i18n.ts
│   │   ├── i18nTypes.ts
│   │   └── LanguageSwitcher.tsx
│   ├── 📂 presentation/                 # Capa de UI (MVVM y Feature-Based)
│   │   ├── 📂 base/                     # Componentes base y vistas genéricas
│   │   │   ├── BaseViewModel.ts
│   │   │   └── BaseScreen.tsx
│   │   ├── 📂 features/                 # Features modulares y autocontenidas
│   │   │   ├── 📂 auth/                 # Ejemplo: Feature de autenticación
│   │   │   │   ├── 📂 view/
│   │   │   │   │   ├── LoginScreen.tsx
│   │   │   │   │   ├── RegisterScreen.tsx
│   │   │   │   ├── 📂 viewModel/
│   │   │   │   │   ├── LoginViewModel.ts
│   │   │   │   │   ├── RegisterViewModel.ts
│   │   │   │   ├── 📂 model/
│   │   │   │   │   └── AuthModel.ts
│   │   │   │   ├── authAPI.ts
│   │   │   │   ├── authTypes.ts
│   │   │   │   └── index.ts
│   │   │   ├── 📂 settings/             # Ejemplo: Feature de configuración
│   │   │   │   ├── 📂 view/
│   │   │   │   │   └── SettingsScreen.tsx
│   │   │   │   ├── 📂 viewModel/
│   │   │   │   │   └── SettingsViewModel.ts
│   │   │   │   ├── 📂 model/
│   │   │   │   │   └── SettingsModel.ts
│   │   │   │   ├── settingsAPI.ts
│   │   │   │   ├── settingsTypes.ts
│   │   │   │   └── index.ts
│   │   │   └── .gitkeep
│   │   ├── 📂 components/               # Componentes UI reutilizables
│   │   │   ├── ErrorBoundary.tsx        # Captura errores en la UI
│   │   │   └── .gitkeep
│   │   ├── 📂 shared/                   # Componentes y hooks compartidos
│   │   │   ├── DatePicker.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── useResponsive.ts
│   │   │   └── .gitkeep
│   │   ├── 📂 styles/                   # Estilos globales (opcional)
│   │   │   ├── GlobalStyles.ts
│   │   │   └── .gitkeep
│   ├── 📂 api/                          # Cliente API y endpoints
│   │   ├── axiosClient.ts
│   │   └── apiEndpoints.ts
│   ├── 📂 middlewares/                  # Middlewares globales para la aplicación
│   │   ├── AuthMiddleware.ts
│   │   └── GlobalMiddleware.ts
│   └── 📂 types/                        # Tipos, interfaces y enums globales
│       └── index.ts
├── 📂 tests/                            # Pruebas automatizadas
│   ├── 📂 unit/
│   │   ├── auth.test.ts
│   │   └── utils.test.ts
│   ├── 📂 integration/
│   │   ├── api.test.ts
│   │   └── navigation.test.ts
│   ├── 📂 e2e/
│   │   ├── authFlow.spec.ts
│   │   └── onboarding.spec.ts
│   └── 📂 mocks/                       # Mocks y datos de prueba
│       ├── authMocks.ts
│       └── apiMocks.ts
│       └── testUtils.ts                # Utilidades para pruebas
├── 📂 scripts/                          # Scripts de automatización y generación de código
│   ├── bootstrap.sh                     # Configuración inicial del proyecto
│   ├── codegen.ts                       # Generación automática de código (scaffold)
│   ├── build.sh                         # Script para builds automatizados
│   ├── deploy.sh                        # Script para despliegues
│   └── lint-fix.sh                      # Script para correcciones de linting
├── 📂 .github/                          # Configuración de CI/CD y workflows
│   └── 📂 workflows/
│       ├── tests.yml                    # Pipeline para pruebas
│       ├── deploy-store.yml             # Pipeline para despliegues
│       ├── lint.yml                     # Pipeline para linting
│       └── release.yml                  # Pipeline para releases
├── 📂 storybook/                        # Documentación visual de componentes con Storybook
│   └── main.js                          # Configuración de Storybook para React Native
├── .env.example                         # Plantilla de variables de entorno
├── babel.config.js
├── app.json                             # Configuración de Expo
├── metro.config.js                      # Configuración de alias y bundler
├── tsconfig.json                        # Configuración de TypeScript con paths absolutos
└── README.md                            # Documentación principal
```