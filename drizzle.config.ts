import 'dotenv/config';

import { defineConfig } from 'drizzle-kit';

import { getDbUrl } from './utils/get-db-url';

export default defineConfig({
	out: './server/drizzle/migrations',
	schema: './server/drizzle/schema.ts',
	dialect: 'postgresql',
	dbCredentials: {
		url: getDbUrl(),
	},
});