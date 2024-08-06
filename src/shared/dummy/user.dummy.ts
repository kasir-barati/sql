import { Logger } from '../utils/logger.util';
import { prisma } from '../utils/prisma-client.util';
import { generateRandomDate } from '../utils/random.util';

export async function createDummyUsersForOperatorPrecedence() {
  Logger.log('Create dummy users for operator precedence...');

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
