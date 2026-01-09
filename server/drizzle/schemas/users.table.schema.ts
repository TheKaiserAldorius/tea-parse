import { bigserial, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const pgUsersSchema = pgTable('users', {
	userId: bigserial('user_id', { mode: 'bigint' }).primaryKey(),
	phone: text().notNull().unique(),
	password: text().notNull(),
	refreshToken: text('refresh_token'),
	created: timestamp().notNull().defaultNow(),
	updated: timestamp(),
});