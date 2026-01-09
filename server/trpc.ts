import { env } from '@/env';
import { initTRPC, TRPCError } from '@trpc/server';
import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import jwt from 'jsonwebtoken';
import superjson from 'superjson';

export interface JwtUserData {
	id: string;
	phone: string;
	iat: number;
	exp: number;
}

export const createTRPCContext = async (opts: FetchCreateContextFnOptions) => {
	const token = opts.req.headers.get('authorization')?.split(' ')[1];

	// console.log('tokens=', opts.req.headers);
	let user = undefined;

	if (token) {
		try {
			const userData = jwt.verify(token, env.JWT_SECRET) as JwtUserData;

			user = userData;

			console.log('user=', user);
		} catch (error) {
			console.error('Token verification failed:', error);
		}
	}
	return { ...opts, user };
};

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;

const t = initTRPC.context<Context>().create({
	transformer: superjson,
});

export const createTRPCRouter = t.router;
export const middleware = t.middleware;
export const createCallerFactory = t.createCallerFactory;

export const publicProcedure = t.procedure;

export const protectedProcedure = publicProcedure.use((opts) => {
	if (!opts.ctx.user)
		throw new TRPCError({
			message: 'Пользователь не найден',
			code: 'FORBIDDEN',
		});

	return opts.next();
});