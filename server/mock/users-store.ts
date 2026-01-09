// server/mock/user-store.ts
import { TRPCError } from '@trpc/server';

export type MockUserRow = {
  userId: bigint;
  phone: string;
  password: string;
  refreshToken: string | null;
  created: Date;
  updated: Date;
};

const store = new Map<string, MockUserRow>();
let seq = 1n;

export function normalizePhone(raw: string) {
  const digits = String(raw ?? '').replace(/\D/g, '');
  if (digits.length === 11 && digits.startsWith('8')) return '7' + digits.slice(1);
  return digits;
}

export function findUserByPhone(phoneRaw: string): MockUserRow | null {
  const phone = normalizePhone(phoneRaw);
  return store.get(phone) ?? null;
}

export function createUserPreview(phoneRaw: string, password: string): MockUserRow {
  const phone = normalizePhone(phoneRaw);
  if (!phone) throw new TRPCError({ code: 'BAD_REQUEST', message: 'Некорректный телефон' });
  if (store.has(phone)) {
    throw new TRPCError({ code: 'CONFLICT', message: 'Пользователь уже существует (preview)' });
  }

  const now = new Date();
  const user: MockUserRow = {
    userId: seq++,
    phone,
    password,
    refreshToken: null,
    created: now,
    updated: now,
  };

  store.set(phone, user);
  return user;
}

export function upsertUserPreview(phoneRaw: string, password: string): MockUserRow {
  const phone = normalizePhone(phoneRaw);
  const existing = store.get(phone);
  if (existing) return existing;
  return createUserPreview(phone, password);
}

export function setRefreshTokenPreview(userId: bigint, refreshToken: string): MockUserRow {
  for (const [phone, user] of store.entries()) {
    if (user.userId === userId) {
      const updated: MockUserRow = { ...user, refreshToken, updated: new Date() };
      store.set(phone, updated);
      return updated;
    }
  }
  throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found (preview)' });
}
