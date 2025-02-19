// src/presentation/features/auth/view/LoginScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useLoginViewModel } from '@presentation/features/auth/viewModel/LoginViewModel';
import { LoginUseCase } from '@domain/useCases/LoginUseCase';
import { SyncAuthUseCase } from '@domain/useCases/SyncAuthUseCase';
import { AuthRepository } from '@domain/repositories/AuthRepository';

// Instanciar los casos de uso utilizando el repositorio (puedes inyectarlos con un contenedor DI en el futuro)
const authRepository = new AuthRepository();
const loginUseCase = new LoginUseCase(authRepository);
const syncAuthUseCase = new SyncAuthUseCase(authRepository);

const LoginScreen: React.FC = () => {
  const { user, loading, error, login, syncAuth } = useLoginViewModel(
    loginUseCase,
    syncAuthUseCase,
  );
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Ejemplo: Si el usuario se autentica, podrías navegar a la pantalla principal
  useEffect(() => {
    if (user) {
      console.log('Usuario autenticado:', user);
      // Aquí se puede usar NavigationService o un hook de navegación para redirigir al Home.
    }
  }, [user]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuario"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {error && <Text style={styles.error}>{error}</Text>}
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <Button title="Ingresar" onPress={() => login(username, password)} />
      )}
      <Button title="Sincronizar" onPress={syncAuth} color="#007AFF" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  error: {
    color: 'red',
    marginBottom: 12,
    textAlign: 'center',
  },
});

export default LoginScreen;
