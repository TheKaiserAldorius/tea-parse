// utils/get-db-url.ts
export const getDbUrl = () => {
  const isPreview = process.env.NEXT_PUBLIC_PREVIEW_MODE === '1';

  // В preview режиме база не нужна
  if (isPreview) return '';

  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) throw new Error('no database url');

  return dbUrl;
};
