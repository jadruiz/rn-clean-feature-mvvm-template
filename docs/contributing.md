# Estructura de Ramas
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
