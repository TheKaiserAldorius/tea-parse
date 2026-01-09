'use client';

import { useState } from 'react';
import { trpc } from '@/server/client';
import { qualities, weights as weightsEnum } from '@/server/drizzle/schema';
import { weightEnum } from '@/server/drizzle/schemas/enums/enums';
import { calculateDiscountPercent } from '@/utils/calculate-discount';

import { CartIcon } from '@/lib/icons/icons';
import { TLocalCartItem } from '@/lib/types/local-cart';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useLocalCart } from '@/components/cart-context';

import { AmountButtons } from './amount-buttons';
import { CategorySelect } from './category-select';

const weights = weightsEnum.enumValues;

export default function ItemsTeaParams({
	id,
	productName,
	toastDescription,
	prices,
}: {
	id: bigint;
	productName: string;
	toastDescription: Record<
		(typeof qualities.enumValues)[number],
		string | null
	>;
	prices: {
		weight: (typeof weightEnum.enumValues)[number];
		quality: (typeof qualities.enumValues)[number];
		price: number;
		discount: number;
	}[];
}) {
	const [weight, setWeight] = useState<(typeof weights)[number]>(weights[0]);

	const [category, setCategory] = useState(
		Object.keys(toastDescription)[0] as (typeof qualities.enumValues)[number]
	);

	const cost = prices.find(
		(el) => el.weight === weight && el.quality === category
	)?.price;

	const discount = prices.find(
		(el) => el.weight === weight && el.quality === category
	)?.discount;

	const getCart = trpc.cart.getCart.useQuery();
	const insertProduct = trpc.cart.insert.useMutation();
	const removeProduct = trpc.cart.deleteByParams.useMutation();

	console.log('cart', getCart.data);

	const { localCart, setLocalCart } = useLocalCart();

	const product = getCart.data
		? getCart.data.find(
				(product) =>
					product.productId === id &&
					product.weight === weight &&
					product.quality === category
			)
		: localCart.find(
				(product) =>
					product.productId === id.toString() &&
					product.weight === weight &&
					product.quality === category
			);

	const addToCart = () => {
		if (!getCart.data) {
			const updatedCart = localCart.reduce(
				(acc: { cart: TLocalCartItem[]; exist: boolean }, product) => {
					if (
						product.productId === id.toString() &&
						product.weight === weight &&
						product.quality === category
					) {
						acc.cart.push({ ...product, amount: product.amount + 1 });
						acc.exist = true;
					} else {
						acc.cart.push(product);
					}
					return acc;
				},
				{ cart: [], exist: false }
			);

			if (!updatedCart.exist && cost)
				updatedCart.cart.push({
					productId: id.toString(),
					weight: weight,
					quality: category,
					amount: 1,
					price: cost,
					discount: discount ?? 0,
				});

			setLocalCart(updatedCart.cart);
		} else {
			insertProduct.mutateAsync(
				{
					productId: id,
					weight: weight,
					quality: category,
				},
				{
					onSuccess: (data) => {
						console.log('data=', data);
						getCart.refetch();
					},
					onError: (e) => {
						console.error(e);
					},
				}
			);
		}
	};

	const removeFromCart = () => {
		if (!getCart.data) {
			const updatedCart = localCart.reduce((acc: TLocalCartItem[], product) => {
				if (
					product.productId === id.toString() &&
					product.weight === weight &&
					product.quality === category
				) {
					if (product.amount > 1) {
						acc.push({ ...product, amount: product.amount - 1 });
					} else {
						return acc;
					}
				} else {
					acc.push(product);
				}
				return acc;
			}, []);

			setLocalCart(updatedCart);
		} else {
			removeProduct.mutateAsync(
				{
					productId: id,
					weight: weight,
					quality: category,
				},
				{
					onSuccess: (data) => {
						getCart.refetch();
						console.log('data=', data);
					},
					onError: (e) => {
						console.error(e);
					},
				}
			);
		}
	};

	return (
		<>
			<div className="flex flex-col gap-4">
				<CategorySelect
					category={category}
					setCategory={setCategory}
					categoriesList={
						Object.keys(toastDescription) as typeof qualities.enumValues
					}
				/>
				{cost && (
					<div className="flex gap-2">
						<div className="mt-3 flex items-center gap-2">
							<p className="text-primary text-3xl font-semibold">
								{discount ? cost - discount : cost} ₽
							</p>
							{!!discount && (
								<p className="text-secondary-foreground text-sm line-through">
									{cost} ₽
								</p>
							)}
						</div>
						{!!discount && (
							<p className="bg-destructive text-background mb-auto rounded-xs px-2 py-1 text-xs">
								{calculateDiscountPercent(cost, cost - discount, true)}
							</p>
						)}
					</div>
				)}
				<p className="text-accent-foreground-dark mt-5">Масса:</p>
				<RadioGroup
					className="flex gap-4"
					defaultValue={weight.toString()}
					onValueChange={(v: (typeof weights)[number]) => setWeight(v)}
				>
					{weights.map((el) => (
						<div key={el}>
							<RadioGroupItem
								value={el.toString()}
								id={el.toString()}
								className="hidden"
							/>
							<Label
								htmlFor={el.toString()}
								className={cn(
									'bg-card flex size-12 items-center justify-center rounded-sm border hover:cursor-pointer',
									el === weight &&
										'border-primary-muted bg-primary-muted text-primary-foreground'
								)}
							>
								{el}г
							</Label>
						</div>
					))}
				</RadioGroup>
				<div className="flex items-center gap-6">
					{product ? (
						<div className="flex items-center gap-2">
							<p className="text-accent-foreground-dark">Кол-во:</p>
							<AmountButtons
								amount={product?.amount ?? 0}
								add={addToCart}
								remove={removeFromCart}
							/>
						</div>
					) : (
						<Button
							className="h-12 gap-2 rounded-full px-8"
							onClick={addToCart}
						>
							<p>В корзину</p>
							<CartIcon className="size-5" />
						</Button>
					)}
				</div>
			</div>
			<div className="flex flex-col gap-4">
				<h3 className="text-secondary-foreground text-2xl font-normal">
					{productName}
				</h3>
				<p className="text-muted-foreground font-normal">
					{toastDescription[category]}
				</p>
			</div>
		</>
	);
}