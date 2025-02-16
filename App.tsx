import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Config } from './src/core/config/environment/EnvConfig';

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>API Base URL: {Config.API_URL}</Text>
      <Text style={styles.text}>Entorno: {Config.ENV}</Text>
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
