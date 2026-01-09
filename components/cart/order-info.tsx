'use server';

import Link from 'next/link';

import { cn } from '@/lib/utils';

import { Button } from '../ui/button';
import { Card } from '../ui/card';

export const OrderInfo = async ({
	orderData,
	isOrderPage = false,
}: {
	orderData: {
		id: number;
		title: string;
		link: string;
		src: string;
		cost: number;
		discount?: number;
	}[];
	isOrderPage?: boolean;
}) => {
	const orderSummary = [
		{
			label: 'Всего',
			sum: orderData.reduce((acc, curr) => acc + curr.cost, 0),
		},
		{
			label: 'Скидка',
			sum: orderData.reduce((acc, curr) => acc - (curr.discount ?? 0), 0),
		},
	];

	return (
		<Card className="mb-auto min-w-[400px] gap-24 rounded-md border-2 p-6">
			<div className="flex items-center justify-between">
				<h4 className="text-2xl">{isOrderPage ? 'Ваш заказ' : 'В корзине'}</h4>
				<p
					className={cn(
						'bg-destructive text-background flex size-10 items-center justify-center rounded-full',
						isOrderPage && 'bg-primary'
					)}
				>
					{orderData.length}
				</p>
			</div>
			<div className="flex flex-col gap-5">
				<div className="text-muted-foreground flex flex-col gap-2 font-normal">
					{orderSummary.map((el) => (
						<div className="flex justify-between" key={el.label}>
							<p>{el.label}</p>
							<p>{el.sum} ₽</p>
						</div>
					))}
				</div>
				<div className="mt-2 flex justify-between text-2xl">
					<p>Итого</p>
					<p>
						{`${orderSummary
							.slice(1)
							.reduce(
								(acc, curr) => acc - curr.sum,
								orderSummary.at(0)?.sum ?? 0
							)} ₽`}
					</p>
				</div>
				{!isOrderPage && (
					<Link href="/payment">
						<Button size="lg" className="w-full">
							Перейти к оформлению
						</Button>
					</Link>
				)}
			</div>
		</Card>
	);
};