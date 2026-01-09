import z from 'zod';

export const UserDataSchema = z.object({
	email: z.string().email(),
});