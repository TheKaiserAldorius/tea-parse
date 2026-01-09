import {
	bigserial,
	boolean,
	integer,
	pgTable,
	text,
	timestamp,
} from 'drizzle-orm/pg-core';

import { orderStatusEnum } from './enums/enums';
import { pgUsersSchema } from './users.table.schema';

export const pgOrdersSchema = pgTable('orders', {
	orderId: bigserial('order_id', { mode: 'bigint' }).primaryKey(),
	userId: bigserial('user_id', { mode: 'bigint' }).references(
		() => pgUsersSchema.userId,
		{ onDelete: 'set null' }
	),
	status: orderStatusEnum().notNull().default('pending'),
	itemsDiscount: integer('items_discount').notNull().default(0),
	cartDiscount: integer('cart_discount').notNull().default(0),
	totalCost: integer('total_cost').notNull().default(0),
	paid: boolean().notNull().default(false),
	name: text().notNull(),
	email: text(),
	address: text().notNull(),
	phone: text().notNull(),
	comment: text(),
	cardNumber: text('card_number'),
	created: timestamp().notNull().defaultNow(),
	updated: timestamp(),
});