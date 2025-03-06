// src/infrastructure/storage/schemas/users.ts
import { tableSchema } from '@nozbe/watermelondb/Schema';

export const usersSchema = tableSchema({
  name: 'users',
  columns: [
    { name: 'username', type: 'string' },
    { name: 'password', type: 'string' },
    { name: 'first_name', type: 'string' },
    { name: 'last_name', type: 'string' },
    { name: 'maternal_name', type: 'string', isOptional: true },
    { name: 'status', type: 'string' },
    { name: 'created_at', type: 'number' },
    { name: 'updated_at', type: 'number' },
    { name: 'last_login_at', type: 'number', isOptional: true },
  ],
});
