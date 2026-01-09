import { Inter, Marck_Script } from 'next/font/google';

export const fontSans = Inter({
	subsets: ['latin', 'cyrillic'],
	variable: '--font-sans',
});

export const marck = Marck_Script({
	weight: '400',
	subsets: ['cyrillic', 'latin'],
	variable: '--font-marck',
});