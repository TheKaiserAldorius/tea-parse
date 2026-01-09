import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

const isPreview = process.env.NEXT_PUBLIC_PREVIEW_MODE === '1';

export const env = createEnv({
  /*
   * Serverside Environment variables, not available on the client.
   * Will throw if you access these variables on the client.
   */
  server: {
    NODE_ENV: z.string().optional(),

    ALLOWED_ORIGINS: isPreview ? z.string().optional() : z.string(),
    JWT_SECRET: isPreview ? z.string().optional() : z.string(),

    ACCESS_TOKEN_EXPIRATION: z.string().default('1h'),
    REFRESH_TOKEN_EXPIRATION: z.string().default('7d'),

    KEY: isPreview ? z.string().optional() : z.string(),
    IV: isPreview ? z.string().optional() : z.string(),
    ALGORITHM: isPreview ? z.string().optional() : z.string(),

    BLOB_READ_WRITE_TOKEN: isPreview ? z.string().optional() : z.string(),
  },

  /*
   * Environment variables available on the client (and server).
   */
  client: {
    NEXT_PUBLIC_VERCEL_URL: z.string().optional(),
    NEXT_PUBLIC_BASE_DOMAIN: isPreview ? z.string().optional() : z.string(),
    NEXT_PUBLIC_ENV: z.string().optional(),
    NEXT_PUBLIC_TRPC_ENDPOINT: isPreview ? z.string().optional() : z.string(),
    NEXT_PUBLIC_PREVIEW_MODE: z.string().optional(), // чтобы runtimeEnv был типизирован
  },

  /*
   * destructure only client variables
   */
  runtimeEnv: {
    NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
    NEXT_PUBLIC_BASE_DOMAIN: process.env.NEXT_PUBLIC_BASE_DOMAIN,
    NEXT_PUBLIC_ENV: process.env.NEXT_PUBLIC_ENV ?? process.env.NODE_ENV,
    NEXT_PUBLIC_TRPC_ENDPOINT: process.env.NEXT_PUBLIC_TRPC_ENDPOINT,
    NEXT_PUBLIC_PREVIEW_MODE: process.env.NEXT_PUBLIC_PREVIEW_MODE,

    NODE_ENV: process.env.NODE_ENV,
    ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS,
    JWT_SECRET: process.env.JWT_SECRET,

    ACCESS_TOKEN_EXPIRATION: process.env.ACCESS_TOKEN_EXPIRATION,
    REFRESH_TOKEN_EXPIRATION: process.env.REFRESH_TOKEN_EXPIRATION,

    KEY: process.env.KEY,
    IV: process.env.IV,
    ALGORITHM: process.env.ALGORITHM,

    BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN,
  },
});
