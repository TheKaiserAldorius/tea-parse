'use client';

import { trpc } from '@/server/client';

export function ClientGreeting() {
	const greeting = trpc.hello.useQuery({ text: 'client' });

	if (greeting.isLoading) return <div>Loading...</div>;

	return <div>{greeting.data?.greeting}</div>;
}