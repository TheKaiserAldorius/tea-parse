'use client';

import Image from 'next/image';
import InnerImageZoom from 'react-inner-image-zoom';

import 'react-inner-image-zoom/lib/styles.min.css';

import { useState } from 'react';

import { Button } from '@/components/ui/button';

// const images = [
// 	'/mocked/categories/shu.png',
// 	'/mocked/categories/gaba.png',
// 	'/mocked/categories/shen.png',
// 	'/mocked/categories/green.png',
// 	'/mocked/categories/white.png',
// ];

export const ItemImages = ({ images }: { images: string[] }) => {
	const [selectedImage, setSelectedImage] = useState(images[0]);

	return (
		<div className="flex h-full shrink-0 gap-5">
			<div className="flex flex-col justify-start" style={{ gap: '15px' }}>
				{images.map((el) => (
					<Button
						className="hover:border-primary border-2 px-2 py-5"
						variant="ghost"
						size="wrapper"
						onClick={() => setSelectedImage(el)}
						key={el}
					>
						<Image alt={el} src={el} key={el} width={48} height={48} />
					</Button>
				))}
			</div>
			<div className="flex aspect-square size-full max-w-lg shrink-0 overflow-hidden rounded-2xl border-2">
				<InnerImageZoom src={selectedImage} zoomPreload zoomType="hover" />
			</div>
		</div>
	);
};