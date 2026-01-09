import {
	bigserial,
	integer,
	pgTable,
	text,
	timestamp,
} from 'drizzle-orm/pg-core';

export const pgCategoriesSchema = pgTable('categories', {
	categoryId: bigserial('category_id', { mode: 'bigint' }).primaryKey(),
	position: integer('').notNull().default(0),
	name: text().notNull().unique(),
	url: text().notNull().unique(),
	imageLink: text('image_link').notNull(),
	created: timestamp().notNull().defaultNow(),
	updated: timestamp(),
});