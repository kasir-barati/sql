import { DateTime } from 'luxon';
import { UserSerializer } from '../shared/utils/serializer.util';

export class UserRepository {
  constructor(
    private prisma: PrismaClient,
    private userSerializer: UserSerializer,
  ) {}

  findManyUsers(query: Prisma.UserFindManyArgs) {
    return this.prisma.user.findMany(query);
  }

  findAllLegallyOfAgeUsers() {
    const now = DateTime.now();
    const eighteenYearsAgo = now
      .set({ year: now.year - 18 })
      .toJSDate();

    return this.prisma.user.findMany({
      where: {
        birthdate: {
          lte: eighteenYearsAgo,
        },
      },
    });
  }

  async usersCountInEachCity() {
    const result = await this.prisma.user.groupBy({
      by: ['cityId'],
      _count: {
        _all: true,
      },
    });
    const serializedData =
      this.userSerializer.serializeUsersCountInEachCity(result);

    return serializedData;
  }
}
