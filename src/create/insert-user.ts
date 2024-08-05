import { Prisma } from '@prisma/client';
import { InsertUserUsingRawQuery } from '../shared/types/user-raw-queries.type';
import { ErrorSerializer } from '../shared/utils/error-serializer.util';
import { prisma } from '../shared/utils/prisma-client.util';
import { UserRawQueryResultsSerializer } from '../shared/utils/serializer.util';

export class UserRepository {
  constructor(
    private errorSerializer: ErrorSerializer,
    private userRawQueryResultsSerializer: UserRawQueryResultsSerializer,
  ) {}

  async insertUserUsingRawQuery(user: Prisma.UserCreateArgs['data']) {
    const result = await prisma.$queryRaw<InsertUserUsingRawQuery[]>`
    INSERT INTO users(email, first_name, middle_name, last_name) 
    VALUES(
      ${user.email},
      ${user.firstName},
      ${user.middleName},
      ${user.lastName}
    )
    RETURNING id, email, first_name, middle_name, last_name;
  `.catch((error) => {
      this.errorSerializer.duplicateEmail(error);
      this.errorSerializer.unknown(error);
    });

    if (!result) {
      throw 'empty result!';
    }

    return this.userRawQueryResultsSerializer.serializeInsertUserUsingRawQuery(
      result[0],
    );
  }
}
