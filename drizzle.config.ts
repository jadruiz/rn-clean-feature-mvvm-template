// drizzle.config.ts
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/infrastructure/storage/schemas/*.ts',
  out: './drizzle/migrations',
  dialect: 'sqlite',
  driver: 'expo',
});
