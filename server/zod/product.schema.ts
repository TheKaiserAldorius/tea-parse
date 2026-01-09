import z from 'zod';

export const ProductInsertSchema = z.object({
	name: z.string(),
	categoryUrl: z.string(),
	description: z.string(),
	brewing: z.string(),
	images: z
		.string()
		.url({ message: 'Неправильный формат ссылки' })
		.array()
		.min(1, { message: 'Должно быть хотя бы одно изображение товара' })
		.max(5, {
			message: 'Количество изображений товара не должно быть больше 5',
		}),
	published: z.boolean().optional(),
	toastDescription: z.object({
		A: z.string(),
		AA: z.string(),
		'AA+': z.string(),
		'AA++': z.string(),
		AAA: z.string(),
	}),
	price: z.object({
		A: z.object({
			'35': z.object({ price: z.number(), discount: z.number().optional() }),
			'70': z.object({ price: z.number(), discount: z.number().optional() }),
			'100': z.object({ price: z.number(), discount: z.number().optional() }),
			'200': z.object({ price: z.number(), discount: z.number().optional() }),
			'300': z.object({ price: z.number(), discount: z.number().optional() }),
		}),
		AA: z.object({
			'35': z.object({ price: z.number(), discount: z.number().optional() }),
			'70': z.object({ price: z.number(), discount: z.number().optional() }),
			'100': z.object({ price: z.number(), discount: z.number().optional() }),
			'200': z.object({ price: z.number(), discount: z.number().optional() }),
			'300': z.object({ price: z.number(), discount: z.number().optional() }),
		}),
		'AA+': z.object({
			'35': z.object({ price: z.number(), discount: z.number().optional() }),
			'70': z.object({ price: z.number(), discount: z.number().optional() }),
			'100': z.object({ price: z.number(), discount: z.number().optional() }),
			'200': z.object({ price: z.number(), discount: z.number().optional() }),
			'300': z.object({ price: z.number(), discount: z.number().optional() }),
		}),
		'AA++': z.object({
			'35': z.object({ price: z.number(), discount: z.number().optional() }),
			'70': z.object({ price: z.number(), discount: z.number().optional() }),
			'100': z.object({ price: z.number(), discount: z.number().optional() }),
			'200': z.object({ price: z.number(), discount: z.number().optional() }),
			'300': z.object({ price: z.number(), discount: z.number().optional() }),
		}),
		AAA: z.object({
			'35': z.object({ price: z.number(), discount: z.number().optional() }),
			'70': z.object({ price: z.number(), discount: z.number().optional() }),
			'100': z.object({ price: z.number(), discount: z.number().optional() }),
			'200': z.object({ price: z.number(), discount: z.number().optional() }),
			'300': z.object({ price: z.number(), discount: z.number().optional() }),
		}),
	}),
});