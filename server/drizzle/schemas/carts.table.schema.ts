import { bigserial, pgTable, timestamp } from 'drizzle-orm/pg-core';

import { qualityEnum, weightEnum } from './enums/enums';
import { pgProductsSchema } from './products.table.schema';
import { pgUsersSchema } from './users.table.schema';

export const pgCartSchema = pgTable('carts', {
	cartId: bigserial('cart_id', { mode: 'bigint' }).primaryKey(),
	userId: bigserial('user_id', { mode: 'bigint' }).references(
		() => pgUsersSchema.userId,
		{ onDelete: 'cascade' }
	),
	productId: bigserial('product_id', { mode: 'bigint' }).references(
		() => pgProductsSchema.productId,
		{ onDelete: 'cascade' }
	),
	weight: weightEnum().notNull(),
	quality: qualityEnum().notNull(),
	created: timestamp().notNull().defaultNow(),
	updated: timestamp(),
});