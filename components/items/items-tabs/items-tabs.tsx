'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const tabsTriggers = [
	{ value: 'description', label: 'Описание' },
	{ value: 'brewing', label: 'Как правильно заваривать' },
];

export const ItemsTabs = (data: { description: string; brewing: string }) => {
	return (
		<Tabs
			defaultValue={tabsTriggers[0].value}
			className="flex w-full flex-col gap-6"
		>
			<TabsList>
				{tabsTriggers.map((trigger) => (
					<TabsTrigger value={trigger.value} key={trigger.value}>
						{trigger.label}
					</TabsTrigger>
				))}
			</TabsList>
			{tabsTriggers.map((trigger) => (
				<TabsContent
					value={trigger.value}
					className="max-w-[1052px] px-5"
					key={`${trigger.value}-tabContent`}
				>
					{trigger.value in data && (
						<div className="text-muted-foreground font-normal">
							{data[trigger.value as keyof typeof data]}
						</div>
					)}
				</TabsContent>
			))}
		</Tabs>
	);
};