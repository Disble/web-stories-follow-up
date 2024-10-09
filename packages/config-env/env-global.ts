import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
    AUTH_SECRET: z.string().min(1),
    POSTGRES_PRISMA_URL: z.string().min(1),
    POSTGRES_URL_NON_POOLING: z.string().min(1),
    DISCORD_CLIENT_ID: z.string().min(1),
    DISCORD_CLIENT_SECRET: z.string().min(1),
    FB_API_BASE_URL: z.string().min(1),
    FB_ACCESS_TOKEN: z.string().min(1),
    FB_APP_SECRET: z.string().min(1),
    FB_PAGE_ID: z.string().min(1),
    FB_SYSTEM_USER_ID: z.string().min(1),
    FB_BUSINESS_ID: z.string().min(1),
  },
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    AUTH_SECRET: process.env.AUTH_SECRET,
    POSTGRES_PRISMA_URL: process.env.POSTGRES_PRISMA_URL,
    POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING,
    DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
    DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
    FB_API_BASE_URL: process.env.FB_API_BASE_URL,
    FB_ACCESS_TOKEN: process.env.FB_ACCESS_TOKEN,
    FB_APP_SECRET: process.env.FB_APP_SECRET,
    FB_PAGE_ID: process.env.FB_PAGE_ID,
    FB_SYSTEM_USER_ID: process.env.FB_SYSTEM_USER_ID,
    FB_BUSINESS_ID: process.env.FB_BUSINESS_ID,
  },
});
