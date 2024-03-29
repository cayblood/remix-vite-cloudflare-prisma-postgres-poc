import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export { prisma };

// NOTE: The following code is required to run the database in cloudflare,
// but I can't get it working. Comment out the above code and comment in the
// code below to troubleshoot this in Cloudflare.
//
// import * as pg from 'pg';
// import { PrismaPg } from '@prisma/adapter-pg';
// import { PrismaClient } from '@prisma/client';
//
// const connectionString = `${process.env.DATABASE_URL}`;
//
// const { Pool } = pg;
// const pool = new Pool({ connectionString });
// const adapter = new PrismaPg(pool);
// const prisma = new PrismaClient({ adapter });
//
// export { prisma };