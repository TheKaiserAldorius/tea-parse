'use client';

import { qualities } from '@/server/drizzle/schema';

import { CategoryIcon } from '@/lib/icons/icons';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

export const CategorySelect = ({
	category,
	setCategory,
	categoriesList,
}: {
	category: (typeof qualities.enumValues)[number];
	setCategory: (category: (typeof qualities.enumValues)[number]) => void;
	categoriesList: typeof qualities.enumValues;
}) => {
	return (
		<Select value={category} onValueChange={setCategory}>
			<SelectTrigger className="text-primary w-[216px] px-2 py-1.5">
				<CategoryIcon />
				<SelectValue />
			</SelectTrigger>
			<SelectContent className="pl ml-9 w-[172px]">
				<SelectGroup>
					{categoriesList.map((el) => (
						<SelectItem value={el} key={el}>
							Категория {el}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
};