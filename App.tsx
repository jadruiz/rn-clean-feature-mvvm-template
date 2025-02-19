// App.jsx
import 'reflect-metadata';
//import 'react-native-get-random-values';
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { I18nextProvider } from 'react-i18next';
import i18n from '@core/i18n/i18n';
import GlobalErrorBoundary from '@presentation/components/GlobalErrorBoundary';
import { initApp } from '@core/config/initApp';
import { ThemeProvider } from '@core/config/theme/ThemeContext';
import { AuthProvider } from '@core/auth/AuthProvider';
import AppNavigator from '@presentation/navigation/AppNavigator';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initApp()
      .then(() => setLoading(false))
      .catch((error) => {
        console.error('Error en la inicialización de la aplicación', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Cargando aplicación...</Text>
      </View>
    );
  }

  return (
    <GlobalErrorBoundary>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider>
          <AuthProvider>
            <AppNavigator />
          </AuthProvider>
        </ThemeProvider>
      </I18nextProvider>
    </GlobalErrorBoundary>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    marginTop: 10,
  },
});

export default App;
