import type { AppLoadContext } from "@remix-run/cloudflare";
import pg from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

// Default exported function to get a new Prisma client instance
export default async function createPrismaClient(context: AppLoadContext) {
  // Extract database URL from context
  const databaseUrl = context?.cloudflare?.env?.DATABASE_URL;

  // Validate database URL
  if (!databaseUrl || databaseUrl === '') {
    throw new Error('DATABASE_URL is not defined or empty in context');
  }

  // Create a new pool for this client instance
  const pool = new pg.Pool({ connectionString: databaseUrl });

  // Create Prisma client with the pool and adapter
  const prisma = new PrismaClient({
    adapter: new PrismaPg(pool),
  });

  return prisma;
}

