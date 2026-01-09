import React from 'react';
import Image from 'next/image';

type AdvantageItem = {
	description: string;
	icon: React.FC;
};

const Advantages = ({
	items,
	showLeaves = false,
}: {
	items: AdvantageItem[];
	showLeaves?: boolean;
}) => {
	return (
		<section className="bg-card shadow-nav relative flex max-w-4xl items-center gap-3 rounded-3xl border py-8">
			{items.map((item) => (
				<div className="flex grow justify-center" key={item.description}>
					<div className="flex max-w-[212px] flex-col items-center gap-6">
						{<item.icon />}
						<p className="text-accent-foreground-dark text-center text-lg">
							{item.description}
						</p>
					</div>
				</div>
			))}
			{showLeaves && (
				<Image
					className="absolute left-[-262px] -z-10"
					src="/images/leaves-advantages.png"
					alt="leaves"
					width={314}
					height={277}
				/>
			)}
		</section>
	);
};

export default Advantages;