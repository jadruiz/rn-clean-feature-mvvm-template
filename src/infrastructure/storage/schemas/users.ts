// src/infrastructure/storage/schemas/users.ts
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  username: text('username').unique().notNull(),
  password: text('password').notNull(),
  first_name: text('first_name').notNull(),
  last_name: text('last_name').notNull(),
  maternal_name: text('maternal_name'),
  status: text('status').notNull().default('pending_verification'),
  created_at: integer('created_at', { mode: 'timestamp' }).notNull(),
  updated_at: integer('updated_at', { mode: 'timestamp' }).notNull(),
  last_login_at: integer('last_login_at', { mode: 'timestamp' }),
});
