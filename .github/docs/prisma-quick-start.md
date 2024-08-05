# Prisma quick start

- Run `pnpx prisma init --datasource-provider postgresql`. Learn more about `init` [here](https://www.prisma.io/docs/orm/reference/prisma-cli-reference#init).
  - To bootstrap a fresh Prisma ORM project.
  - Creates:
    - `prisma` directory:
    - `prisma.schema` file: where we model our data.

## `prisma/prisma.schema`

- Represent the tables in the underlying database.
- Serve as foundation for the generated Prisma Client API.
- After modeling or changing the model we need to [migration](#migration).

## Migration

We can perform two different kind of migration: automatic, manual.

### Automatic

When we do not need to change anything in the automated procedures that prisma will do for us.

1. Make sure that your database is up and running: `pnpm run compose:up`.
2. `pnpx prisma migrate dev --name init`.
   - Created a new SQL migration file for this migration in the `prisma/migrations` directory.
   - Executed the SQL migration file against the database.
   - Executed `prisma generate` under the hood.

### Manual

When we need to do som tweaks to the generated SQL queries or other stuff.
