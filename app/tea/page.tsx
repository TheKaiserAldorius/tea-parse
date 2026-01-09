import Image from 'next/image';

import PageHeader from '@/components/page-header/page-header';

const about = {
	header: 'О чае',
	content: [
		'"Хуан Цзин Луо (黄金螺) элитный китайский красный чай, изготовлен из верхних чайных почек. Этот чай относится к категории особенно чистых продуктов. Природные условия выращивания чая настолько хороши, что позволяют не использовать химические удобрения.',
		'Тонкий, слегка скрученный лист даёт насыщенный аромат и золотистый настой с глубоким вкусом. Собирается и обрабатывается вручную. Производиться только на севере провинции Юньнань.',
		'При заваривании дает насыщенный рубиновый настой с терпким медовым вкусом и сильным ароматом. Очень запоминающийся и сильный чай с долгим послевкусием. Чай обладает не только глубоким вкусом, но и целебными свойствами:',
	],
	list: [
		'Лучше других красных чаёв повышает уровень иммунитета и способствует долголетию',
		'Прекрасно высвобождает излишний жар из тела, производя охлаждающий эффект',
		'Тонизирует нервную систему, расширяет сосуды и очищает кровь',
		'Обладает специфическими свойствами благодаря собственной микрофлоре, которая оказывает положительное влияние на микрофлору человека',
	],
};

const leaves = [
	{
		className: 'absolute -z-10 left-0 top-[143px]',
		width: 250,
		height: 476,
		src: '/images/leaves-tea-left.png',
	},
	{
		className: 'absolute -z-10 right-[178px] -bottom-4',
		width: 356,
		height: 256,
		src: '/images/leaves-tea-right.png',
	},
];

export default async function TeaPage() {
	return (
		<div className="relative">
			<div className="relative container flex flex-col gap-12 py-12">
				<PageHeader header={about.header} />
				<section className="flex max-w-4xl flex-col gap-10">
					<h2 className="text-4xl font-normal">{about.header}</h2>
					<div className="flex flex-col gap-8">
						{about.content.map((paragraph) => (
							<p
								className="text-accent-foreground text-xl font-normal"
								key={paragraph}
							>
								{paragraph}
							</p>
						))}

						<ul className="flex flex-col gap-4 pl-6">
							{about.list.map((item, idx) => (
								<li
									className="text-accent-foreground list-disc text-xl font-normal"
									key={`${item}-${idx}`}
								>
									{item}
								</li>
							))}
						</ul>
					</div>
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