import { User } from '@prisma/client';
import { InsertUserUsingRawQuery } from '../types/user-raw-queries.type';

export class UserRawQueryResultsSerializer {
  serializeInsertUserUsingRawQuery(
    data: InsertUserUsingRawQuery,
  ): User {
    return {
      id: data.id,
      email: data.email,
      cityId: data.city_id,
      lastName: data.last_name,
      firstName: data.first_name,
      middleName: data.middle_name,
    };
  }

  serializeSelectAllUsers(
    data: Array<InsertUserUsingRawQuery>,
  ): User[] {
    return data.map((user) => ({
      id: user.id,
      email: user.email,
      cityId: user.city_id,
      lastName: user.last_name,
      firstName: user.first_name,
      middleName: user.middle_name,
    }));
  }
}
