import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// A `main` function so that you can use async/await
async function main() {
  // ... you will write your Prisma Client queries here
  prisma.user
    .findMany({
      where: {
        cityId: "TYO",
        OR: [
          {
            firstName: "Kasir",
          },
          { firstName: "Mohammad Jawad" },
        ],
      },
    })
    .then(console.log)
    .catch(console.error);

  prisma.user
    .findMany({
      where: {
        OR: [
          {
            firstName: "Kasir",
          },
          { firstName: "Mohammad Jawad" },
        ],
        cityId: "TYO",
      },
    })
    .then(console.log)
    .catch(console.error);

  prisma.user
    .findMany({
      where: {
        OR: [
          {
            firstName: "Kasir",
          },
          { firstName: "Mohammad Jawad" },
        ],
        AND: {
          cityId: "TYO",
        },
      },
    })
    .then(console.log)
    .catch(console.error);

  prisma.user
    .findMany({
      where: {
        AND: {
          cityId: "TYO",
        },
        OR: [
          {
            firstName: "Kasir",
          },
          { firstName: "Mohammad Jawad" },
        ],
      },
    })
    .then(console.log)
    .catch(console.error);

  prisma.user
    .findMany({
      where: {
        AND: {
          OR: [
            {
              firstName: "Kasir",
            },
            { firstName: "Mohammad Jawad" },
          ],
          cityId: "TYO",
        },
      },
    })
    .then((a) => {
      console.log(a.length);
    })
    .catch(console.error);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
