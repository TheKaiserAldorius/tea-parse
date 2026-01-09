import { bigserial, integer, pgTable, timestamp } from 'drizzle-orm/pg-core';

import { qualityEnum, weightEnum } from './enums/enums';
import { pgProductsSchema } from './products.table.schema';

export const pgCostsSchema = pgTable('costs', {
	costId: bigserial('cost_id', { mode: 'bigint' }).primaryKey(),
	productId: bigserial('product_id', { mode: 'bigint' })
		.notNull()
		.references(() => pgProductsSchema.productId, { onDelete: 'restrict' }),
	weight: weightEnum().notNull(),
	quality: qualityEnum().notNull(),
	price: integer().notNull(),
	discount: integer().notNull().default(0),
	created: timestamp().notNull().defaultNow(),
	updated: timestamp(),
});