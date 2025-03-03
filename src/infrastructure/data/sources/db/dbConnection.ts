// src/infrastructure/data/sources/db/dbConnection.ts
import { SQLiteDatabase } from 'expo-sqlite';
import { drizzle, ExpoSQLiteDatabase } from 'drizzle-orm/expo-sqlite';
import { users } from '@infrastructure/storage/schemas/users';
import { Logger, consoleAdapter, LogLevel } from '@core/logging';
import { Schema } from '@infrastructure/storage/Database';
import * as SQLiteModule from 'expo-sqlite';

const logger = new Logger(consoleAdapter, LogLevel.INFO);

export class DatabaseConnection {
  private static instance: DatabaseConnection;
  private db: SQLiteDatabase | null = null;
  private drizzleDB: ExpoSQLiteDatabase<Schema> | null = null;

  private constructor() {}

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  public async initialize(): Promise<void> {
    try {
      logger.info('Initializing database connection');
      // Usar openDatabaseSync desde expo-sqlite
      this.db = SQLiteModule.openDatabaseSync('appDatabase.db');
      this.drizzleDB = drizzle<Schema>(this.db, { schema: { users } });
      logger.info('Database connection initialized successfully');
    } catch (error) {
      logger.error('Failed to initialize database', error);
      throw new Error('Database initialization failed');
    }
  }

  public getDB(): ExpoSQLiteDatabase<Schema> {
    if (!this.drizzleDB) {
      throw new Error('Database not initialized');
    }
    return this.drizzleDB;
  }

  public getRawDB(): SQLiteDatabase {
    if (!this.db) {
      throw new Error('Database not initialized');
    }
    return this.db;
  }
}
