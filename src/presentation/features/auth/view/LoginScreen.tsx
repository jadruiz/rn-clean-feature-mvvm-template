// src/presentation/features/auth/view/LoginScreen.tsx
import React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useLoginViewModel } from '@presentation/features/auth/viewModel/LoginViewModel';
import { AuthService } from '@core/auth/AuthService';
import { SQLiteAuthRepository } from '@infrastructure/data/repositories/SQLiteAuthRepository';

// Se crea una instancia del repositorio e inyecta el AuthService.
// En una implementación real, podrías inyectar estas dependencias mediante un contenedor de DI.
const authRepository = new SQLiteAuthRepository();
const authService = new AuthService(authRepository);

const LoginScreen: React.FC = () => {
  const {
    username,
    setUsername,
    password,
    setPassword,
    isLoading,
    error,
    login,
  } = useLoginViewModel(authService);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuario"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error && <Text style={styles.error}>{error}</Text>}
      {isLoading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <Button title="Entrar" onPress={login} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 12,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  error: {
    color: 'red',
    marginBottom: 12,
    textAlign: 'center',
  },
});

export default LoginScreen;
