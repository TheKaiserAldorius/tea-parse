'use server';

import Image from 'next/image';
import { trpc } from '@/server/server';

import { ItemImages } from '@/components/items/item-images/item-images';
import { ItemsCarousel } from '@/components/items/items-carousel/items-carousel';
import { ItemsTabs } from '@/components/items/items-tabs/items-tabs';
import ItemsTeaParams from '@/components/items/items-tea-params/items-tea-params';
import PageHeader from '@/components/page-header/page-header';

const leaves = [
	{
		className: 'absolute -z-10 left-0 top-[678px]',
		width: 319,
		height: 416,
		src: '/images/leaves-item-left.png',
	},
	{
		className: 'absolute -z-10 right-0 top-[189px]',
		width: 288,
		height: 406,
		src: '/images/leaves-item-right.png',
	},
];

// const item = {
// 	id: 1,
// 	name: 'Сиху Лунцзин',
// 	cost: 2500,
// 	discount: 1800,
// };

const itemsList = [
	{ id: 1, title: 'Зеленый', link: 'green', src: '' },
	{ id: 2, title: 'Северно-Фудзяньские Улуны', link: 'north-fujian', src: '' },
	{ id: 3, title: 'Шу Пуэры', link: 'shu', src: '' },
	{ id: 4, title: 'Белый', link: 'white', src: '' },
	{ id: 5, title: 'Южно-Фудзяньские Улуны', link: 'south-fujian', src: '' },
	{ id: 6, title: 'Шэн Пуэры', link: 'shen', src: '' },
	{ id: 7, title: 'Габа', link: 'gaba', src: '' },
	{ id: 8, title: 'Чайная утварь', link: 'utensils', src: '' },
	{ id: 9, title: 'Чайные добавки', link: 'supplements', src: '' },
];

export default async function ProductPage({
	params,
}: Readonly<{
	params: Promise<{ id: string }>;
}>) {
	const product = await trpc.product.getById(BigInt((await params).id));

	return (
		<div className="relative">
			<div className="relative container flex flex-col gap-12 py-12">
				<PageHeader header={product.name} />

				<section className="flex gap-5">
					{product.images && <ItemImages images={product.images} />}
					<div className="flex flex-col gap-6">
						<ItemsTeaParams
							id={product.productId}
							productName={product.name}
							toastDescription={product.toastDescription}
							prices={product.prices}
						/>
					</div>
				</section>
				<section>
					<ItemsTabs
						description={product.description ?? ''}
						brewing={product.brewing ?? ''}
					/>
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