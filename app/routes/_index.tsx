import type { AppLoadContext, MetaFunction } from "@remix-run/cloudflare";
import {typedjson, useTypedFetcher, useTypedLoaderData} from "remix-typedjson";
import createPrismaClient, { PrismaClient } from '~/db.server';

export async function loader({ context }: { context: AppLoadContext }) {
  let prisma: PrismaClient | null = null;

  try {
    // Create a new Prisma client for this request
    prisma = await createPrismaClient(context);

    // Your existing loader logic using prisma
    const data = await prisma.counter.findFirst();
    return typedjson({ count: data?.count || 0 });
  } finally {
    // Ensure disconnection even if errors occur
    if (typeof prisma !== 'undefined') {
      await prisma?.$disconnect();
    }
  }
}

export async function action({ context }: { context: AppLoadContext }) {
  let prisma: PrismaClient | null = null;

  try {
    // Create a new Prisma client for this request
    prisma = await createPrismaClient(context);

    // Your existing action logic using prisma
    const data = await prisma.counter.updateMany({
      data: {
        count: {
          increment: 1,
        },
      },
    });
    return typedjson({ count: data?.count || 0 });
  } finally {
    // Ensure disconnection even if errors occur
    if (typeof prisma !== 'undefined') {
      await prisma?.$disconnect();
    }
  }
}

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    {
      name: "description",
      content: "Welcome to Remix! Using Vite and Cloudflare!",
    },
  ];
};

interface CounterProps {
  count: number;
}

function Counter(props: CounterProps) {
  return <div>{props.count}</div>;
}


export default function Index() {
  const data = useTypedLoaderData<typeof loader>();
  const fetcher = useTypedFetcher();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix (with Vite and Cloudflare)</h1>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://developers.cloudflare.com/pages/framework-guides/deploy-a-remix-site/"
            rel="noreferrer"
          >
            Cloudflare Pages Docs - Remix guide
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
        <Counter count={data && data.count} />
        <fetcher.Form method="post" action="/?index">
          <input
            type="submit"
            className="border border-gray-200 p-0"
            value="Increment"
          />
        </fetcher.Form>
      </ul>
    </div>
  );
}
