// src/presentation/features/settings/view/SettingsScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { useTheme } from '@core/config/theme/ThemeContext';
import { useTranslation } from 'react-i18next';
import { Config } from '@core/config/environment/EnvConfig';

const SettingsScreen: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const showApiUrl = () => {
    Alert.alert('Configuración', `API URL: ${Config.get<string>('API_URL')}`);
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Text style={[styles.title, { color: theme.colors.text }]}>
        {t('settings.title', 'Configuración')}
      </Text>
      <Button
        title={t('settings.showApiUrl', 'Mostrar API URL')}
        onPress={showApiUrl}
        color={theme.colors.primary}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default SettingsScreen;
