import z from 'zod';

import { CartInsertSchema } from './cart.schema';

export const UserInsertSchema = z.object({
	phone: z
		.string()
		.min(1, { message: 'Не указан номер телефона' })
		.refine((value) => value.replace(/[^0-9]/g, '').length === 11, {
			message: 'Неправильный формат номера телефона',
		}),
	password: z
		.string()
		.min(8, 'Пароль должен быть не короче 8 символов')
		.regex(/\d/, 'Пароль должен содержать хотя бы одну цифру')
		.regex(/[a-z]/, 'Пароль должен содержать хотя бы одну строчную букву')
		.regex(/[A-Z]/, 'Пароль должен содержать хотя бы одну заглавную букву'),
	cart: z.array(CartInsertSchema.extend({ amount: z.number() })),
});