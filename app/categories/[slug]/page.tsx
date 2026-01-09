import Image from 'next/image';
import { trpc } from '@/server/server';

import PageHeader from '@/components/page-header/page-header';
import TeaCard from '@/components/tea-card/tea-card';

const leaves = [
	{
		className: 'absolute -z-10 left-0 top-[189px]',
		width: 292,
		height: 484,
		src: '/images/leaves-categories-left.png',
	},
	{
		className: 'absolute -z-10 right-0 top-[768px] md:top-[314px]',
		width: 319,
		height: 417,
		src: '/images/leaves-categories-right.png',
	},
];

export default async function CategoryPage({
	params,
}: Readonly<{
	params: Promise<{ slug: string }>;
}>) {
	console.log('cat=', (await params).slug);

	const category = await trpc.category.getByUrl((await params).slug);

	const products = await trpc.product.getByCategoryId(category.categoryId);

	return (
		<div className="relative">
			<div className="relative container flex flex-col gap-12 py-12">
				<PageHeader header={category.name} />
				<section className="grid grid-cols-3 gap-6">
					{products.map((product) => (
						<TeaCard
							header={product.name}
							src={product.images?.at(0) ?? 'mocked'}
							key={product.productId}
							link={`/products/${product.productId.toString()}`}
						/>
					))}
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