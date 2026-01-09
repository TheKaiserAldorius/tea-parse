import { env } from '@/env';
import { db } from '@/server/drizzle';
import { tableUsers } from '@/server/drizzle/schema';
import { encrypt, hashPassword } from '@/utils/hash-passwords';
import { eq } from 'drizzle-orm';
import jwt, { SignOptions } from 'jsonwebtoken';

export class AuthService {
	static generateTokens(id: bigint, phone: string) {
		const accessToken = jwt.sign({ id: id.toString(), phone }, env.JWT_SECRET, {
			expiresIn: env.ACCESS_TOKEN_EXPIRATION as SignOptions['expiresIn'],
		});

		const refreshToken = jwt.sign({ d: id.toString(), phone }, env.JWT_SECRET, {
			expiresIn: env.REFRESH_TOKEN_EXPIRATION as SignOptions['expiresIn'],
		});

		return {
			accessToken,
			refreshToken,
		};
	}

	static async updateTokens(userId: bigint, refreshToken: string) {
		const token = encrypt(refreshToken);

		const result = await db
			.update(tableUsers)
			.set({
				refreshToken: await hashPassword(token),
			})
			.where(eq(tableUsers.userId, userId))
			.returning();

		return result[0];
	}
}