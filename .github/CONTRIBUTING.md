# How to run the App:

1. `cp .env.example .env`.
2. `docker compose --profile e2e up --build`.

> [!NOTE]
>
> You can run unit tests with `pnpm test:unit`. But if you have not installed 3rd-party libs you need to do that first.

## Develop

1. `cp .env.example .env`.
2. `docker compose --profile db up -d`.
3. Now we can do things like `pnpx prisma migrate dev` or other things that needs to talk to DB.

> [!CAUTION]
>
> You might wanna change the `DATABASE_URL` to use `localhost` instead of service name since your local system knows that. And do not worry about the docker compose since we'll overwrite it inside `compose.yml` file.

# Upgrade 3rd-party packages to latest version:

```cmd
pnpm upgrade --latest
```
