// App.tsx
import 'react-native-get-random-values';
import React, { useRef } from 'react';
import 'reflect-metadata';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import { Config } from '@core/config/environment/EnvConfig';
import { EncryptionService } from '@core/security/EncryptionService';
import { AccessibilityHelper } from '@core/a11y/AccessibilityHelper';
import { useA11yContext, A11yProvider } from '@core/a11y/A11yContext';
import GlobalErrorBoundary from '@core/error/GlobalErrorBoundary';

// Inicialización Global
import '@core/config/initApp';

const AppContent = () => {
  const { screenReaderEnabled } = useA11yContext();
  const firstButtonRef = useRef(null);

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
      <Button title="Test Encryption" onPress={testEncryption} ref={firstButtonRef} />
    </View>
  );
};

const App = () => (
  <GlobalErrorBoundary>
    <A11yProvider>
      <AppContent />
    </A11yProvider>
  </GlobalErrorBoundary>
);

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
});

export default App;
