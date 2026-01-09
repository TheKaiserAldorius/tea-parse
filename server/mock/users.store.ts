export type MockUser = {
  user_id: string;
  phone: string;
  password: string | null;
  refresh_token: string | null;
  created: Date;
  updated: Date;
};

const store = new Map<string, MockUser>();

function normalizePhone(raw: string) {
  // оставляем только цифры
  const digits = (raw ?? '').replace(/\D/g, '');
  // приводим +7/8/7 в единый вид "7XXXXXXXXXX"
  if (digits.length === 11 && digits.startsWith('8')) return '7' + digits.slice(1);
  if (digits.length === 11 && digits.startsWith('7')) return digits;
  return digits;
}

export function getOrCreateUserByPhone(phoneRaw: string): MockUser {
  const phone = normalizePhone(phoneRaw);

  let u = store.get(phone);
  if (u) return u;

  u = {
    user_id: 'mock_' + phone,
    phone,
    password: null,
    refresh_token: null,
    created: new Date(),
    updated: new Date(),
  };

  store.set(phone, u);
  return u;
}

export function findUserByPhone(phoneRaw: string): MockUser | null {
  const phone = normalizePhone(phoneRaw);
  return store.get(phone) ?? null;
}
