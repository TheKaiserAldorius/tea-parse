import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '../trpc';
import { cartRouter } from './routers/cart.router';
import { categoryRouter } from './routers/category.router';
import { productRouter } from './routers/product.router';
import { userRouter } from './routers/user.router';

export const appRouter = createTRPCRouter({
	hello: publicProcedure
		.input(
			z.object({
				text: z.string(),
			})
		)
		.query((opts) => {
			// console.log('opts=', opts);
			return {
				greeting: `hello ${opts.input.text}`,
			};
		}),
	user: userRouter,
	cart: cartRouter,
	category: categoryRouter,
	product: productRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;