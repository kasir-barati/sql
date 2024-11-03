import { PrismaClient, User } from '@prisma/client';
import { UsersCountInEachCity } from '../shared/types/user.type';
import { UserRawQueryResultsSerializer } from '../shared/utils/serializer.util';

export class UserRepository {
  constructor(
    private prisma: PrismaClient,
    private userRawQueryResultsSerializer: UserRawQueryResultsSerializer,
  ) {}

  async selectAllUsers() {
    const users = await this.prisma.$queryRaw<Array<User>>`
    SELECT id, email, first_name AS "firstName", middle_name AS "middleName", last_name AS "lastName", birthdate
    FROM users;`;

    return users;
  }

  async selectAllLegallyOfAgeUsers() {
    const users = await this.prisma.$queryRaw<User[]>`
    SELECT id, email, first_name AS "firstName", middle_name AS "middleName", last_name AS "lastName", birthdate
    FROM users 
    WHERE birthdate <= NOW() - INTERVAL '18 years'`;

    return users;
  }

  /**
   * Important!
   *
   * We are converting bigint to int in PSQL, so if you have a huge dataset then you might wanna remove it since it can potentially loss precision while converting it.
   */
  async usersCountInEachCity() {
    const result = await this.prisma.$queryRaw<
      UsersCountInEachCity[]
    >`SELECT city_id as "cityId", count(*)::int as "count" FROM users GROUP BY city_id;`;

    return result;
  }
}
