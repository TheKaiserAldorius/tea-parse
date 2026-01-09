import { db } from '@/server/drizzle';
import {
	qualities,
	tableCosts,
	tableProducts,
	tableProductsDescription,
	weights,
} from '@/server/drizzle/schema';
import { pgCostsSchema } from '@/server/drizzle/schemas/costs.table.schema copy';
import { ProductInsertSchema } from '@/server/zod/product.schema';
import { TRPCError } from '@trpc/server';
import { and, eq } from 'drizzle-orm';
import z from 'zod';

export class ProductService {
	static async createProduct(product: {
		name: string;
		categoryId: bigint;
		description: string;
		brewing: string;
		images: string[];
		published: boolean | undefined;
		toastDescription: z.infer<typeof ProductInsertSchema>['toastDescription'];
		price: z.infer<typeof ProductInsertSchema>['price'];
	}) {
		Object.entries(product.price).forEach(([priceCategory, priceWeights]) =>
			Object.keys(priceWeights).forEach((priceWeight) => {
				if (
					!qualities.enumValues.includes(
						priceCategory as (typeof qualities.enumValues)[number]
					)
				)
					throw new TRPCError({
						code: 'BAD_REQUEST',
						message: `Нет категории ${priceCategory} в настройке стоимости`,
					});

				if (
					!weights.enumValues.includes(
						priceWeight as (typeof weights.enumValues)[number]
					)
				)
					throw new TRPCError({
						code: 'BAD_REQUEST',
						message: `Нет веса ${priceWeight}г. в настройке стоимости`,
					});
			})
		);

		const result = await db.insert(tableProducts).values(product).returning();

		const newProduct = result[0];

		await db.insert(tableProductsDescription).values({
			productId: newProduct.productId,
			A: product.toastDescription.A,
			AA: product.toastDescription.AA,
			'AA+': product.toastDescription['AA+'],
			'AA++': product.toastDescription['AA++'],
			AAA: product.toastDescription.AAA,
		});

		const pricePromises = Object.entries(product.price).flatMap(
			([priceCategory, priceWeights]) =>
				Object.entries(priceWeights).flatMap(([priceWeight, price]) =>
					db.insert(pgCostsSchema).values({
						productId: newProduct.productId,
						quality: priceCategory as (typeof qualities.enumValues)[number],
						weight: priceWeight as (typeof weights.enumValues)[number],
						price: price.price,
						discount: price.discount,
					})
				)
		);

		await Promise.all(pricePromises);

		return newProduct;
	}

	static async getById(productId: bigint) {
		const result = await db
			.select()
			.from(tableProducts)
			.where(
				and(
					eq(tableProducts.productId, productId),
					eq(tableProducts.published, true)
				)
			);

		if (!result.length)
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: 'Категория не найдена',
			});

		const product = result[0];

		const toastDescriptionPromise = db
			.select({
				A: tableProductsDescription.A,
				AA: tableProductsDescription.AA,
				'AA+': tableProductsDescription['AA+'],
				'AA++': tableProductsDescription['AA++'],
				AAA: tableProductsDescription.AAA,
			})
			.from(tableProductsDescription)
			.where(eq(tableProductsDescription.productId, product.productId));

		const pricesPromise = db
			.select({
				weight: tableCosts.weight,
				quality: tableCosts.quality,
				price: tableCosts.price,
				discount: tableCosts.discount,
			})
			.from(tableCosts)
			.where(eq(tableCosts.productId, product.productId));

		const [toastDescription, prices] = await Promise.all([
			toastDescriptionPromise,
			pricesPromise,
		]);

		return {
			...product,
			toastDescription: toastDescription[0],
			prices: prices,
		};
	}

	static async getByCategoryId(categoryId: bigint) {
		const products = await db
			.select()
			.from(tableProducts)
			.where(
				and(
					eq(tableProducts.categoryId, categoryId),
					eq(tableProducts.published, true)
				)
			);

		return products;
	}
}