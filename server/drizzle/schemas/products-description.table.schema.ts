import { bigint, pgTable, text } from 'drizzle-orm/pg-core';

import { pgProductsSchema } from './products.table.schema';

export const pgProductsDescriptionSchema = pgTable('products-description', {
	productId: bigint('product_id', { mode: 'bigint' })
		.references(() => pgProductsSchema.productId, { onDelete: 'set null' })
		.primaryKey(),
	A: text(),
	AA: text(),
	'AA+': text(),
	'AA++': text(),
	AAA: text(),
});