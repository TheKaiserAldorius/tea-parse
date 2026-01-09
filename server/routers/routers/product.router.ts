import { CategoryService } from '@/server/services/users/category.service';
import { ProductService } from '@/server/services/users/product.service';
import { protectedProcedure, publicProcedure } from '@/server/trpc';
import { ProductInsertSchema } from '@/server/zod/product.schema';
import { getLastUrlSegment } from '@/utils/get-last-url-segment';
import z from 'zod';

export const productRouter = {
	insert: protectedProcedure
		.input(ProductInsertSchema)
		.mutation(async (opts) => {
			const { input } = opts;

			const category = await CategoryService.getCategoryByUrl(
				getLastUrlSegment(input.categoryUrl)
			);

			const product = await ProductService.createProduct({
				...input,
				categoryId: category.categoryId,
				published: input.published,
			});

			return product;
		}),

	getById: publicProcedure.input(z.bigint()).query(async (opts) => {
		const { input } = opts;

		const product = await ProductService.getById(input);
		return product;
	}),

	getByCategoryId: publicProcedure.input(z.bigint()).query(async (opts) => {
		const products = await ProductService.getByCategoryId(opts.input);

		return products;
	}),
};