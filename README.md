# Remix app Cloudflare/Prisma/Postgres Proof-of-Concept

This app is a boilerplate remix app designed to prove out the ability to run
Remix Vite on a Cloudflare worker that connects to a supabase backend via Prisma
ORM.

## Setting up your environment

This assumes that you've installed [nvm](https://github.com/nvm-sh/nvm).
```
nvm install 20
nvm use 20
npm install -g pnpm
pnpm i
```

Set up a postgres instance on [supabase](https://supabase.com/). Create a
`.env` file with the following contents, substituting in your real connection
string:

```
DATABASE_URL="postgres://postgres.INSTANCEID:password@aws-0-us-east-1.pooler.supabase.com:5432/postgres"
```

Initialize your database with `pnpm run db:reset`.

At this point it should be possible to run `pnpm run dev`, browse to the app on
localhost, click the button and see the numbers increase, which means your
database is working.

To deploy the app to cloudflare, run `pnpm run deploy`.

## Background

This project was created as a standard remix boilerplate app using the remix
cloudflare template:
```
pnpx create-remix@latest --template remix-run/remix/templates/cloudflare
```
