export default {
  expo: {
    name: 'rn-clean-feature-mvvm-template',
    slug: 'rn-clean-feature-mvvm-template',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/images/splash-icon.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.jadruiz.rncleanfeaturemvvmtemplate',
    },
    android: {
      package: 'com.jadruiz.rncleanfeaturemvvmtemplate',
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
    },
    web: {
      favicon: './assets/images/favicon.png',
    },
    plugins: [
      '@morrowdigital/watermelondb-expo-plugin',
      [
        'expo-build-properties',
        {
          ios: {
            useFrameworks: 'static',
          },
          android: {
            kotlinVersion: '1.7.20',
            packagingOptions: {
              pickFirst: ['**/libc++_shared.so'],
            },
          },
        },
      ],
    ],
    extra: {
      EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL || 'https://api.example.com',
      EXPO_PUBLIC_ENV: process.env.EXPO_PUBLIC_ENV || 'development',
      EXPO_PUBLIC_STATE_ADAPTER: process.env.EXPO_PUBLIC_STATE_ADAPTER || 'redux',
      EXPO_PUBLIC_ENABLE_NEW_AUTH_FLOW: process.env.EXPO_PUBLIC_ENABLE_NEW_AUTH_FLOW === 'true',
      EXPO_PUBLIC_ENABLE_ADVANCED_ANALYTICS: process.env.EXPO_PUBLIC_ENABLE_ADVANCED_ANALYTICS === 'true',
      EXPO_PUBLIC_DB_NAME: process.env.EXPO_PUBLIC_DB_NAME || 'development_rncfm.db',
      EXPO_PRIVATE_SECRET_KEY: process.env.EXPO_PRIVATE_SECRET_KEY || 'default_secret_key',
      EXPO_PUBLIC_DB_REPOSITORY_TYPE: process.env.EXPO_PUBLIC_DB_REPOSITORY_TYPE || 'drizzle',
    },
  },
};
