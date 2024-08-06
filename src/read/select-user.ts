import { PrismaClient } from '@prisma/client';
import { UserDataRepresentationInDatabase } from '../shared/types/user-raw-queries.type';
import { UsersCountInEachCity } from '../shared/types/user.type';
import { UserRawQueryResultsSerializer } from '../shared/utils/serializer.util';

export class UserRepository {
  constructor(
    private prisma: PrismaClient,
    private userRawQueryResultsSerializer: UserRawQueryResultsSerializer,
  ) {}

  async selectAllUsers() {
    const result = await this.prisma.$queryRaw<
      Array<UserDataRepresentationInDatabase>
    >`SELECT * FROM users;`;
    const users =
      this.userRawQueryResultsSerializer.serializeSelectAllUsers(
        result,
      );

    return users;
  }

  async selectAllLegallyOfAgeUsers() {
    const result = await this.prisma.$queryRaw<
      UserDataRepresentationInDatabase[]
    >`SELECT * FROM users where birthdate <= NOW() - INTERVAL '18 years'`;
    const users =
      this.userRawQueryResultsSerializer.serializeSelectAllUsers(
        result,
      );

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
