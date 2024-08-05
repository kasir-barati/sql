import { prisma } from '../src/shared/utils/prisma-client.util';

async function main() {
  // A `main` function so that we can use async/await
  const count = await prisma.user.count({ where: {} });

  if (count === 0) {
    console.log('Seed started');

    await prisma.user.createMany({
      data: [
        {
          email: 'asdoiunhcd@asdm.com',
          cityId: 'TYO',
          firstName: 'Kasir',
        },
        {
          email: 'au123ASD@asd.com',
          cityId: 'TYO',
          firstName: 'Mohammad Jawad',
        },
        {
          email: 'qomloa@asdzlp.com',
          cityId: 'TYO',
          firstName: 'Emir',
        },
        {
          email: 'qwepmn@bvxzg.jp',
          cityId: 'NYC',
          firstName: 'Mohammad Jawad',
        },
        {
          email: 'plmnb2345bhasd12@gp.jp',
          cityId: 'BER',
          firstName: 'Kasir',
        },
      ],
    });
  }
}

main()
  .then(() => {
    console.log('Seed done');
  })
  .catch((e: Error) => {
    console.error(e);
  })
  .finally(async () => {
    // Disconnect Prisma Client
    await prisma.$disconnect();
  });
