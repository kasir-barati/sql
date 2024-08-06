# How to run the App:

1. `cp .env.example .env`.
2. `docker compose up --build`.

> [!NOTE]
>
> You can run unit tests with `pnpm test:unit`. But if you have not installed 3rd-party libs you need to do that first.

# Upgrade 3rd-party packages to latest version:

```cmd
pnpm upgrade --latest
```
