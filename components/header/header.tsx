'use server';

import Image from 'next/image';
import Link from 'next/link';

import { Search } from './search';
import { UserInfo } from './user-info';

const links = [
	{ label: 'О нас', href: '/about' },
	{ label: 'О чае', href: '/tea' },
	{ label: 'Фабрики', href: '/manufactures' },
	{ label: 'Оплата', href: '/payment' },
	{ label: 'Доставка', href: '/delivery' },
	{ label: 'Акции', href: '/promo' },
	{ label: 'Контакты', href: '/contacts' },
];

const Header = async () => {
	return (
		<header className="container flex flex-col gap-8 pt-3 lg:pt-5">
			<div className="flex grid-cols-[1fr_auto_1fr] xl:grid">
				<Search />
				<Link className="mx-auto" href="/">
					<h1 className="font-marck ml-0 flex items-end gap-3 text-4xl md:ml-12 md:text-7xl">
						<p>Чай</p>
						<Image
							className="h-16 w-16 md:h-auto md:w-auto"
							src="/images/logo.svg"
							alt="site_logo"
							width={115}
							height={115}
						/>
						<p>Чудес</p>
					</h1>
				</Link>
				<UserInfo />
			</div>
			<p
				className="[word-spacing: 20px] text-primary text-center text-sm font-black tracking-wider uppercase"
				style={{ wordSpacing: '.5rem' }}
			>
				время пить настоящий чай
			</p>
			<nav className="flex w-full flex-wrap justify-center gap-3 lg:justify-between">
				{links.map((link) => (
					<Link
						className="bg-background text-secondary-foreground shadow-nav hover:border-primary hover:text-primary hover:shadow-nav-hover relative flex min-w-32 items-center justify-center rounded-full border p-2"
						href={link.href}
						key={link.href}
					>
						{link.href === '/promo' && (
							<Image
								className="absolute -top-7 right-3 -z-10 hidden rotate-180 lg:block"
								src="/images/leaf-promo-sharpen.png"
								alt="leaf"
								width={48}
								height={37}
							/>
						)}
						<p>{link.label}</p>
					</Link>
				))}
			</nav>
		</header>
	);
};

export default Header;