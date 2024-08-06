import { User } from '@prisma/client';
import { UserDataRepresentationInDatabase } from '../types/user-raw-queries.type';
import {
  PrismaUsersCountInEachCityReturnType,
  UsersCountInEachCity,
} from '../types/user.type';

export class UserRawQueryResultsSerializer {
  serializeInsertUserUsingRawQuery(
    data: UserDataRepresentationInDatabase,
  ): User {
    return {
      id: data.id,
      email: data.email,
      cityId: data.city_id,
      lastName: data.last_name,
      firstName: data.first_name,
      middleName: data.middle_name,
      birthdate: data.birthdate,
    };
  }

  serializeSelectAllUsers(
    data: Array<UserDataRepresentationInDatabase>,
  ): User[] {
    return data.map((user) => ({
      id: user.id,
      email: user.email,
      cityId: user.city_id,
      lastName: user.last_name,
      firstName: user.first_name,
      middleName: user.middle_name,
      birthdate: user.birthdate,
    }));
  }
}

export class UserSerializer {
  serializeUsersCountInEachCity(
    data: PrismaUsersCountInEachCityReturnType[],
  ): UsersCountInEachCity[] {
    return data.map(({ _count, cityId }) => ({
      cityId,
      count: _count._all,
    }));
  }
}
