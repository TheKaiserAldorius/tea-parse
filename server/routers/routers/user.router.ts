import { CartService } from '@/server/services/users/cart.service';
import { UserService } from '@/server/services/users/user.service';
import { publicProcedure } from '@/server/trpc';
import { CartInsertSchema } from '@/server/zod/cart.schema';
import { UserInsertSchema } from '@/server/zod/user.schema';
import { hashPassword } from '@/utils/hash-passwords';
import z from 'zod';

export const userRouter = {
	insert: publicProcedure.input(UserInsertSchema).mutation(async (opts) => {
		console.log('input=', opts.input);

		const hashed = await hashPassword(opts.input.password);

		const newUser = await UserService.createUser({
			phone: opts.input.phone,
			password: hashed,
		});

		return {
			userId: newUser.userId,
			created: newUser.created,
			phone: newUser.phone,
			accessToken: newUser.accessToken,
			refreshToken: newUser.refreshToken,
		};
	}),

	getUserData: publicProcedure.query(async (opts) => {
		return opts.ctx.user?.id ?? null;
	}),

	login: publicProcedure.input(UserInsertSchema).mutation(async (opts) => {
		const { input } = opts;

		console.log('input=', input);

		const cartItems = input.cart.reduce(
			(acc: z.infer<typeof CartInsertSchema>[], curr) => {
				const items = Array.from({
					length: curr.amount,
				}).map(() => ({
					productId: curr.productId,
					weight: curr.weight,
					quality: curr.quality,
				}));

				return acc.concat(items);
			},
			[]
		);

		console.log('cart items=', cartItems);

		const user = await UserService.login({
			phone: input.phone,
			password: input.password,
		});

		await Promise.all([
			UserService.login({
				phone: input.phone,
				password: input.password,
			}),
			cartItems.map((el) =>
				CartService.addCartItem({ ...el, userId: user.userId })
			),
		]);

		return user;
	}),
};