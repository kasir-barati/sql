import { PrismaClient } from "@prisma/client";

// Instantiate Prisma Client
const prisma = new PrismaClient();

async function main() {
  // A `main` function so that we can use async/await
  const count = await prisma.user.count({ where: {} });

  if (count === 0) {
    console.log("Seed started");

    await prisma.user.createMany({
      data: [
        {
          cityId: "TYO",
          firstName: "Kasir",
        },
        {
          cityId: "TYO",
          firstName: "Mohammad Jawad",
        },
        {
          cityId: "TYO",
          firstName: "Emir",
        },
        {
          cityId: "NYC",
          firstName: "Mohammad Jawad",
        },
        {
          cityId: "BER",
          firstName: "Kasir",
        },
      ],
    });
  }
}

main()
  .then(() => {
    console.log("Seed done");
  })
  .catch((e: Error) => {
    console.error(e);
  })
  .finally(async () => {
    // Disconnect Prisma Client
    await prisma.$disconnect();
  });
