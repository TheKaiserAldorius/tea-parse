import Image from 'next/image';

import PageHeader from '@/components/page-header/page-header';

const about = {
	header: 'Доставка',
	content: [
		'Мы доставляем товары в Москве бесплатно и круглосуточно!',
		'У нас очень высокая скорость доставки в пределах Москвы! Если вы например в три часа ночи захотите попить какой-то определенный чай - мы вам его привезем с максимальной скоростью!',
		'В Подмосковье и в регионы по всей стране доставка осуществляется в течение от одного до трёх дней.',
	],
};

const leaves = [
	{
		className: 'absolute -z-10 left-0 top-[144px]',
		width: 227,
		height: 263,
		src: '/images/leaves-delivery-left.png',
	},
	{
		className: 'absolute -z-10 right-[251px] -bottom-10',
		width: 290,
		height: 320,
		src: '/images/leaves-delivery-right.png',
	},
];

export default async function DeliveryPage() {
	return (
		<div className="relative">
			<div className="relative container flex flex-col gap-12 py-12">
				<PageHeader header={about.header} />
				<section className="flex max-w-4xl flex-col gap-10">
					<h2 className="text-4xl font-normal">{about.header}</h2>
					<div className="flex flex-col gap-8">
						{about.content.map((paragraph) => (
							<p
								className="text-accent-foreground text-xl font-normal"
								key={paragraph}
							>
								{paragraph}
							</p>
						))}
					</div>
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