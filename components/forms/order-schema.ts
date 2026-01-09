import { z } from 'zod';

export const orderSchema = z.object({
	username: z
		.string()
		.min(1, { message: 'Не указаны имя и фамилия' })
		.refine((value) => /^[A-Za-zА-Яа-я\s-]+$/.test(value), {
			message:
				'Имя и фамилия могут содержать только английские или русские буквы, дефис и пробел',
		})
		.refine((value) => value.trim().split(' ').length > 1, {
			message: 'Указано только имя',
		})
		.refine((value) => value.split(' ').every((el) => el.length > 0), {
			message: 'Введено больше одного пробела подряд',
		})
		.refine(
			(value) =>
				value.split(' ').every((el) => el[0] && el[0] === el[0].toUpperCase()),
			{
				message: 'Слова должны начинаться с заглавной буквы',
			}
		),
	email: z
		.string()
		.min(1, { message: 'Не указан адрес электронной почты' })
		.email({ message: 'Неправильный адрес почты' }),
	phone: z
		.string()
		.min(1, { message: 'Не указан номер телефона' })
		.refine((value) => value.replace(/[^0-9]/g, '').length === 11, {
			message: 'Неправильный формат номера телефона',
		}),
	address: z.string().min(1, { message: 'Не указан адрес доставки' }),
	comment: z
		.string()
		.min(2, { message: 'Слишком короткий комментарий' })
		.optional(),
	terms: z.boolean().refine((value) => value, {
		message: 'Пожалуйста, примите условия, чтобы продолжить',
	}),
});