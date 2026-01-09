'use client';

import { useRouter } from 'next/navigation';
import { XIcon } from 'lucide-react';

import { AmountButtons } from '../items/items-tea-params/amount-buttons';
import { Button } from '../ui/button';

export const ItemAmount = ({
  amount,
  cost,
  discount,
}: {
  amount: number;
  cost: number;
  discount?: number;
}) => {
  const router = useRouter();

  return (
    <div className="flex items-center gap-6">
      <AmountButtons
        amount={amount}
        add={() => console.log('add')}
        remove={() => console.log('remove')}
        size="sm"
      />

      <div className="flex min-w-40 items-center gap-2">
        <p className="text-primary text-xl">
          {(discount ? discount : cost) * amount} ₽
        </p>

        {discount && (
          <p className="text-muted-foreground text-sm line-through">
            {cost * amount} ₽
          </p>
        )}
      </div>

      <Button size="icon" variant="secondary" className="size-6">
        <XIcon className="text-foreground size-3" />
      </Button>

      {/* Вместо revalidatePath */}
      <Button onClick={() => router.refresh()}>жмяк</Button>
    </div>
  );
};
