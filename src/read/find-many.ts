import { Prisma } from '@prisma/client';
import { DateTime } from 'luxon';
import { prisma } from '../shared/utils/prisma-client.util';

export class UserRepository {
  findManyUsers(query: Prisma.UserFindManyArgs) {
    return prisma.user.findMany(query);
  }

  findAllLegallyOfAgeUsers() {
    const now = DateTime.now();
    const eighteenYearsAgo = now
      .set({ year: now.year - 18 })
      .toJSDate();

    return prisma.user.findMany({
      where: {
        birthdate: {
          lte: eighteenYearsAgo,
        },
      },
    });
  }
}
