import z from 'zod';

export const CategoryInsertSchema = z.object({
	name: z.string(),
	url: z.string(),
	position: z.number().optional(),
	imageLink: z.string().url({ message: 'Неправильный формат ссылки' }),
});