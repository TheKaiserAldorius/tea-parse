import { AppRouter } from '@/server/routers/routers';
import { inferProcedureOutput } from '@trpc/server';

export type TLocalCartItem = Omit<
	NonNullable<inferProcedureOutput<AppRouter['cart']['getCart']>>[number],
	'userId' | 'cartId' | 'updated' | 'created' | 'productId'
> & { productId: string };