// src/core/i18n/LanguageSwitcher.tsx
import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import i18n from './i18n';

const LanguageSwitcher: React.FC = () => {
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    // Implementar persistencia en settings db u otro medio
  };

  return (
    <View style={styles.container}>
      <Button title="EN" onPress={() => changeLanguage('en')} />
      <Button title="ES" onPress={() => changeLanguage('es')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 10,
  },
});

export default LanguageSwitcher;
