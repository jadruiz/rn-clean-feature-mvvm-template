// App.jsx
import 'reflect-metadata';
import 'react-native-get-random-values';
import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Button,
  Alert,
} from 'react-native';
import { I18nextProvider } from 'react-i18next';
import i18n from '@core/i18n/i18n';
import LanguageSwitcher from '@core/i18n/LanguageSwitcher';
import { Config } from '@core/config/environment/EnvConfig';
import { EncryptionService } from '@core/security/EncryptionService';
import { AccessibilityHelper } from '@core/a11y/AccessibilityHelper';
import { A11yProvider, useA11yContext } from '@core/a11y/A11yContext';
import GlobalErrorBoundary from '@presentation/components/GlobalErrorBoundary';
import { initApp } from '@core/config/initApp';
import { ThemeProvider, useTheme } from '@core/config/theme/ThemeContext';
import { useTranslation } from 'react-i18next';
import { useNetworkStatus } from '@common/hooks/useNetworkStatus';

const AppContent = () => {
  const { t } = useTranslation();
  const { screenReaderEnabled } = useA11yContext();
  const { theme, toggleTheme } = useTheme();

  const { isConnected, connectionType } = useNetworkStatus();

  const testEncryption = () => {
    try {
      const original = 'Texto de prueba';
      // Asumimos que initApp ya llamó a EncryptionService.initSecretKey()
      const encrypted = EncryptionService.encrypt(original);
      const decrypted = EncryptionService.decrypt(encrypted);
      AccessibilityHelper.announceForAccessibility(
        'Prueba de encriptación completada',
      );
      Alert.alert(
        'Prueba de Encriptación',
        `Original: ${original}\nEncrypted: ${encrypted}\nDecrypted: ${decrypted}`,
      );
    } catch (error) {
      console.error('Error en encriptación', error);
    }
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Text style={[styles.text, { color: theme.colors.text }]}>
        API URL: {Config.get('API_URL')}
      </Text>
      <Text
        style={[styles.networkText, { color: isConnected ? 'green' : 'red' }]}
      >
        {isConnected ? '🟢 Conectado' : '🔴 Sin conexión'}
      </Text>
      <Text style={[styles.networkType, { color: theme.colors.primary }]}>
        Tipo de Conexión: {connectionType}
      </Text>
      {screenReaderEnabled && (
        <Text style={[styles.a11yText, { color: theme.colors.primary }]}>
          Lector de pantalla activo
        </Text>
      )}
      <Button
        title="Test Encryption"
        onPress={testEncryption}
        color={theme.colors.primary}
      />
      <LanguageSwitcher />
      <Text style={[styles.welcomeText, { color: theme.colors.text }]}>
        {t('welcome')}
      </Text>
      <Button
        title="Toggle Theme"
        onPress={toggleTheme}
        color={theme.colors.secondary}
      />
    </View>
  );
};

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Cargando aplicación...</Text>
        <LanguageSwitcher />
      </View>
    );
  }

  return (
    <GlobalErrorBoundary>
      <I18nextProvider i18n={i18n}>
        <A11yProvider>
          <ThemeProvider>
            <AppContent />
          </ThemeProvider>
        </A11yProvider>
      </I18nextProvider>
    </GlobalErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  networkText: {
    fontSize: 16,
    marginBottom: 10,
  },
  networkType: {
    fontSize: 14,
    marginBottom: 10,
  },
  a11yText: {
    fontSize: 16,
    marginVertical: 10,
  },
  welcomeText: {
    fontSize: 20,
    marginTop: 20,
  },
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
