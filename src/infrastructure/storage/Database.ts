// src/infrastructure/storage/Database.ts
import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import schema from '@infrastructure/storage/schemas';
import User from '@infrastructure/storage/models/User';

const adapter = new SQLiteAdapter({
  schema,
  dbName: 'MyAppDatabase', 
});

export const database = new Database({
  adapter,
  modelClasses: [User]
});
