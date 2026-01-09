import { pgEnum } from 'drizzle-orm/pg-core';

export const qualityEnum = pgEnum('product_quality', [
	'A',
	'AA',
	'AA+',
	'AA++',
	'AAA',
]);

export const weightEnum = pgEnum('product_weight', [
	'35',
	'70',
	'100',
	'200',
	'300',
]);

export const orderStatusEnum = pgEnum('order_status', [
	'pending',
	'processing',
	'shipped',
	'delivered',
	'canceled',
]);