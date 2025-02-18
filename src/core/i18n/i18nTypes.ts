// src/core/i18n/i18nTypes.ts
import 'react-i18next';
import en from './locales/en.json';
import es from './locales/es.json';

// Declaramos los recursos que tenemos, mapeando cada idioma con su JSON
const resources = {
  en: {
    translation: en,
  },
  es: {
    translation: es,
  },
};

declare module 'react-i18next' {
  // Extiende la interfaz de `react-i18next` para usar nuestros recursos
  interface CustomTypeOptions {
    // defaultNS (namespace por defecto) si lo usas
    defaultNS: 'translation';
    // Definimos los recursos disponibles
    resources: (typeof resources)['en'] | (typeof resources)['es'];
  }
}
