'use client';

import Link from 'next/link';
import { trpc } from '@/server/client';
import { setCookie } from 'cookies-next';

import { CartIcon, LoginButton, UserIcon } from '@/lib/icons/icons';
import { transformToNumericFormat } from '@/lib/string-formatters';
import { ELocalStorage } from '@/lib/types/enums/local-storage';
import { cn } from '@/lib/utils';

import { useLocalCart } from '../cart-context';
import { Button } from '../ui/button';

export const UserInfo = () => {
	const getCart = trpc.cart.getCart.useQuery();

	const loginUser = trpc.user.login.useMutation();

	const { localCart } = useLocalCart();

	console.log('getCart.data=', getCart.data ?? getCart.error);

	return (
		<div className="mt-0 ml-0 flex items-center gap-3 lg:mt-10 lg:ml-auto">
			<Button
				className="group relative"
				variant="ghost"
				size="wrapper"
				onClick={() => {
					loginUser.mutateAsync(
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
								setCookie('access', data.accessToken, {
									path: '/',
									maxAge: 60 * 60,
								});

								localStorage.removeItem(ELocalStorage.cart);

								window.location.reload();
							},
							onError: (e) => console.log(e),
						}
					);
				}}
			>
				<LoginButton />
				<div className="absolute flex gap-1 pr-2">
					<UserIcon className="text-primary-foreground" />
					<p className="text-primary-foreground text-base">Войти</p>
				</div>
			</Button>

			<Link href="/cart">
				<Button
					className={cn('gap-3', getCart.isLoading && 'animate-spin')}
					variant="ghost"
					size="wrapper"
				>
					<div className="bg-popover text-popover relative flex size-10 items-center justify-center rounded-full">
						<CartIcon className="text-primary size-6" />
						{!!(getCart.data?.length || localCart.length) &&
							!getCart.isLoading && (
								<p className="bg-destructive absolute -top-2.5 -right-0.5 flex size-5 items-center justify-center rounded-full text-sm font-semibold">
									{getCart.data?.reduce((acc, curr) => acc + curr.amount, 0) ??
										localCart.reduce((acc, curr) => acc + curr.amount, 0)}
								</p>
							)}
					</div>
					{!!getCart.data?.length && (
						<p className="text-primary min-w-16 text-sm">
							{`${transformToNumericFormat(
								getCart.data
									.reduce(
										(acc, curr) =>
											acc + (curr.price - curr.discount) * curr.amount,
										0
									)
									.toString()
							)} ₽`}
						</p>
					)}
				</Button>
			</Link>
		</div>
	);
};