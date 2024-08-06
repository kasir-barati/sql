import { UserDataRepresentationInDatabase } from '../shared/types/user-raw-queries.type';
import { prisma } from '../shared/utils/prisma-client.util';
import { UserRawQueryResultsSerializer } from '../shared/utils/serializer.util';

export class UserRepository {
  constructor(
    private userRawQueryResultsSerializer: UserRawQueryResultsSerializer,
  ) {}

  async selectAllUsers() {
    const result = await prisma.$queryRaw<
      Array<UserDataRepresentationInDatabase>
    >`SELECT * FROM users;`;
    const users =
      this.userRawQueryResultsSerializer.serializeSelectAllUsers(
        result,
      );

    return users;
  }

  async selectAllLegallyOfAgeUsers() {
    const result = await prisma.$queryRaw<
      UserDataRepresentationInDatabase[]
    >`SELECT * FROM users where birthdate <= NOW() - INTERVAL '18 years'`;
    const users =
      this.userRawQueryResultsSerializer.serializeSelectAllUsers(
        result,
      );

    return users;
  }
}
