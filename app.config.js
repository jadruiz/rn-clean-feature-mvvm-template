// app.config.js
import 'dotenv/config';

export default {
  name: 'rn-clean-feature-mvvm-template',
  slug: 'rn-clean-feature-mvvm-template',
  version: '1.0.0',
  plugins: ['expo-sqlite'],
  extra: {
    // Variables públicas para ser accesibles en el frontend
    EXPO_PUBLIC_API_URL:
      process.env.EXPO_PUBLIC_API_URL || 'https://api.example.com',
    EXPO_PUBLIC_ENV: process.env.EXPO_PUBLIC_ENV || 'development',
    EXPO_PUBLIC_STATE_ADAPTER: process.env.EXPO_PUBLIC_STATE_ADAPTER || 'redux',
    EXPO_PUBLIC_ENABLE_NEW_AUTH_FLOW:
      process.env.EXPO_PUBLIC_ENABLE_NEW_AUTH_FLOW === 'true',
    EXPO_PUBLIC_ENABLE_ADVANCED_ANALYTICS:
      process.env.EXPO_PUBLIC_ENABLE_ADVANCED_ANALYTICS === 'true',
    EXPO_PUBLIC_DB_NAME:
      process.env.EXPO_PUBLIC_DB_NAME || 'development_rncfm.db',
    // Variables privadas: NO deben ser incluidas en el frontend
    EXPO_PRIVATE_SECRET_KEY:
      process.env.EXPO_PRIVATE_SECRET_KEY || 'default_secret_key',
    EXPO_PUBLIC_DB_REPOSITORY_TYPE:
      process.env.EXPO_PUBLIC_DB_REPOSITORY_TYPE || 'drizzle',
  },
};
