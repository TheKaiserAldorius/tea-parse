import { env } from '@/env';
import { db } from '@/server/drizzle';
import { tableUsers } from '@/server/drizzle/schema';
import { comparePassword, encrypt } from '@/utils/hash-passwords';
import { TRPCError } from '@trpc/server';
import { eq } from 'drizzle-orm';

import { AuthService } from './auth.service';
import { createUserPreview, upsertUserPreview } from '../../mock/users-store';

const isPreview = process.env.NEXT_PUBLIC_PREVIEW_MODE === '1';

export class UserService {
  static async createUser({ phone, password }: { phone: string; password: string }) {
    if (isPreview) {
      const newUser = createUserPreview(phone, password);
      const tokens = AuthService.generateTokens(newUser.userId, newUser.phone);

      // preview: “сохраняем” refresh в памяти
      const userWithTokens = await AuthService.updateTokens(newUser.userId, tokens.refreshToken);

      return {
        ...userWithTokens,
        accessToken: tokens.accessToken,
      };
    }

    const existing = await db.select().from(tableUsers).where(eq(tableUsers.phone, phone));

    console.log(env.REFRESH_TOKEN_EXPIRATION);

    if (existing.length)
      throw new TRPCError({
        code: 'CONFLICT',
        message: 'Пользователь с таким номером телефона уже существует',
      });

    const result = await db.insert(tableUsers).values({ phone, password }).returning();
    const newUser = result[0];

    const tokens = AuthService.generateTokens(newUser.userId, newUser.phone);

    const userWithTokens = await db
      .update(tableUsers)
      .set({ refreshToken: encrypt(tokens.refreshToken) })
      .where(eq(tableUsers.userId, newUser.userId))
      .returning();

    return {
      ...userWithTokens[0],
      accessToken: tokens.accessToken,
    };
  }

  static async login({ phone, password }: { phone: string; password: string }) {
    if (isPreview) {
      // В preview делаем “мягкий логин”: если юзера нет — создаём.
      // Это удобно для витрины и не ломает перенос на сервер.
      const user = upsertUserPreview(phone, password);

      // Если хочешь строгий режим — раскомментируй:
      // if (user.password !== password) throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Неверный пароль (preview)' });

      const tokens = AuthService.generateTokens(user.userId, user.phone);
      const updated = await AuthService.updateTokens(user.userId, tokens.refreshToken);

      return {
        ...updated,
        accessToken: tokens.accessToken,
        refreshToken: updated.refreshToken,
      };
    }

    const query = await db.select().from(tableUsers).where(eq(tableUsers.phone, phone));

    if (!query.length)
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Нет аккаунта с таким номером телефона',
      });

    const user = query[0];

    const checkPassword = await comparePassword(password, user.password);
    if (!checkPassword)
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Номер телефона или пароль введены неправильно',
      });

    const tokens = AuthService.generateTokens(user.userId, phone);

    return {
      ...user,
      accessToken: tokens.accessToken,
      refreshToken: (await AuthService.updateTokens(user.userId, tokens.refreshToken)).refreshToken,
    };
  }
}
