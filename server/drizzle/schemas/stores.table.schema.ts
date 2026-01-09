import { bigserial, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const pgStoresSchema = pgTable('stores', {
	storeId: bigserial('store_id', { mode: 'bigint' }).primaryKey(),
	name: text().unique(),
	address: text('address').notNull(),
	phone: text().notNull(),
	email: text(),
	imageLinks: text('image_links').array(),
	created: timestamp().notNull().defaultNow(),
	updated: timestamp(),
});