import { InsertUserUsingRawQuery } from '../shared/types/user-raw-queries.type';
import { prisma } from '../shared/utils/prisma-client.util';
import { UserRawQueryResultsSerializer } from '../shared/utils/serializer.util';

export class UserRepository {
  constructor(
    private userRawQueryResultsSerializer: UserRawQueryResultsSerializer,
  ) {}

  async selectAllUsers() {
    const result = await prisma.$queryRaw<
      Array<InsertUserUsingRawQuery>
    >`SELECT * FROM users;`;
    const users =
      this.userRawQueryResultsSerializer.serializeSelectAllUsers(
        result,
      );

    return users;
  }
}
