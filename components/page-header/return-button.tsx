'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

import { Button } from '../ui/button';

export const ReturnButton = () => {
	const router = useRouter();

	return (
		<Button
			className="left-0 items-center justify-start gap-1 bg-transparent text-sm md:absolute"
			variant="secondary"
			size="wrapper"
			onClick={() => router.back()}
		>
			<ChevronLeft className="size-5" />
			<p>Назад</p>
		</Button>
	);
};