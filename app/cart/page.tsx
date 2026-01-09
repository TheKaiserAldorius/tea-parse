import Image from 'next/image';
import Link from 'next/link';
import { trpc } from '@/server/server';

import { Card } from '@/components/ui/card';
import { ItemAmount } from '@/components/cart/item-amount';
import { OrderInfo } from '@/components/cart/order-info';
import { ItemsCarousel } from '@/components/items/items-carousel/items-carousel';
import PageHeader from '@/components/page-header/page-header';

const itemsList = [
	{
		id: 1,
		title: 'Зеленый',
		link: 'green',
		src: '',
		cost: 1200,
		discount: 100,
	},
	{
		id: 2,
		title: 'Северно-Фудзяньские Улуны',
		link: 'north-fujian',
		src: '',
		cost: 2500,
	},
	{ id: 3, title: 'Шу Пуэры', link: 'shu', src: '', cost: 3800, discount: 500 },
	{ id: 4, title: 'Белый', link: 'white', src: '', cost: 800 },
	{
		id: 5,
		title: 'Южно-Фудзяньские Улуны',
		link: 'south-fujian',
		src: '',
		cost: 5100,
		discount: 1000,
	},
	{ id: 6, title: 'Шэн Пуэры', link: 'shen', src: '', cost: 650 },
	{ id: 7, title: 'Габа', link: 'gaba', src: '', cost: 7800, discount: 1500 },
	{ id: 8, title: 'Чайная утварь', link: 'utensils', src: '', cost: 1900 },
	{
		id: 9,
		title: 'Чайные добавки',
		link: 'supplements',
		src: '',
		cost: 7000,
		discount: 1400,
	},
];

const leaves = [
	{
		className: 'absolute -z-10 left-0 top-[189px]',
		width: 309,
		height: 374,
		src: '/images/leaves-cart-left.png',
	},
	{
		className: 'absolute -z-10 right-0 top-[500px]',
		width: 329,
		height: 544,
		src: '/images/leaves-cart-right.png',
	},
];

export default async function CartPage() {
	const cart = await trpc.cart.getCart();

	console.log('cart=', cart);

	return (
		<div className="relative">
			<div className="relative container flex flex-col gap-12 py-12">
				<PageHeader header="Корзина" />

				<section className="flex gap-6">
					<div className="flex flex-col gap-4">
						{itemsList.map((item, idx) => (
							<Card
								className="flex-row justify-between gap-6 border-2 p-6"
								key={item.title}
							>
								<Link
									className="group flex items-center gap-4"
									href={`/${item.link}`}
								>
									<Image
										className="group-hover:scale-110"
										src={`/mocked/categories/${item.link}.png`}
										alt="tea-image"
										width={96}
										height={96}
									/>
									<div className="text-secondary-foreground group-hover:text-accent-foreground">
										<p>{item.title}</p>
										<p>{`${'A'.repeat(3)}, ${300}г`}</p>
									</div>
								</Link>
								<ItemAmount
									amount={1 + idx * 2}
									cost={item.cost}
									discount={item.discount}
								/>
							</Card>
						))}
					</div>
					{<OrderInfo orderData={itemsList} />}
				</section>
				<section>
					<ItemsCarousel items={itemsList} />
				</section>
			</div>
			{leaves.map((leave) => (
				<Image
					className={leave.className}
					src={leave.src}
					alt="leave-image"
					width={leave.width}
					height={leave.height}
					key={leave.src}
				/>
			))}
		</div>
	);
}