import { Prisma, User } from '@prisma/client';
import { ErrorSerializer } from '../shared/utils/error-serializer.util';
import { prisma } from '../shared/utils/prisma-client.util';
import { UserRawQueryResultsSerializer } from '../shared/utils/serializer.util';

export class UserRepository {
  constructor(
    private errorSerializer: ErrorSerializer,
    private userRawQueryResultsSerializer: UserRawQueryResultsSerializer,
  ) {}

  async insertUserUsingRawQuery(user: Prisma.UserCreateArgs['data']) {
    const result = await prisma.$queryRaw<User[]>`
    INSERT INTO users(email, first_name, middle_name, last_name, birthdate) 
    VALUES(
      ${user.email},
      ${user.firstName},
      ${user.middleName},
      ${user.lastName},
      ${user.birthdate}
    )
    RETURNING id, email, first_name AS "firstName", middle_name AS "middleName", last_name AS "lastName", birthdate;
  `.catch((error) => {
      this.errorSerializer.duplicateEmail(error);
      this.errorSerializer.unknown(error);
    });

    if (!result) {
      throw 'empty result!';
    }

    return result[0];
  }
}
