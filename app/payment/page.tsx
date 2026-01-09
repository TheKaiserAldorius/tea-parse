import Image from 'next/image';

import { OrderInfo } from '@/components/cart/order-info';
import { OrderForm } from '@/components/forms/order-form';
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
		className: 'absolute -z-10 left-0 top-[57px]',
		width: 292,
		height: 485,
		src: '/images/leaves-payment-left.png',
	},
	{
		className: 'absolute -z-10 right-0 top-[256px]',
		width: 329,
		height: 544,
		src: '/images/leaves-payment-right.png',
	},
];

export default async function PaymentPage() {
	return (
		<div className="relative">
			<div className="relative container flex flex-col gap-12 py-12">
				<PageHeader header="Оплата" />

				<section className="flex gap-24">
					<div className="grow">
						<OrderForm />
					</div>
					{<OrderInfo orderData={itemsList} isOrderPage />}
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