import {
	bigserial,
	boolean,
	pgTable,
	text,
	timestamp,
} from 'drizzle-orm/pg-core';

import { pgCategoriesSchema } from './categories.table.schema';

export const pgProductsSchema = pgTable('products', {
	productId: bigserial('product_id', { mode: 'bigint' }).primaryKey(),
	categoryId: bigserial('category_id', { mode: 'bigint' }).references(
		() => pgCategoriesSchema.categoryId,
		{ onDelete: 'set null' }
	),
	name: text().notNull().unique(),
	description: text(),
	brewing: text(),
	images: text().notNull().array(),
	published: boolean().notNull().default(false),
	created: timestamp().notNull().defaultNow(),
	updated: timestamp(),
});