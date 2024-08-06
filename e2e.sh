clear
pnpm compose:down
pnpm compose:up
pnpx prisma generate
# TODO: Remove this and instead dockerize your nodejs process
echo "sleep for 10 seconds..."
sleep 10
pnpx prisma migrate dev
npx prisma db seed
pnpm test:e2e