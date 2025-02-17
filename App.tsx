// App.tsx
import 'react-native-get-random-values';
import React from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
// Configuración global: Usamos el singleton `Config` exportado desde EnvConfig.ts
import { Config } from '@core/config/environment/EnvConfig';
// Logging estructurado
import { Logger, consoleAdapter, LogLevel } from '@core/logging';
// Telemetría y monitoreo
import TelemetryService from '@core/telemetry/TelemetryService';
import { DummyAnalyticsAdapter } from '@core/telemetry/AnalyticsAdapter';
// Para probar la encriptación
import { EncryptionService } from '@core/security/EncryptionService';
// Inicializa la telemetría con el adaptador dummy
TelemetryService.initialize(new DummyAnalyticsAdapter());
// Registra un evento de inicio
TelemetryService.getInstance().logEvent('AppStarted', { timestamp: new Date().toISOString() });

try {
  // Simulación de error para telemetría
  throw new Error('Test error for telemetry');
} catch (error) {
  TelemetryService.getInstance().logError(error as Error, { extraInfo: 'Contexto adicional' });
}

// Inicializa el logger
const logger = new Logger(consoleAdapter, LogLevel.DEBUG);
logger.debug('Mensaje de depuración', { debugInfo: 'info extra' });
logger.info('Mensaje informativo');
logger.warn('Mensaje de advertencia');
logger.error('Mensaje de error', new Error('Oops!'));

const App = () => {
  // Función para probar la encriptación y desencriptación
  const testEncryption = () => {
    const original = 'Texto de prueba';
    const encrypted = EncryptionService.encrypt(original);
    const decrypted = EncryptionService.decrypt(encrypted);
    Alert.alert(
      'Prueba de Encriptación',
      `Original: ${original}\nEncrypted: ${encrypted}\nDecrypted: ${decrypted}`
    );
  };

  // Función para probar la telemetría, simulando un error
  const testTelemetry = () => {
    try {
      throw new Error('Error simulado para telemetría');
    } catch (error) {
      TelemetryService.getInstance().logError(error as Error, { test: 'Botón Telemetría' });
      Alert.alert('Prueba de Telemetría', 'Error registrado en telemetría');
    }
  };

  // Función para probar el logging
  const testLogging = () => {
    logger.info('Prueba de logging desde botón');
    Alert.alert('Prueba de Logging', 'Evento de log registrado');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>API Base URL: {Config.get<string>('API_URL')}</Text>
      <Text style={styles.text}>Entorno: {Config.get<string>('ENV')}</Text>
      <Text style={styles.text}>App: {Config.get<string>('APP_NAME')}</Text>
      <Text style={styles.text}>Versión: {Config.get<string>('VERSION')}</Text>

      <View style={styles.buttonContainer}>
        <Button title="Test Encryption" onPress={testEncryption} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Test Telemetry" onPress={testTelemetry} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Test Logging" onPress={testLogging} />
      </View>
    </View>
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
  buttonContainer: {
    marginVertical: 10,
    width: '100%',
  },
});

export default App;
