// src/core/config/environment/EnvConfig.ts
export const Config = {
    API_URL: process.env.EXPO_PUBLIC_API_URL || 'https://fallback-url.com',
    ENV: process.env.EXPO_PUBLIC_ENV || 'development',
    isProduction: process.env.EXPO_PUBLIC_ENV === 'production',
  };