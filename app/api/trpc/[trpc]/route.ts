import { appRouter } from '@/server/routers/routers';
import { createTRPCContext } from '@/server/trpc';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

import { applyCors } from '@/lib/cors';

const handler = async (req: Request) => {
	console.log(`incoming request ${req.url}`);

	const res = await fetchRequestHandler({
		endpoint: '/api/trpc',
		req,
		router: appRouter,
		createContext: (nextFetchCtx) => {
			return createTRPCContext(nextFetchCtx);
		},
	});
	applyCors(res);

	return res;
};

const preflightHandler = async () => {
	const res = new Response(null, { status: 204 });

	applyCors(res);
	return res;
};

export { handler as GET, handler as POST, preflightHandler as OPTIONS };