// src/core/error/GlobalErrorBoundary.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { ErrorBoundary } from 'react-error-boundary';
import TelemetryService from '@core/observability/services/TelemetryService';

const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) => {
  // Reportar error a telemetría
  TelemetryService.getInstance().logError(error, { context: 'GlobalErrorBoundary' });

  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>¡Oops! Algo salió mal.</Text>
      <Text style={styles.errorDetails}>{error.message}</Text>
      <Button title="Reintentar" onPress={resetErrorBoundary} />
    </View>
  );
};

const GlobalErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>;
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  errorText: { fontSize: 18, fontWeight: 'bold', color: 'red', marginBottom: 10 },
  errorDetails: { fontSize: 14, textAlign: 'center', marginBottom: 10 },
});

export default GlobalErrorBoundary;
