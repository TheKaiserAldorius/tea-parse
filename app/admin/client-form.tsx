'use client';

import { trpc } from '@/server/client';
import { setCookie } from 'cookies-next';

import { ELocalStorage } from '@/lib/types/enums/local-storage';
import { Button } from '@/components/ui/button';
import { useLocalCart } from '@/components/cart-context';

export function ClientForm() {
	const sendRequest = trpc.user.insert.useMutation();

	const { localCart } = useLocalCart();

	const onSubmit = () => {
		sendRequest.mutateAsync(
			{
				phone: '79165079932',
				password: 'FirstUser123',
				cart: localCart.map((el) => ({
					...el,
					productId: BigInt(el.productId),
				})),
			},
			{
				onSuccess: (data) => {
					console.log(data);
					setCookie('access', data.accessToken, { path: '/', maxAge: 60 * 60 });

					localStorage.removeItem(ELocalStorage.cart);
				},
				onError: (e) => console.error(e.message),
			}
		);
	};

	if (sendRequest.isPending) return <p>pending...</p>;

	return <Button onClick={onSubmit}>Submit</Button>;
}