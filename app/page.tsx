'use server';

import Image from 'next/image';
import { trpc } from '@/server/server';

import TeaCard from '@/components/tea-card/tea-card';

const leaves = [
	{
		className: 'absolute -z-10 left-0 top-[125px]',
		width: 188,
		height: 118,
		src: '/images/leaves-main-left5.png',
	},
	// {
	// 	className: 'absolute -z-10 right-0 top-[768px] md:top-[314px]',
	// 	width: 319,
	// 	height: 417,
	// 	src: '/images/leaves-categories-right.png',
	// },
];

// const categories = [
// 	{ id: 1, title: 'Зеленый', link: 'green', src: '' },
// 	{ id: 2, title: 'Северно-Фудзяньские Улуны', link: 'north-fujian', src: '' },
// 	{ id: 3, title: 'Шу Пуэры', link: 'shu', src: '' },
// 	{ id: 4, title: 'Белый', link: 'white', src: '' },
// 	{ id: 5, title: 'Южно-Фудзяньские Улуны', link: 'south-fujian', src: '' },
// 	{ id: 6, title: 'Шэн Пуэры', link: 'shen', src: '' },
// 	{ id: 7, title: 'Жёлтый', link: 'yellow', src: '' },
// 	{ id: 8, title: 'Тайваньский', link: 'thai', src: '' },
// 	{ id: 9, title: 'Чёрный', link: 'black', src: '' },
// 	{ id: 10, title: 'Красный', link: 'red', src: '' },
// 	{ id: 11, title: 'Чайная утварь', link: 'utensils', src: '' },
// 	{ id: 12, title: 'Жасминовый', link: 'jasmine', src: '' },
// 	{ id: 13, title: 'Габа', link: 'gaba', src: '' },
// 	{ id: 14, title: '', link: '', src: '' },
// 	{ id: 15, title: 'Чайные добавки', link: 'supplements', src: '' },
// ];

export default async function IndexPage() {
	const categories = await trpc.category.list();

	console.log('getCats=', categories);

	return (
		<div className="relative">
			<div className="relative container py-12">
				<section className="grid grid-cols-3 gap-6">
					{categories.map((category) => (
						<TeaCard
							header={category.name}
							src={category.imageLink}
							key={category.categoryId}
							link={`/categories/${category.url}`}
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

// export default async function Home() {
//   try {
//     const hello = await trpc.hello({ text: "serverd" });

//     return (
//       <HydrateClient>
//         <div>{hello.greeting}</div>
//         {/** ... */}
//         <ClientGreeting />
//       </HydrateClient>
//     );
//   } catch (e) {
//     return <FallbackBoundary e={e} showError />;
//   }
// }