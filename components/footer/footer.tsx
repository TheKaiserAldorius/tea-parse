'use server';

import Image from 'next/image';

// import Link from 'next/link';

// import { LocationIcon, PhoneIcon } from '@/lib/icons/icons';
import { cn } from '@/lib/utils';

// import { SubscribeForm } from './subscribe-form';

// const footerLinks = {
// 	company: {
// 		header: 'Компания',
// 		content: [
// 			{ label: 'О нас', href: '/about' },
// 			{ label: 'О чае', href: '/tea' },
// 			{ label: 'Фабрики', href: '/manufactures' },
// 			{ label: 'Акции', href: '/promo' },
// 			{ label: 'Контакты', href: '/contacts' },
// 		],
// 	},
// 	info: {
// 		header: 'Информация',
// 		content: [
// 			{ label: 'Оплата', href: '/payment' },
// 			{ label: 'Доставка', href: '/delivery' },
// 		],
// 	},
// 	subscribe: {
// 		header: 'Будьте всегда в курсе!',
// 		content: <SubscribeForm />,
// 	},
// 	contacts: {
// 		header: 'Контакты',
// 		content: [
// 			{
// 				label: '+7 566 000 00 00',
// 				href: 'tel:+75660000000',
// 				icon: <PhoneIcon className="text-primary" />,
// 			},
// 			{
// 				label: 'г. Москва, ул. Мельникова 12',
// 				href: 'https://yandex.ru/maps/213/moscow/house/ulitsa_melnikova_12_8/Z04YcAFpTkACQFtvfXtzdHVjYA==/?ll=37.669756%2C55.725904&z=16.88',
// 				icon: <LocationIcon className="text-primary" />,
// 			},
// 		],
// 	},
// };

const footerLeaves = [
	{
		className: 'hidden xl:flex',
		width: 110,
		height: 67,
		src: '/images/leaves-footer-left.png',
	},
	{
		width: 170,
		height: 67,
		src: '/images/leaves-footer-center.png',
	},
	{
		className: 'hidden xl:flex',
		width: 110,
		height: 67,
		src: '/images/leaves-footer-right.png',
	},
];

const Footer = async () => {
	return (
		<footer className="bg-secondary relative flex justify-center py-8">
			<div className="container flex flex-col gap-8">
				<div className="flex flex-wrap justify-between gap-4">
					{/* {Object.values(footerLinks).map((section) => (
						<section
							className="flex flex-col flex-wrap gap-2 lg:gap-5"
							key={section.header}
						>
							<h3
								className={cn(
									'font-semibold',
									!Array.isArray(section.content) && 'px-1'
								)}
							>
								{section.header}
							</h3>
							{Array.isArray(section.content) ? (
								<ul className="flex flex-col gap-2">
									{section.content.map((link) => (
										<li
											className="group flex items-center gap-2"
											key={link.href}
										>
											{'icon' in link && link.icon}
											<Link
												className="text-sm text-muted-foreground group-hover:text-primary"
												href={link.href}
											>
												{link.label}
											</Link>
										</li>
									))}
								</ul>
							) : (
								section.content
							)}
						</section>
					))} */}
				</div>
				<p className="bg-background text-muted-foreground rounded-3xl px-3 py-4 text-sm">
					{new Date().getFullYear()} Все права защищены
				</p>
			</div>
			<div className="absolute bottom-0 flex justify-center xl:w-[1260px] xl:justify-between">
				{footerLeaves.map((leave) => (
					<Image
						src={leave.src}
						alt="footer-leaves"
						width={leave.width}
						height={leave.height}
						className={cn(leave.className)}
						key={leave.src}
					/>
				))}
			</div>
		</footer>
	);
};

export default Footer;