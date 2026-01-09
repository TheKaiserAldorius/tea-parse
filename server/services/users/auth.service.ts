import { env } from '@/env';
import { db } from '@/server/drizzle';
import { tableUsers } from '@/server/drizzle/schema';
import { encrypt, hashPassword } from '@/utils/hash-passwords';
import { eq } from 'drizzle-orm';
import jwt, { SignOptions } from 'jsonwebtoken';

import { setRefreshTokenPreview } from '../../mock/users-store';

const isPreview = process.env.NEXT_PUBLIC_PREVIEW_MODE === '1';

function makeMockToken(payload: object) {
  // НЕ JWT. Просто безопасная “плашка” для витрины.
  return 'mock.' + Buffer.from(JSON.stringify(payload)).toString('base64url');
}

export class AuthService {
  static generateTokens(id: bigint, phone: string) {
    if (isPreview) {
      const now = Date.now();
      return {
        accessToken: makeMockToken({ t: 'access', id: id.toString(), phone, iat: now }),
        refreshToken: makeMockToken({ t: 'refresh', id: id.toString(), phone, iat: now }),
      };
    }

    const accessToken = jwt.sign({ id: id.toString(), phone }, env.JWT_SECRET!, {
      expiresIn: env.ACCESS_TOKEN_EXPIRATION as SignOptions['expiresIn'],
    });

    const refreshToken = jwt.sign({ d: id.toString(), phone }, env.JWT_SECRET!, {
      expiresIn: env.REFRESH_TOKEN_EXPIRATION as SignOptions['expiresIn'],
    });

    return { accessToken, refreshToken };
  }

  static async updateTokens(userId: bigint, refreshToken: string) {
    if (isPreview) {
      // Никаких encrypt/hash/db
      return setRefreshTokenPreview(userId, refreshToken);
    }

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
