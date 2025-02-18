// src/core/storage/LogEntry.ts
export interface LogEntry {
  timestamp: string; // Ej: "2025-02-16T15:23:10.123Z"
  level: string; // "DEBUG" | "INFO" | "WARN" | "ERROR"
  message: string; // Texto principal
  meta?: any; // Metadatos opcionales
}
