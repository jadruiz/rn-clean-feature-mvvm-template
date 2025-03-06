// src/infrastructure/storage/schemas/index.ts
import { appSchema } from '@nozbe/watermelondb/Schema';
import { usersSchema } from '@infrastructure/storage/schemas/users';

export default appSchema({
  version: 1,
  tables: [
    usersSchema,
  ],
});
