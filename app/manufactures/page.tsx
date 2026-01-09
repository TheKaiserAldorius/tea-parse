import Image from 'next/image';

import {
	CareIcon,
	LocationIcon,
	QualityIcon,
} from '@/lib/icons/advantages-icons';
import Advantages from '@/components/advantages';
import PageHeader from '@/components/page-header/page-header';

const about = {
	header: 'Фабрики',
	content: [
		'На сегодняшний день в провинции Юньнань существует множество пуэрных заводов: от крупных государственных до маленьких фермерских предприятий. Каждый завод имеет свои традиции, наработанную годами рецептуру, сырьё, вкусовую линию и нюансы технологического процесса.',
		'Древний Дали когда-то располагался на пересечении Великого шелкового пути и исторически являлся основным чайным центром западной Юньнани. Этот регион обладает благоприятным климатом, чистой водой и высокими горами, которые создают условия для производства хороших чаев.',
		'Сягуаньская чайная фабрика в городе Дали (сейчас «Юньнань Сягуань Точа» — Yunnan Xiaguan Tuocha (Group) Co.,Ltd, 云南下关沱茶集) -  одно из самых старых и авторитетных предприятий в стране.',
	],
};

const advantages = [
	{
		description: 'Производство высокого качества',
		icon: QualityIcon,
	},
	{
		description: 'Бережная транспортировка',
		icon: CareIcon,
	},
	{
		description: 'Широкий спектр расположения',
		icon: LocationIcon,
	},
];

const leaves = [
	{
		className: 'absolute -z-10 left-0 top-[269px]',
		width: 266,
		height: 206,
		src: '/images/leaves-manufactures-left.png',
	},
	{
		className: 'absolute -z-10 right-[68px] bottom-16',
		width: 515,
		height: 511,
		src: '/images/leaves-manufactures-right.png',
	},
];

export default async function ManufacturesPage() {
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
					</div>
				</section>
				<Advantages items={advantages} />
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