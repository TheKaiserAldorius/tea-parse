import { CategoryService } from '@/server/services/users/category.service';
import { protectedProcedure, publicProcedure } from '@/server/trpc';
import { CategoryInsertSchema } from '@/server/zod/category.schema';
import z from 'zod';

export const categoryRouter = {
	insert: protectedProcedure
		.input(CategoryInsertSchema)
		.mutation(async (opts) => {
			const { input } = opts;
			const category = await CategoryService.createCategory({
				name: input.name,
				url: input.url,
				imageLink: input.imageLink,
			});

			return category;
		}),

	list: publicProcedure.query(async () => {
		return await CategoryService.getCategories();
	}),

	getByUrl: publicProcedure.input(z.string()).query(async (opts) => {
		const { input } = opts;
		return await CategoryService.getCategoryByUrl(input);
	}),
};