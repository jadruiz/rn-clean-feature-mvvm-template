// src/infrastructure/storage/Database.ts
import * as SQLite from 'expo-sqlite';
import { drizzle, ExpoSQLiteDatabase } from 'drizzle-orm/expo-sqlite';
import { Logger, consoleAdapter, LogLevel } from '@core/logging';
import { users } from './schemas/users';
import { initialMigration } from './migrations/initialMigration';
import { Config } from '@core/config/environment/EnvConfig';

const logger = new Logger(consoleAdapter, LogLevel.INFO);

export type Schema = {
  users: typeof users;
};

/**
 * Verifica si una tabla existe en la base de datos.
 */
const tableExists = async (
  db: SQLite.SQLiteDatabase,
  tableName: string,
): Promise<boolean> => {
  try {
    const result = await db.getAllAsync(
      `SELECT name FROM sqlite_master WHERE type='table' AND name=?`,
      [tableName],
    );
    return result.length > 0;
  } catch (error) {
    throw error;
  }
};

/**
 * Inicializa la base de datos y ejecuta la migración manualmente si es necesario.
 */
export const initializeDatabase =
  async (): Promise<ExpoSQLiteDatabase<Schema> | null> => {
    try {
      logger.info('📦 Inicializando base de datos...');
      const db = SQLite.openDatabaseSync(Config.get('DB_NAME'));
      const drizzleClient = drizzle<Schema>(db, { schema: { users } });

      // 🔹 Verificar si la tabla "users" ya existe
      const usersTableExists = await tableExists(db, 'users');

      if (!usersTableExists) {
        logger.info('🚀 Ejecutando migraciones manualmente...');

        // Ejecutar cada sentencia SQL de la migración
        const statements = initialMigration
          .split(';')
          .filter((stmt) => stmt.trim().length > 0)
          .map((stmt) => stmt.trim());

        for (const statement of statements) {
          await db.execAsync(statement);
        }
        logger.info('✅ Migraciones aplicadas con éxito.');
      } else {
        logger.info('✅ La tabla "users" ya existe, omitiendo migraciones.');
      }

      return drizzleClient;
    } catch (error) {
      logger.error('❌ Fallo en la inicialización de la base de datos:', error);
      return null;
    }
  };
