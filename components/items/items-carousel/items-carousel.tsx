'use client';

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';

import TeaCardCarousel from './tea-card-carousel';

export const ItemsCarousel = ({
	items,
}: {
	items: { id: number; title: string; link: string; src: string }[];
}) => {
	return (
		<section className="flex flex-col gap-9">
			<h2 className="px-[70px]">C этим товаром покупают</h2>
			<Carousel opts={{ align: 'start' }} className="flex items-center gap-6">
				<CarouselPrevious
					className="bg-popover-foreground hover:bg-popover-foreground/90 relative left-0 shrink-0"
					variant="default"
				/>

				<CarouselContent className="">
					{items.map((item) => (
						<CarouselItem key={item.id} className="mx-auto basis-1/4">
							<TeaCardCarousel
								header={item.title}
								link={`/items/${item.id}`}
								src={`/mocked/categories/${item.link}.png`}
							/>
						</CarouselItem>
					))}
				</CarouselContent>

				<CarouselNext
					className="bg-popover-foreground hover:bg-popover-foreground/90 relative right-0 shrink-0"
					variant="default"
				/>
			</Carousel>
		</section>
	);
};