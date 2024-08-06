import { Logger } from '../src/shared/utils/logger.util';
import { prisma } from '../src/shared/utils/prisma-client.util';
import { generateRandomDate } from '../src/shared/utils/random.util';

async function main() {
  // A `main` function so that we can use async/await
  const count = await prisma.user.count({ where: {} });

  if (count === 0) {
    Logger.log('Seed started');

    await prisma.user.createMany({
      data: [
        {
          email: 'asdoiunhcd@asdm.com',
          cityId: 'TYO',
          firstName: 'Kasir',
          birthdate: generateRandomDate(),
        },
        {
          email: 'au123ASD@asd.com',
          cityId: 'TYO',
          firstName: 'Mohammad Jawad',
          birthdate: generateRandomDate(),
        },
        {
          email: 'qomloa@asdzlp.com',
          cityId: 'TYO',
          firstName: 'Emir',
          birthdate: generateRandomDate(),
        },
        {
          email: 'qwepmn@bvxzg.jp',
          cityId: 'NYC',
          firstName: 'Mohammad Jawad',
          birthdate: generateRandomDate(),
        },
        {
          email: 'plmnb2345bhasd12@gp.jp',
          cityId: 'BER',
          firstName: 'Kasir',
          birthdate: generateRandomDate(),
        },
      ],
    });
  }
}

main()
  .catch((e: Error) => {
    Logger.error(e);
  })
  .finally(async () => {
    // Disconnect Prisma Client
    await prisma.$disconnect();
  });
