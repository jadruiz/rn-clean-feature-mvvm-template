import 'react-native-get-random-values';
import React, { useEffect, useState } from 'react';
import 'reflect-metadata';
import { Text, View, StyleSheet, Button, Alert, ActivityIndicator } from 'react-native';
import { Config } from '@core/config/environment/EnvConfig';
import { EncryptionService } from '@core/security/EncryptionService';
import { AccessibilityHelper } from '@core/a11y/AccessibilityHelper';
import { useA11yContext, A11yProvider } from '@core/a11y/A11yContext';
import GlobalErrorBoundary from '@core/error/GlobalErrorBoundary';
import { initApp } from '@core/config/initApp';
import { IStateAdapter } from '@core/state/interfaces/IStateAdapter';
import { RootState } from '@core/state/redux/store';

const AppContent = () => {
  const { screenReaderEnabled } = useA11yContext();

  const testEncryption = () => {
    try {
      const original = 'Texto de prueba';
      const encrypted = EncryptionService.encrypt(original);
      const decrypted = EncryptionService.decrypt(encrypted);
      AccessibilityHelper.announceForAccessibility('Prueba de encriptación completada');
      Alert.alert('Prueba de Encriptación', `Original: ${original}\nEncrypted: ${encrypted}\nDecrypted: ${decrypted}`);
    } catch (error) {
      console.error('Error en encriptación', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>API URL: {Config.get<string>('API_URL')}</Text>
      {screenReaderEnabled && <Text style={styles.a11yText}>Lector de pantalla activo</Text>}
      <Button title="Test Encryption" onPress={testEncryption} />
    </View>
  );
};

const App = () => {
  const [stateAdapter, setStateAdapter] = useState<IStateAdapter<RootState> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initApp().then((result) => {
      if (result && result.stateAdapter) {
        setStateAdapter(result.stateAdapter);
      }
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
      <A11yProvider>
        <AppContent />
      </A11yProvider>
    </GlobalErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  a11yText: {
    fontSize: 16,
    color: '#007AFF',
    marginVertical: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#007AFF',
    marginTop: 10,
  },
});

export default App;
