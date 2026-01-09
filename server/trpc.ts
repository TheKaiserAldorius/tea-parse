import { env } from '@/env';
import { initTRPC, TRPCError } from '@trpc/server';
import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import jwt from 'jsonwebtoken';
import superjson from 'superjson';

export interface JwtUserData {
  id: string;
  phone: string;
  iat: number;
  exp: number;
}

const isPreview =
  process.env.NEXT_PUBLIC_PREVIEW_MODE === '1' || !process.env.DATABASE_URL;

function parseMockToken(token: string): Pick<JwtUserData, 'id' | 'phone'> | null {
  // ожидаем: "mock.<base64url(JSON)>"
  if (!token?.startsWith('mock.')) return null;

  try {
    const payloadPart = token.slice('mock.'.length);
    const json = Buffer.from(payloadPart, 'base64url').toString('utf8');
    const payload = JSON.parse(json);

    // в твоём AuthService мы клали { id, phone, ... }
    if (!payload?.id || !payload?.phone) return null;

    return {
      id: String(payload.id),
      phone: String(payload.phone),
    };
  } catch {
    return null;
  }
}

export const createTRPCContext = async (opts: FetchCreateContextFnOptions) => {
  const token = opts.req.headers.get('authorization')?.split(' ')[1];

  let user: JwtUserData | undefined = undefined;

  if (token) {
    try {
      if (isPreview) {
        const mockUser = parseMockToken(token);
        if (mockUser) {
          // добиваем обязательные поля интерфейса
          user = {
            id: mockUser.id,
            phone: mockUser.phone,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 6,
          };
        } else {
          // в preview игнорим мусорные токены, чтобы не спамило в логах
          user = undefined;
        }
      } else {
        const userData = jwt.verify(token, env.JWT_SECRET) as JwtUserData;
        user = userData;
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      user = undefined;
    }
  }

  return { ...opts, user };
};

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const createTRPCRouter = t.router;
export const middleware = t.middleware;
export const createCallerFactory = t.createCallerFactory;

export const publicProcedure = t.procedure;

export const protectedProcedure = publicProcedure.use((opts) => {
  if (!opts.ctx.user)
    throw new TRPCError({
      message: 'Пользователь не найден',
      code: 'FORBIDDEN',
    });

  return opts.next();
});
