# 📌 Logging en React Native Clean Feature MVVM Architecture Template

Este documento describe el sistema de logging estructurado utilizado en la aplicación, así como las buenas prácticas y pautas para su uso.

---

## 🎯 Visión General

El sistema de logging tiene como objetivo centralizar y estandarizar la forma en que la aplicación registra información relevante, tanto en modo de desarrollo como en producción. Se basa en una arquitectura de adaptadores que permite:

- **Desacoplar la lógica de log** de la implementación específica (consola, almacenamiento, servicios externos, etc.).
- **Configurar fácilmente diferentes niveles de log** (`DEBUG`, `INFO`, `WARN`, `ERROR`).
- **Extender el sistema** para enviar logs a distintos destinos (consola, archivos, servidores remotos, etc.).

---

## 📂 Estructura de Archivos

En la carpeta `src/core/logging/` se encuentran los principales componentes del sistema de logging:

```bash
src/core/logging/
├── adapters/
│   └── consoleAdapter.ts   # Adaptador de logs para la consola
├── LogAdapter.ts           # Clase base e interfaz para adaptadores de log
├── Logger.ts               # Logger principal que gestiona los niveles de log
└── index.ts                # Punto de exportación (opcional)
```

### 1️⃣ `Logger.ts`
- Define la interfaz `ILogger` con métodos `debug`, `info`, `warn`, `error`.
- Implementa la clase `Logger`, que recibe:
  - Un `LogAdapter` para procesar los logs (por ejemplo, imprimirlos en consola).
  - Un `LogLevel` actual para filtrar la salida de logs.

### 2️⃣ `LogAdapter.ts`
- Define la interfaz `ILogAdapter`, que obliga a implementar el método `log`.
- Implementa la clase base `LogAdapter`, que recibe un **handler** (función callback) para procesar los logs.
- Permite crear diferentes adaptadores (ejemplo: `consoleAdapter`, `jsonConsoleAdapter`, adaptadores para servicios externos, etc.).

### 3️⃣ `consoleAdapter.ts`
- Ejemplo de adaptador que imprime los logs en la consola de forma tradicional, con niveles `[DEBUG]`, `[INFO]`, etc.
- Utiliza `LogAdapter` base y le pasa un **handler** que llama a `console.debug`, `console.info`, `console.warn` y `console.error`.

---

## 🔥 Niveles de Log

Se definen en el `enum LogLevel`:

- **DEBUG**: Mensajes detallados de depuración.
- **INFO**: Mensajes informativos de estado general.
- **WARN**: Mensajes de advertencia que no detienen el flujo, pero requieren atención.
- **ERROR**: Mensajes de error graves que pueden romper el flujo de la aplicación.

El logger permite **filtrar los mensajes** dependiendo del nivel configurado. Por ejemplo, si se establece `LogLevel.INFO`, los logs con nivel `DEBUG` no se mostrarán.

---

## 💻 Ejemplo de Uso

```typescript
import { Logger, consoleAdapter, LogLevel } from '@core/logging';

// Creamos una instancia del logger con el adaptador de consola.
const logger = new Logger(consoleAdapter, LogLevel.DEBUG);

// Ejemplo de logs con diferentes niveles:
logger.debug('Mensaje de depuración', { debugInfo: 'info extra' });
logger.info('Mensaje informativo');
logger.warn('Mensaje de advertencia');
logger.error('Mensaje de error', new Error('Oops!'));
```

Salida en la consola (modo `DEBUG`):

```bash
[DEBUG]: Mensaje de depuración { debugInfo: 'info extra' }
[INFO]: Mensaje informativo
[WARN]: Mensaje de advertencia
[ERROR]: Mensaje de error Error: Oops!
```

---

## 🛠 Creando un Nuevo Adaptador

Para crear un adaptador personalizado (por ejemplo, para almacenar logs en un servidor), sigue estos pasos:

1️⃣ Crea un nuevo archivo (ejemplo: `remoteAdapter.ts`) en `src/core/logging/adapters/`.
2️⃣ Importa la clase base `LogAdapter` y el enum `LogLevel`.
3️⃣ Implementa la lógica en el handler para enviar datos a tu servicio remoto.

Ejemplo simplificado:

```typescript
// src/core/logging/adapters/remoteAdapter.ts
import { LogAdapter } from '../LogAdapter';
import { LogLevel } from '../Logger';

export const remoteAdapter = new LogAdapter((level, message, meta) => {
  fetch('https://mi-servidor-de-logs.com/logs', {
    method: 'POST',
    body: JSON.stringify({
      level,
      message,
      meta,
      timestamp: new Date().toISOString(),
    }),
    headers: { 'Content-Type': 'application/json' },
  }).catch((error) => {
    console.error('Error enviando log al servidor', error);
  });
});
```

---

## ✅ Buenas Prácticas de Logging

### 🎯 Usar niveles adecuados
- `DEBUG` solo en entornos de desarrollo o cuando necesitas rastrear un problema específico.
- `INFO` para sucesos generales (p. ej., inicio de la app, carga de un módulo).
- `WARN` cuando algo no es crítico pero podría convertirse en un problema.
- `ERROR` para fallas graves que interrumpen el flujo normal de la app.

### 🔍 Incluir metadatos
- Pasa objetos relevantes como `meta` para proporcionar más contexto.
- Evita loguear **datos sensibles** (contraseñas, tokens, etc.).

### 🌎 Configurar el nivel de log por entorno
- En desarrollo usar `DEBUG`, en producción usar `WARN` o `ERROR`.
- Puedes obtener el nivel de log de una **variable de entorno** y usarlo en la inicialización del `Logger`.

### 🚀 Evitar logs excesivos
- Un exceso de logs puede generar **ruido** e impactar el rendimiento.
- Ajusta el nivel de log y evita loguear en bucles muy intensos.

---

## 🔗 Integración con Telemetría y Manejo de Errores

- **Logging y telemetría** son sistemas complementarios.
- Puedes loguear eventos de telemetría con el `logger`, pero es recomendable mantenerlos desacoplados para que cada sistema evolucione de forma independiente.
- Para capturar errores y reportarlos en logs y telemetría, usa un `ErrorBoundary` en la **capa de presentación** o maneja excepciones en tus **casos de uso** en la capa de dominio.

---

## 📌 Conclusión

El sistema de logging:

✅ **Centraliza** la forma de registrar información en la aplicación.
✅ **Facilita el cambio de destinos y formatos de logs** gracias a los adaptadores.
✅ **Permite ajustar el nivel de detalle** en función del entorno y las necesidades de depuración.

📖 Para más detalles sobre la arquitectura y la relación con otras capas, consulta [`architecture.md`](../architecture.md) o la documentación de [`telemetry.md`](../telemetry.md) si quieres profundizar en la monitorización de eventos y métricas.

