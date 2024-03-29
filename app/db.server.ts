import type { AppLoadContext } from "@remix-run/cloudflare";
import pg from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const localPrisma = new PrismaClient();

// Default exported function to get a new Prisma client instance
export default async function createPrismaClient(context: AppLoadContext) {
  // Extract database URL from context
  const schema = z.object({ DATABASE_URL: z.string() });
  const env = schema.safeParse(context?.cloudflare?.env);
  if (env.success) {
    const pool = new pg.Pool({ connectionString: env.data.DATABASE_URL });

    // Create Prisma client with the pool and adapter
    const prisma = new PrismaClient({
      adapter: new PrismaPg(pool),
    });

    return prisma;
  } else {
    throw new Error('DATABASE_URL is not defined or empty in context');
  }
}

export { localPrisma, PrismaClient };

