import {
  PrismaUsersCountInEachCityReturnType,
  UsersCountInEachCity,
} from '../types/user.type';

export class UserRawQueryResultsSerializer {}

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
