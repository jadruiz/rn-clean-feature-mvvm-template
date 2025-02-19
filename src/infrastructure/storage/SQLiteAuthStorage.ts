// src/infrastructure/storage/SQLiteAuthStorage.ts
import { Platform } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Logger, LogLevel } from '@core/logging/Logger';
import { consoleAdapter } from '@core/logging/adapters/consoleAdapter';
import { User } from '@domain/entities/User';
import { PendingOperation } from '@domain/repositories/IAuthRepository';
import { Config } from '@core/config/environment/EnvConfig';

const logger = new Logger(consoleAdapter, LogLevel.DEBUG);
const dbName: string = Config.get<string>('DB_NAME') || 'default_rncfm.db';

// Async Database Initialization
let db: SQLite.SQLiteDatabase | null = null;

if (Platform.OS !== 'web') {
  db = SQLite.openDatabase(dbName);
}

console.log('SQLite module:', SQLite);
console.log('openDatabase:', db);
console.log('Platform:', Platform.OS);

if (!db) {
  console.warn(
    'SQLite no está disponible en esta plataforma, usando fallback.',
    dbName,
  );
}

// Function to ensure database availability
function getDatabase(): SQLite.SQLiteDatabase {
  if (!db) {
    throw new Error('SQLite database is not available on this platform.');
  }
  return db;
}

/**
 * Run migrations for setting up database tables
 */
function runMigrations(tx: SQLite.SQLTransaction): void {
  tx.executeSql(
    `CREATE TABLE IF NOT EXISTS auth_user (
      id TEXT PRIMARY KEY NOT NULL,
      username TEXT,
      password TEXT,
      token TEXT,
      timestamp INTEGER
    );`,
  );
  tx.executeSql(
    `CREATE TABLE IF NOT EXISTS pending_operations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL,
      payload TEXT NOT NULL,
      timestamp INTEGER
    );`,
  );
}

export class SQLiteAuthStorage {
  /**
   * Initializes the database and runs migrations
   */
  static init(): void {
    const database = getDatabase();
    database.transaction(
      (tx) => {
        runMigrations(tx);
        logger.info('SQLite: Tables initialized or updated');
      },
      (error) => {
        logger.error('SQLite: Error in migrations transaction', error);
      },
    );
  }

  /**
   * Persist a user in the SQLite database
   */
  static async persistUser(user: User): Promise<void> {
    return new Promise((resolve, reject) => {
      getDatabase().transaction(
        (tx) => {
          tx.executeSql(
            `INSERT OR REPLACE INTO auth_user (id, username, password, token, timestamp) VALUES (?, ?, ?, ?, ?)`,
            [
              user.id,
              user.username,
              user.password || '',
              user.token,
              user.timestamp,
            ],
            (_, result) => {
              logger.info('SQLite: User persisted successfully');
              resolve();
            },
            (_, error): boolean => {
              logger.error('SQLite: Error persisting user', error);
              reject(error);
              return false;
            },
          );
        },
        (error) => {
          logger.error('SQLite: Error in persistUser transaction', error);
          reject(error);
        },
      );
    });
  }

  /**
   * Retrieve the stored user
   */
  static async retrieveUser(): Promise<User | null> {
    return new Promise((resolve, reject) => {
      getDatabase().transaction(
        (tx) => {
          tx.executeSql(
            `SELECT * FROM auth_user LIMIT 1`,
            [],
            (_, result) => {
              if (result.rows.length > 0) {
                const user: User = result.rows.item(0);
                logger.info('SQLite: User retrieved', user);
                resolve(user);
              } else {
                resolve(null);
              }
            },
            (_, error): boolean => {
              logger.error('SQLite: Error retrieving user', error);
              reject(error);
              return false;
            },
          );
        },
        (error) => {
          logger.error('SQLite: Error in retrieveUser transaction', error);
          reject(error);
        },
      );
    });
  }

  /**
   * Clears the stored user
   */
  static async clearUser(): Promise<void> {
    return new Promise((resolve, reject) => {
      getDatabase().transaction(
        (tx) => {
          tx.executeSql(
            `DELETE FROM auth_user`,
            [],
            (_, result) => {
              logger.info('SQLite: User deleted successfully');
              resolve();
            },
            (_, error): boolean => {
              logger.error('SQLite: Error deleting user', error);
              reject(error);
              return false;
            },
          );
        },
        (error) => {
          logger.error('SQLite: Error in clearUser transaction', error);
          reject(error);
        },
      );
    });
  }

  /**
   * Authenticate a user by username and password
   */
  static async authenticateUser(
    username: string,
    password: string,
  ): Promise<User | null> {
    return new Promise((resolve, reject) => {
      getDatabase().transaction(
        (tx) => {
          tx.executeSql(
            `SELECT * FROM auth_user WHERE username = ? AND password = ? LIMIT 1`,
            [username, password],
            (_, result) => {
              if (result.rows.length > 0) {
                const user: User = result.rows.item(0);
                logger.info('SQLite: User authenticated', user);
                resolve(user);
              } else {
                logger.info('SQLite: No user found for provided credentials');
                resolve(null);
              }
            },
            (_, error): boolean => {
              logger.error('SQLite: Error authenticating user', error);
              reject(error);
              return false;
            },
          );
        },
        (error) => {
          logger.error('SQLite: Error in authenticateUser transaction', error);
          reject(error);
        },
      );
    });
  }

  /**
   * Enqueue a pending operation for synchronization
   */
  static async enqueueOperation(operation: PendingOperation): Promise<void> {
    return new Promise((resolve, reject) => {
      getDatabase().transaction(
        (tx) => {
          tx.executeSql(
            `INSERT INTO pending_operations (type, payload, timestamp) VALUES (?, ?, ?)`,
            [
              operation.type,
              JSON.stringify(operation.payload),
              operation.timestamp,
            ],
            (_, result) => {
              logger.info(
                `SQLite: Pending operation "${operation.type}" queued`,
              );
              resolve();
            },
            (_, error): boolean => {
              logger.error('SQLite: Error queuing pending operation', error);
              reject(error);
              return false;
            },
          );
        },
        (error) => {
          logger.error('SQLite: Error in enqueueOperation transaction', error);
          reject(error);
        },
      );
    });
  }

  /**
   * Retrieve all pending operations
   */
  static async getPendingOperations(): Promise<PendingOperation[]> {
    return new Promise((resolve, reject) => {
      getDatabase().transaction(
        (tx) => {
          tx.executeSql(
            `SELECT * FROM pending_operations`,
            [],
            (_, result) => {
              const operations: PendingOperation[] = [];
              for (let i = 0; i < result.rows.length; i++) {
                operations.push(result.rows.item(i));
              }
              logger.info(
                `SQLite: Retrieved ${operations.length} pending operation(s)`,
              );
              resolve(operations);
            },
            (_, error): boolean => {
              logger.error(
                'SQLite: Error retrieving pending operations',
                error,
              );
              reject(error);
              return false;
            },
          );
        },
        (error) => {
          logger.error(
            'SQLite: Error in getPendingOperations transaction',
            error,
          );
          reject(error);
        },
      );
    });
  }

  /**
   * Clears the queue of pending operations
   */
  static async clearPendingOperations(): Promise<void> {
    return new Promise((resolve, reject) => {
      getDatabase().transaction(
        (tx) => {
          tx.executeSql(
            `DELETE FROM pending_operations`,
            [],
            (_, result) => {
              logger.info('SQLite: Pending operation queue cleared');
              resolve();
            },
            (_, error): boolean => {
              logger.error('SQLite: Error clearing pending operations', error);
              reject(error);
              return false;
            },
          );
        },
        (error) => {
          logger.error(
            'SQLite: Error in clearPendingOperations transaction',
            error,
          );
          reject(error);
        },
      );
    });
  }
}
