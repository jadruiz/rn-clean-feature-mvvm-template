// src/infrastructure/storage/migrations/initialMigration.ts
export const initialMigration = `
CREATE TABLE users (
	id text PRIMARY KEY NOT NULL,
	username text NOT NULL,
	password text NOT NULL,
	first_name text NOT NULL,
	last_name text NOT NULL,
	maternal_name text,
	status text DEFAULT 'pending_verification' NOT NULL,
	created_at integer NOT NULL,
	updated_at integer NOT NULL,
	last_login_at integer
);

CREATE UNIQUE INDEX users_username_unique ON users (username);
`;
