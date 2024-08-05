# How to run the App:

1. `pnpm i --frozen-lockfile`.
2. `cp .env.example .env`.
3. `pnpm compose:up`.
   - `pnpm compose:down`
4. `pnpx prisma generate`.
5. `pnpx prisma migrate dev`.
6. `npx prisma db seed`.
   - For some reason `pnpx` did not work with this error:
     ```cmd
     Error: Command failed with ENOENT: ts-node prisma/seed.ts
     spawn ts-node ENOENT
     ```
7. `pnpm test:e2e`.
   - `pnpm test:unit` for unit tests.

# Upgrade 3rd-party packages to latest version:

```cmd
pnpm upgrade --latest
```
