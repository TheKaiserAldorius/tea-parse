import Image from 'next/image';
import Link from 'next/link';
import { calculateDiscountPercent } from '@/utils/calculate-discount';

import { DiscountIcon } from '@/lib/icons/icons';
import { cn } from '@/lib/utils';

import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';

const TeaCard = async ({
	header,
	discount,
	cost,
	src,
	link,
}: {
	header: string;
	src: string;
	link: string;
	cost?: number;
	discount?: number;
}) => {
	return (
		<Link href={link}>
			<Card
				className={cn(
					'group hover:border-primary min-h-[390px] max-w-[360px] gap-5 border-2 px-2 py-6 hover:cursor-pointer'
				)}
			>
				<CardHeader
					className={cn('font-marck min-h-[80px] text-center text-4xl')}
				>
					{header}
				</CardHeader>
				<CardContent>
					<Image
						className="mx-auto size-[190px] object-contain duration-300 group-hover:scale-110"
						src={src}
						alt="tea-image"
						width={190}
						height={190}
						priority
					/>
				</CardContent>
				{!!cost && (
					<CardFooter className="gap-1">
						{!!discount && (
							<>
								<p className="text-secondary-foreground font-normal line-through">
									{cost} ₽
								</p>
								<div className="absolute top-1 -left-7 flex items-center justify-center">
									<DiscountIcon className="text-popover-foreground" />
									<p className="text-primary-foreground absolute text-xl font-semibold">
										{calculateDiscountPercent(cost, discount, true)}
									</p>
								</div>
							</>
						)}
						<p className="text-primary text-3xl font-semibold">
							{discount ? discount : cost} ₽
						</p>
					</CardFooter>
				)}
			</Card>
		</Link>
	);
};

export default TeaCard;