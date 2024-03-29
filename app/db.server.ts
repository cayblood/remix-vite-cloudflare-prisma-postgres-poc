import type { AppLoadContext } from "@remix-run/cloudflare";
import pg from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

// Default exported function to get a new Prisma client instance
export default async function createPrismaClient(context: AppLoadContext) {
  // Extract database URL from context
  const schema = z.object({ DATABASE_URL: z.string() });
  const env = schema.safeParse(context?.cloudflare?.env);
  if (env.success) {
    const pool = new pg.Pool({ connectionString: env.data.DATABASE_URL });

    // Create Prisma client with the pool and adapter
    return new PrismaClient({
      adapter: new PrismaPg(pool),
    });
  } else {
    throw new Error('DATABASE_URL is not defined or empty in context');
  }
}

export async function createLocalPrismaClient() {
  return new PrismaClient();
}

export { PrismaClient };

