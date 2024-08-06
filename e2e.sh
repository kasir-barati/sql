clear
pnpm compose:down
pnpm compose:up
pnpx prisma generate
pnpx prisma migrate dev
npx prisma db seed
pnpm test:e2e