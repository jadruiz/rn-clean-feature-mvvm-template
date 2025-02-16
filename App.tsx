import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { ConfigAdapter } from '@core/config/environment/ConfigAdapter';

const config = ConfigAdapter.getInstance();

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>API Base URL: {config.get<string>('API_URL')}</Text>
      <Text style={styles.text}>Entorno: {config.get<string>('ENV')}</Text>
      <Text style={styles.text}>App: {config.get<string>('APP_NAME')}</Text>
      <Text style={styles.text}>Versión: {config.get<string>('VERSION')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
});

export default App;
