# Turborepo starter

This is an official starter turborepo.

## Install dependencies

Run the following command:

```sh {"id":"01J8GDVGP4A5QRXC5MAXBPQ1GY"}
bun install
```

## What's inside?

This turborepo includes the following packages/apps:

### Apps and Packages

- `web`: a [Next.js](https://nextjs.org/) app
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/database`: [Prisma](https://prisma.io/) ORM wrapper to manage & access your database
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
- [Prisma](https://prisma.io/) for database ORM
- [Docker Compose](https://docs.docker.com/compose/) for local database

### Database

We use [Prisma](https://prisma.io/) to manage & access our database. As such you will need a database for this project, either locally or hosted in the cloud.

To make this process easier, we offer a [`docker-compose.yml`](https://docs.docker.com/compose/) file to deploy a MySQL server locally with a new database named `turborepo` (To change this update the `MYSQL_DATABASE` environment variable in the `docker-compose.yml` file):

```bash {"id":"01J8GDVGP4A5QRXC5MB09XF0QR"}
cd my-turborepo
docker-compose up -d
```

Once deployed you will need to copy the `.env.example` file to `.env` in order for Prisma to have a environment variables access.

.env from dashboard:

```bash {"id":"01J8GDVGP4A5QRXC5MB12428B3"}
cp ./apps/dashboard/.env.example ./apps/dashboard/.env.local
```

.env from database package:

```bash {"id":"01J8GDVGP4A5QRXC5MB1CKZHAN"}
cd ./packages/database/.env.example ./packages/database/.env
```

If you added a custom database name, or use a cloud based database, you will need to update the `POSTGRES_PRISMA_URL` and `POSTGRES_URL_NON_POOLING` in your `.env` accordingly.

Once deployed & up & running, you will need to create & deploy migrations to your database to add the necessary tables. This can be done using [Prisma Migrate](https://www.prisma.io/migrate):

First you need to open the database package:

```bash {"id":"01J8GDVGP4A5QRXC5MB3A0Z5Q3"}
cd ./packages/database
```

Then you can create a migration:

```bash {"id":"01J8GDVGP4A5QRXC5MB4NXNBWQ"}
bun prisma migrate dev
```

If you need to push any existing migrations to the database, you can use either the Prisma db push or the Prisma migrate deploy command(s):

```bash {"id":"01J8GDVGP4A5QRXC5MB5FBE8MQ"}
bun run db:push

# OR

bun run db:migrate:deploy
```

There is slight difference between the two commands & [Prisma offers a breakdown on which command is best to use](https://www.prisma.io/docs/concepts/components/prisma-migrate/db-push#choosing-db-push-or-prisma-migrate).

An optional additional step is to seed some initial or fake data to your database using [Prisma's seeding functionality](https://www.prisma.io/docs/guides/database/seed-database).

To do this update check the seed script located in `packages/database/src/seed.ts` & add or update any users you wish to seed to the database.

Once edited run the following command to run tell Prisma to run the seed script defined in the Prisma configuration:

```bash {"id":"01J8GDVGP4A5QRXC5MB9CRNQW4"}
bun run db:seed
```

For further more information on migrations, seeding & more, we recommend reading through the [Prisma Documentation](https://www.prisma.io/docs/).

### Prisma Studio

To start the Prisma Studio GUI for your database, run the following command:

```bash
bun prisma studio
```

### Build

To build all apps and packages, run the following command:

```bash {"id":"01J8GDVGP4A5QRXC5MBAASWTDQ"}
bun run build
```

### Develop

To develop all apps and packages, run the following command for all apps and packages:

```bash {"id":"01J8GDVGP4A5QRXC5MBDSBN1CG"}
bun run dev
```

And for the dashboard app:

```bash {"id":"01J8GDVGP4A5QRXC5MBDZVBCMS"}
bun dev --filter=@repo/ui --filter=@repo/database --filter=dashboard
```

## Sync packages with Sherif

To sync packages with Sherif, run the following command:

```bash {"id":"01J8GDVGP4A5QRXC5MBHSKKE3B"}
bunx sherif@latest --fix
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
