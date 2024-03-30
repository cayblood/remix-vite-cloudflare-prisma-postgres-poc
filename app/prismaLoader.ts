import type {
  ActionFunctionArgs,
  AppLoadContext,
  LoaderFunctionArgs
} from "@remix-run/cloudflare";
import type { Params } from "@remix-run/router";
import { PrismaClient } from '@prisma/client';
import createPrismaClient from '~/db.server.ts';

// Define the new LoaderPrismFunctionArgs interface
export interface LoaderPrismFunctionArgs {
  request: Request;
  context?: AppLoadContext;
  params: Params;
  prisma: PrismaClient; // Added prisma property
}

export function prismaLoader(loader: (args: LoaderPrismFunctionArgs) => Promise<object>) {
  return async function wrapper(args: LoaderFunctionArgs | ActionFunctionArgs) {
    let prisma: PrismaClient | undefined;

    try {
      // Create a new Prisma client for this request
      prisma = await createPrismaClient(args.context);

      // Call the original loader function with enhanced arguments,
      // formatted for readability
      return await loader({
        request: args.request,
        context: args.context,
        params: args.params,
        prisma,
      });
    } finally {
      // Ensure disconnection even if errors occur
      if (typeof prisma !== 'undefined') {
        await prisma.$disconnect();
      }
    }
  };
}


