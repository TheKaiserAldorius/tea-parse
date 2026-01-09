export const isMockMode =
  process.env.NEXT_PUBLIC_PREVIEW_MODE === '1' || !process.env.DATABASE_URL;
