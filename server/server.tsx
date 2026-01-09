import 'server-only'; // <-- ensure this file cannot be imported from the client

import { cache } from 'react';
import { headers } from 'next/headers';
import { NextRequest } from 'next/server';
import { createHydrationHelpers } from '@trpc/react-query/rsc';
import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';

import { makeQueryClient } from './query-client';
import { appRouter } from './routers/routers';
import { createCallerFactory, createTRPCContext } from './trpc';

export const getQueryClient = cache(makeQueryClient);
const caller = createCallerFactory(appRouter)(async () => {
	const headerList = await headers();

	const authHeader =
		headerList
			.get('cookie')
			?.split('; ')
			.find((el) => el.startsWith('access'))
			?.slice(7) ?? '';

	const newHeaders = new Headers(headerList);
	newHeaders.set('Authorization', `Bearer ${authHeader}`);

	const url =
		headerList.get('x-forwarded-proto') && headerList.get('x-forwarded-host')
			? `${headerList.get('x-forwarded-proto')}://${headerList.get('x-forwarded-host')}`
			: 'http://localhost:3000';

	const opts: FetchCreateContextFnOptions = {
		req: new NextRequest(url, {
			method: 'GET',
			headers: newHeaders,
		}),
		resHeaders: new Headers(),
		info: {
			accept: 'application/jsonl',
			type: 'query',
			isBatchCall: false,
			calls: [],
			url: null,
			connectionParams: null,
			signal: new AbortController().signal,
		},
	};

	// console.log('caller opts=', opts);

	return await createTRPCContext(opts);
});

export const { trpc, HydrateClient } = createHydrationHelpers<typeof appRouter>(
	caller,
	getQueryClient
);