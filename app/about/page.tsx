import Image from 'next/image';

import {
	AssortmentIcon,
	CertificateIcon,
	LoyaltyIcon,
} from '@/lib/icons/advantages-icons';
import Advantages from '@/components/advantages';
import PageHeader from '@/components/page-header/page-header';

const about = {
	header: 'О нас',
	content: [
		'"Чай 7 Чудес" — это магазин элитного Китайского чая. Мы привозим для вас чаи из частных хозяйств Китая, лучших фабрик и закрытых Даоских монастырей. Уникальные пуэры, улуны с материнских деревьев, великолепные чаи с острова Тайвань и всегда самый свежий зелёный чай.',
	],
	list: [
		'Мы находимся в Москве, но также доставляем в любую точку мира',
		'При первом заказе положим в посылку приятный подарок',
		'Мы находимся в Москве, но также доставляем в любую точку мира',
		'При первом заказе положим в посылку приятный подарок',
		'Мы находимся в Москве, но также доставляем в любую точку мира',
		'При первом заказе положим в посылку приятный подарок',
	],
};

const advantages = [
	{
		description: 'Весь товар сертифицирован',
		icon: CertificateIcon,
	},
	{
		description: 'Система лояльности для клиентов',
		icon: LoyaltyIcon,
	},
	{
		description: 'Широкий ассортимент товаров',
		icon: AssortmentIcon,
	},
];

const leaves = [
	{
		className: 'absolute -z-10 left-0 top-[180px]',
		width: 234,
		height: 317,
		src: '/images/leaves-about-left.png',
	},
	{
		className: 'absolute -z-10 right-24 top-[305px]',
		width: 510,
		height: 566,
		src: '/images/leaves-about-right.png',
	},
];

export default async function AboutPage() {
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

						<ul className="flex flex-col gap-4 pl-6">
							{about.list.map((item, idx) => (
								<li
									className="text-accent-foreground list-disc text-xl font-normal"
									key={`${item}-${idx}`}
								>
									{item}
								</li>
							))}
						</ul>
					</div>
				</section>
				<Advantages items={advantages} showLeaves />
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