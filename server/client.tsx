'use client';

import { useState } from 'react';
import type { QueryClient } from '@tanstack/react-query';
import { QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import { getCookie } from 'cookies-next';
import superjson from 'superjson';

import { makeQueryClient } from './query-client';
import type { AppRouter } from './routers/routers';

export const trpc = createTRPCReact<AppRouter>();

let clientQueryClientSingleton: QueryClient;

function getQueryClient() {
	if (typeof window === 'undefined') {
		return makeQueryClient();
	}

	return (clientQueryClientSingleton ??= makeQueryClient());
}

function getUrl() {
	const base = (() => {
		if (typeof window !== 'undefined') return '';
		if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;

		return 'http://localhost:3000';
	})();

	return `${base}/api/trpc`;
}

export function TRPCProvider(
	props: Readonly<{
		children: React.ReactNode;
	}>
) {
	const queryClient = getQueryClient();

	const accessCookie = getCookie('access');

	const [trpcClient] = useState(() =>
		trpc.createClient({
			links: [
				httpBatchLink({
					url: getUrl(),
					transformer: superjson,
					async headers() {
						return {
							...{
								Authorization: `Bearer ${accessCookie ?? ''}`,
							},
						};
					},
				}),
			],
		})
	);

	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>
				{props.children}
			</QueryClientProvider>
		</trpc.Provider>
	);
}