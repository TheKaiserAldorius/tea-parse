import { CartService } from '@/server/services/users/cart.service';
import { protectedProcedure, publicProcedure } from '@/server/trpc';
import { CartInsertSchema } from '@/server/zod/cart.schema';

export const cartRouter = {
	getCart: publicProcedure.query(async (opts) => {
		if (!opts.ctx.user) return null;

		const cart = await CartService.getCart(BigInt(opts.ctx.user.id));

		return cart;
	}),

	insert: protectedProcedure.input(CartInsertSchema).mutation(async (opts) => {
		const { input, ctx } = opts;

		const item = CartService.addCartItem({
			...input,
			userId: BigInt(ctx.user?.id ?? ''),
		});

		return item;
	}),

	deleteByParams: protectedProcedure
		.input(CartInsertSchema)
		.mutation(async (opts) => {
			const { input, ctx } = opts;

			const item = CartService.removeCartItemByParams({
				...input,
				userId: BigInt(ctx.user?.id ?? ''),
			});

			return item;
		}),

	// createCart: protectedProcedure.input(z.string()).mutation(async (opts) => {}),
};