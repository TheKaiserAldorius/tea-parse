import z from 'zod';

import { qualities, weights } from '../drizzle/schema';

export const CartInsertSchema = z.object({
	productId: z.bigint(),
	weight: z.enum(weights.enumValues),
	quality: z.enum(qualities.enumValues),
});