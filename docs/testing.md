# 🧪 Pruebas en el Proyecto

Este proyecto implementa una estrategia de pruebas automatizadas que cubre diferentes aspectos de la aplicación, garantizando estabilidad, calidad del código y detección temprana de errores.

---

## 📚 **Tipos de Pruebas**

Las pruebas están organizadas en diferentes niveles:

### **1. Pruebas Unitarias (`tests/unit/`)
- Se enfocan en probar funciones y componentes de manera aislada.
- Utilizan mocks y stubs para simular dependencias.
- Se ejecutan rápidamente y sirven como primera línea de defensa.

📌 **Ejemplo de prueba unitaria en Jest:**
```ts
import { formatDate } from '@/core/utils/formatDate';

describe('formatDate', () => {
  it('debe formatear la fecha correctamente', () => {
    const fecha = new Date('2025-02-15');
    expect(formatDate(fecha)).toBe('15/02/2025');
  });
});
```

---

### **2. Pruebas de Integración (`tests/integration/`)
- Validan la comunicación entre diferentes módulos del sistema.
- Prueban la conexión entre API, base de datos y lógica de negocio.
- Utilizan herramientas como `msw` para mockear peticiones HTTP.

📌 **Ejemplo de prueba de integración:**
```ts
import axios from 'axios';
import { getUser } from '@/infrastructure/api/userAPI';

jest.mock('axios');

describe('getUser API', () => {
  it('debe obtener datos de usuario correctamente', async () => {
    const mockResponse = { data: { id: 1, name: 'John Doe' } };
    (axios.get as jest.Mock).mockResolvedValue(mockResponse);

    const user = await getUser(1);
    expect(user.name).toBe('John Doe');
  });
});
```

---

### **3. Pruebas End-to-End (`tests/e2e/`)
- Simulan la interacción del usuario con la aplicación completa.
- Prueban la funcionalidad en un entorno realista.
- Se ejecutan con `Detox` para React Native o `Cypress` para entornos web.

📌 **Ejemplo de prueba E2E con Detox:**
```ts
describe('Flujo de autenticación', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('debe iniciar sesión correctamente', async () => {
    await element(by.id('username')).typeText('testuser');
    await element(by.id('password')).typeText('password123');
    await element(by.id('login-button')).tap();
    await expect(element(by.id('home-screen'))).toBeVisible();
  });
});
```

---

## 🛠 **Herramientas Utilizadas**

- **Jest** → Para pruebas unitarias e integración.
- **React Native Testing Library** → Para pruebas de componentes.
- **Mock Service Worker (MSW)** → Para simular APIs en pruebas de integración.
- **Detox** → Para pruebas end-to-end en dispositivos móviles.
- **Cypress** → Para pruebas de extremo a extremo en entornos web.

---

## 📌 **Estrategia de Ejecución**

1. **Pre-Commit:** Ejecución de pruebas unitarias con `husky` para evitar errores en commits.
2. **Pull Request:** CI/CD ejecuta pruebas unitarias e integración antes de fusionar código.
3. **Pre-Release:** Pruebas E2E antes de una versión en producción.

📌 **Ejemplo de script en `package.json` para ejecutar pruebas:**
```json
"scripts": {
  "test": "jest",
  "test:watch": "jest --watch",
  "test:e2e": "detox test"
}
```

---

## 🚀 **Beneficios de la Estrategia de Pruebas**

✅ Detección temprana de errores.
✅ Asegura estabilidad y calidad del código.
✅ Facilita refactorización sin romper funcionalidades.
✅ Reduce costos y tiempo en debugging.
