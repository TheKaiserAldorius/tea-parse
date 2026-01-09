import {
	bigserial,
	boolean,
	integer,
	pgTable,
	text,
	timestamp,
} from 'drizzle-orm/pg-core';

import { pgCategoriesSchema } from './categories.table.schema';
import { qualityEnum, weightEnum } from './enums/enums';
import { pgProductsSchema } from './products.table.schema';

export const pgDiscountsSchema = pgTable('discounts', {
	discountId: bigserial('discount_id', { mode: 'bigint' }).primaryKey(),
	name: text().notNull(),
	categoryId: bigserial('category_id', { mode: 'bigint' }).references(
		() => pgCategoriesSchema.categoryId,
		{ onDelete: 'set null' }
	),
	productId: bigserial('product_id', { mode: 'bigint' })
		.notNull()
		.references(() => pgProductsSchema.productId, { onDelete: 'set null' }),
	weight: weightEnum(),
	quality: qualityEnum(),
	costLimit: integer('cost_limit'),
	itemsLimit: integer('items_limit'),
	isPercentage: boolean('is_percentage').notNull().default(false),
	isMultiple: boolean().notNull().default(false),
	autoApply: boolean().notNull().default(false),
	discount: integer().notNull().default(0),
	code: text().notNull(),
	started: timestamp().notNull().defaultNow(),
	expired: timestamp().notNull(),
	created: timestamp().notNull().defaultNow(),
	updated: timestamp(),
});