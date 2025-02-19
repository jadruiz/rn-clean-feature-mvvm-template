src/
├── core/
│   ├── auth/                         // Lógica central de autenticación
│   │   ├── AuthService.ts            // Validación de credenciales, generación y manejo de tokens
│   │   ├── AuthProvider.tsx          // Contexto de autenticación para proveer el estado y acciones a la UI
│   │   ├── SecureStore.ts            // Abstracción para manejo seguro de credenciales (ej: expo-secure-store)
│   │   ├── SessionManager.ts         // Control de sesión: manejo de expiración, refresco de tokens, etc.
│   │   ├── OfflineAuthSync.ts        // Lógica para sincronización offline-online de autenticación
│   │   └── index.ts                  // Re-exporta módulos de auth
│   └── ...                           // Otros módulos de core (config, logging, observability, etc.)
├── domain/
│   ├── entities/
│   │   └── User.ts                   // Modelo de usuario (entidad de dominio)
│   └── useCases/
│       ├── LoginUseCase.ts           // Caso de uso para el login: valida credenciales, actualiza sesión, etc.
│       └── SyncAuthUseCase.ts        // Caso de uso para sincronizar autenticación offline
├── infrastructure/
│   ├── repositories/
│   │   └── AuthRepository.ts         // Implementación concreta de IAuthRepository, usando almacenamiento local
│   ├── storage/
│   │   ├── AsyncStorageService.ts    // Implementación actual de almacenamiento con AsyncStorage (clave-valor)
│   │   └── LocalAuthStorage.ts       // Abstracción de almacenamiento para auth (preparado para ser reemplazado por SQLite en el futuro)
│   └── network/
│       └── NetworkManager.ts         // Manejo de red y eventos offline/online
├── presentation/
│   ├── features/
│   │   └── auth/                     // Feature de autenticación
│   │       ├── view/
│   │       │   ├── LoginScreen.tsx   // Pantalla de login offline-first
│   │       │   └── RegisterScreen.tsx (Opcional)  // Pantalla de registro, si aplica
│   │       └── viewModel/
│   │           ├── LoginViewModel.ts // Lógica de presentación para login; se comunica con LoginUseCase y OfflineAuthSync
│   │           └── RegisterViewModel.ts (Opcional)  // Lógica para registro
│   ├── navigation/                   // Configuración de navegación de la app
│   └── styles/                       // Estilos globales y temáticos
└── tests/
    ├── unit/                       // Pruebas unitarias para AuthService, LoginUseCase, etc.
    ├── integration/                // Pruebas de integración (por ejemplo, AuthRepository con AsyncStorage)
    └── e2e/                        // Pruebas end-to-end para flujos offline-first de login
