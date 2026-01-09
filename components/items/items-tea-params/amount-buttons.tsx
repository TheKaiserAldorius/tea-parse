import { MinusIcon, PlusIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export const AmountButtons = ({
	amount,
	add,
	remove,
	size = 'default',
}: {
	amount: number;
	add: () => void;
	remove: () => void;
	size?: 'default' | 'sm';
}) => {
	return (
		<div className="bg-muted flex items-center gap-3 rounded-full p-1">
			<Button
				className={cn(
					'bg-popover-foreground disabled:bg-card disabled:text-foreground rounded-full p-0 text-2xl disabled:opacity-100',
					size === 'sm' && 'size-8'
				)}
				size="icon"
				onClick={remove}
				type="button"
			>
				<MinusIcon className="size-4" />
			</Button>
			<p
				className={cn(
					'flex min-w-8 justify-center text-lg',
					size === 'sm' && 'min-w-6 text-base'
				)}
			>
				{amount}
			</p>
			<Button
				className={cn(
					'bg-popover-foreground disabled:bg-card disabled:text-foreground rounded-full p-0 text-2xl disabled:opacity-100',
					size === 'sm' && 'size-8'
				)}
				size="icon"
				onClick={add}
				type="button"
			>
				<PlusIcon className={'size-4'} />
			</Button>
		</div>
	);
};