import '@/app/globals.css';

import { Metadata, Viewport } from 'next';
import { TRPCProvider } from '@/server/client';
import { HydrateClient } from '@/server/server';

import MetadataConf from '@/config/metadata';
import { siteConfig } from '@/config/site';
import { fontSans, marck } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/sonner';
import { LocalCartProvider } from '@/components/cart-context';
import Footer from '@/components/footer/footer';
import Header from '@/components/header/header';
import { TailwindIndicator } from '@/components/tailwind-indicator';

export const metadata: Metadata = MetadataConf;

export const viewport: Viewport = {
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: siteConfig.mainColor },
		{ media: '(prefers-color-scheme: dark)', color: siteConfig.mainColor },
	],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={cn(
					fontSans.variable,
					marck.variable,
					'transition-color bg-background flex min-h-screen flex-col font-sans font-medium antialiased duration-300'
				)}
			>
				<TRPCProvider>
					<HydrateClient>
						{/* <ThemeProvider attribute="class" defaultTheme="light" enableSystem> */}
						<LocalCartProvider>
							<Header />
							<main className="grow overflow-hidden">{children}</main>

							{/* <main className="flex grow items-center justify-center">
							<div className="text-primary flex flex-col items-center justify-center gap-12 p-2 text-center text-lg">
								<p>Сайт находится на реконструкции</p>
								<p>Открытие - 1 августа</p>
							</div>
						</main> */}
							<Footer />
							<Toaster />
							<TailwindIndicator />
						</LocalCartProvider>
						{/* </ThemeProvider> */}
					</HydrateClient>
				</TRPCProvider>
			</body>
		</html>
	);
}