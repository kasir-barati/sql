import { Prisma } from '@prisma/client';
import { UserDataRepresentationInDatabase } from '../shared/types/user-raw-queries.type';
import { ErrorSerializer } from '../shared/utils/error-serializer.util';
import { prisma } from '../shared/utils/prisma-client.util';
import { UserRawQueryResultsSerializer } from '../shared/utils/serializer.util';

export class UserRepository {
  constructor(
    private errorSerializer: ErrorSerializer,
    private userRawQueryResultsSerializer: UserRawQueryResultsSerializer,
  ) {}

  async insertUserUsingRawQuery(user: Prisma.UserCreateArgs['data']) {
    const result = await prisma.$queryRaw<
      UserDataRepresentationInDatabase[]
    >`
    INSERT INTO users(email, first_name, middle_name, last_name, birthdate) 
    VALUES(
      ${user.email},
      ${user.firstName},
      ${user.middleName},
      ${user.lastName},
      ${user.birthdate}
    )
    RETURNING id, email, first_name, middle_name, last_name, birthdate;
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
