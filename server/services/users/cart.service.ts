import { db } from '@/server/drizzle';
import {
	qualities,
	tableCarts,
	tableCosts,
	weights,
} from '@/server/drizzle/schema';
import { TRPCError } from '@trpc/server';
import { and, asc, desc, eq, sql } from 'drizzle-orm';

export class CartService {
	static async getCart(userId: bigint) {
		const cartItems = await db
			.select({
				// userId: tableCarts.userId,
				productId: tableCarts.productId,
				weight: tableCarts.weight,
				quality: tableCarts.quality,
				amount: sql<string>`count(*)`.as('amount'),
				price: tableCosts.price,
				discount: tableCosts.discount,
			})
			.from(tableCarts)
			.innerJoin(tableCosts, () =>
				and(
					eq(tableCarts.productId, tableCosts.productId),
					eq(tableCarts.weight, tableCosts.weight),
					eq(tableCarts.quality, tableCosts.quality)
				)
			)
			.where(eq(tableCarts.userId, userId))
			.groupBy(
				tableCarts.productId,
				tableCarts.weight,
				tableCarts.quality,
				tableCosts.price,
				tableCosts.discount
			)
			.orderBy(desc(tableCarts.productId));

		return cartItems.map((el) => ({ ...el, amount: parseInt(el.amount) }));
	}

	static async addCartItem(product: {
		userId: bigint;
		productId: bigint;
		weight: (typeof weights.enumValues)[number];
		quality: (typeof qualities.enumValues)[number];
	}) {
		const result = await db.insert(tableCarts).values(product).returning();

		return result[0];
	}

	static async removeCartItemById(cartId: bigint) {
		const result = await db
			.delete(tableCarts)
			.where(eq(tableCarts.cartId, cartId))
			.returning();

		if (!result.length)
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: 'Товар в корзине пользователя не найден',
			});

		return result[0];
	}

	static async removeCartItemByParams(params: {
		userId: bigint;
		productId: bigint;
		weight: (typeof weights.enumValues)[number];
		quality: (typeof qualities.enumValues)[number];
	}) {
		const existing = await db
			.select()
			.from(tableCarts)
			.where(
				and(
					eq(tableCarts.userId, params.userId),
					eq(tableCarts.productId, params.productId),
					eq(tableCarts.weight, params.weight),
					eq(tableCarts.quality, params.quality)
				)
			)
			.orderBy(asc(tableCarts.created))
			.limit(1);

		if (!existing.length)
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: 'Товар в корзине пользователя не найден',
			});

		const deleted = await db
			.delete(tableCarts)
			.where(eq(tableCarts.cartId, existing[0].cartId))
			.returning();

		return deleted[0];
	}

	static async updateCartItem(product: {
		userId: bigint;
		cartId: bigint;
		productId: bigint;
		weight: (typeof weights.enumValues)[number];
		quality: (typeof qualities.enumValues)[number];
	}) {
		const result = await db
			.update(tableCarts)
			.set(product)
			.where(eq(tableCarts.cartId, product.cartId))
			.returning();

		return result[0];
	}
}