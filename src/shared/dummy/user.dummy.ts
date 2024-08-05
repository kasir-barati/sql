import { Logger } from '../utils/logger.util';
import { prisma } from '../utils/prisma-client.util';

export async function createDummyUsersForOperatorPrecedence() {
  Logger.log('Create dummy users for operator precedence...');

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
