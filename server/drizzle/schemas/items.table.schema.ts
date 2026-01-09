import {
	bigserial,
	boolean,
	integer,
	pgTable,
	timestamp,
} from 'drizzle-orm/pg-core';

import { qualityEnum, weightEnum } from './enums/enums';
import { pgOrdersSchema } from './orders.table.schema';
import { pgProductsSchema } from './products.table.schema';

export const pgItemsSchema = pgTable('items', {
	itemId: bigserial('item_id', { mode: 'bigint' }).primaryKey(),
	productId: bigserial('product_id', { mode: 'bigint' })
		.notNull()
		.references(() => pgProductsSchema.productId, { onDelete: 'restrict' }),
	orderId: bigserial('order_id', { mode: 'bigint' }).references(
		() => pgOrdersSchema.orderId,
		{ onDelete: 'restrict' }
	),
	weight: weightEnum().notNull(),
	quality: qualityEnum().notNull(),
	sold: boolean().notNull().default(false),
	discount: integer(),
	price: integer(),
	ordered: timestamp(),
	created: timestamp().notNull().defaultNow(),
	updated: timestamp(),
});