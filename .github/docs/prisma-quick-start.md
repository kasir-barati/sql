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

We have two patterns for migrating our database:

1. Entity-first migration: Change your code and then automatically generate the SQL for it.
2. Database-first migration: Change your database with SQL and then pull the changes (`prisma db pull`).

And then we can apply them either automatically or manually.

### Automatic

When we do not need to change anything in the automated procedures that prisma will do for us. As you can guess it this is not always viable choice and that's why we have manual migration.

1. Make sure that your database is up and running: `pnpm run compose:up`.
2. `pnpx prisma migrate dev --name init`.
   - Created a new SQL migration file for this migration in the `prisma/migrations` directory.
   - Executed the SQL migration file against the database.
   - Executed `prisma generate` under the hood.

### Manual

When we need to do som tweaks to the generated SQL queries or other stuff.

1. `prisma migrate dev --create-only --name whatever`.

# Filter data in Prisma (adding `where` clause)

You can find a complete list [here](https://www.prisma.io/docs/orm/reference/prisma-client-reference#filter-conditions-and-operators)

## `lte` operator

Learn more about whether to choose ORM or just write raw SQL by reading [this informative post](https://dev.to/kasir-barati/postgresql-interval-data-type-or-orm-156h).

| ORM                                                                                                                         | PSQL                                                                                                                          |
| --------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| https://github.com/kasir-barati/awesome-sql-orm/blob/67b87fc85b6c5f16dca6396e4aa59c4530221ca1/src/read/find-many.ts#L11-L22 | https://github.com/kasir-barati/awesome-sql-orm/blob/67b87fc85b6c5f16dca6396e4aa59c4530221ca1/src/read/select-user.ts#L23-L31 |

# PostgreSQL `BEFORE INSERT` [Trigger](./glossary.md#databaseTrigger)

- It's associated with a table.
- Is activated before an `INSERT` event occurs on a table.

## Creating one

1. Define the [function](https://www.postgresql.org/docs/current/sql-createfunction.html):
   ```sql
   CREATE OR REPLACE FUNCTION trigger_function()
     RETURNS TRIGGER
     LANGUAGE PLPGSQL
   AS
   $$
   BEGIN
     -- trigger logic
     -- ...
     RETURN NEW;
   END;
   $$
   ```
   - Function name:
     - Must not match any existing function/procedure **with the same input argument types** in the **same schema** (but we can overload them).
     - If you drop a function and recreate it with the same name and arguments, your triggers and other stuff who were referring to the old one will not work. You need to drop and recreate them :smile:.
   - Return type:
     - Can be `void` (returns nothing).
     - Do not know more as of now :sob:.
   - Language:
     - Options: `SQL`, `C`, `INTERNAL`, `PLPGSQL`.
     - We ought to use `PLPGSQL` since we need this function for a trigger. Learn more here: [`SQL` VS `PLPGSQL`](https://stackoverflow.com/a/24771561/8784518).
   - function definition:
     - A string constant defining the function.
     - Options:
       - An SQL command.
       - An internal function name.
       - The path to an object file.
       - Text in a procedural language.
     - `$$`:
       - Is a delimiter.
       - Create the body which can have one or more SQL statements in a SQL function.
       - Or you can use single quotes without the need to escape them: `$$Kasir's company$$`.
       - Learn more:
         - [Dollar-Quoted String Constants](https://www.postgresql.org/docs/current/sql-syntax-lexical.html#SQL-SYNTAX-DOLLAR-QUOTING).
         - [Stackoverflow Q&A](https://stackoverflow.com/a/12172353/8784518).
2. Create the `BEFORE INSERT` [trigger](https://www.postgresql.org/docs/current/sql-createtrigger.html):
   ```sql
   CREATE OR REPLACE TRIGGER trigger_name
   BEFORE INSERT
   ON table_name
   FOR EACH {ROW | STATEMENT}
   EXECUTE FUNCTION trigger_function();
   ```
   - Triggered before the operation is attempted on a row.
   - Create a new trigger, or replace an existing trigger.
   - Associated with the specified table, view, or foreign table.
   - `FOR EACH ROW` is called once for every row that the operation modifies.
   - `FOR EACH STATEMENT` only executes once for any given operation, regardless of how many rows it modifies.
   - Name:
     - Must be distinct from the name of any other trigger for the same table.
   - Execute function:
     - With no arguments.
     - The passed function must return `TRIGGER`.
     - `EXECUTE PROCEDURE` is deprecated and is there just for show. In reality we cannot pass anything else except function to it.

> [!NOTE]
>
> Note that forgetting even a semicolon can fail your migration. So be mindful of syntax issues.
