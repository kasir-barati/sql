import { beforeAll, describe, expect, it } from '@jest/globals';
import { InsertUserUsingRawQuery } from '../types/user-raw-queries.type';
import { UserRawQueryResultsSerializer } from './serializer.util';

describe('UserRawQueryResultsSerializer', () => {
  let userRawQueryResultsSerializer =
    new UserRawQueryResultsSerializer();

  beforeAll(() => {
    userRawQueryResultsSerializer =
      new UserRawQueryResultsSerializer();
  });

  it.each<InsertUserUsingRawQuery>([
    {
      id: 12,
      city_id: 'TYO',
      middle_name: 'fun',
      last_name: 'lastname',
      email: 'some@some.jp',
      first_name: 'firstname',
    },
    {
      id: 199,
      city_id: 'PEK',
      middle_name: 'lin',
      last_name: 'lio',
      email: 'lin@lio.cn',
      first_name: 'yu',
    },
  ])(
    'should serialize inserted user using raw query',
    (unserialized) => {
      const result =
        userRawQueryResultsSerializer.serializeInsertUserUsingRawQuery(
          unserialized,
        );

      expect(result).toStrictEqual({
        id: unserialized.id,
        email: unserialized.email,
        cityId: unserialized.city_id,
        lastName: unserialized.last_name,
        firstName: unserialized.first_name,
        middleName: unserialized.middle_name,
      });
    },
  );

  it('should serialize select all users', () => {
    const unserialized: InsertUserUsingRawQuery[] = [
      {
        id: 12,
        city_id: 'TYO',
        middle_name: 'fun',
        last_name: 'lastname',
        email: 'some@some.jp',
        first_name: 'firstname',
      },
      {
        id: 199,
        city_id: 'PEK',
        middle_name: 'lin',
        last_name: 'lio',
        email: 'lin@lio.jp',
        first_name: 'yu',
      },
    ];

    const result =
      userRawQueryResultsSerializer.serializeSelectAllUsers(
        unserialized,
      );

    expect(result[0]).toHaveProperty('id');
    expect(result[0]).toHaveProperty('email');
    expect(result[0]).toHaveProperty('cityId');
    expect(result[0]).toHaveProperty('lastName');
    expect(result[0]).toHaveProperty('firstName');
    expect(result[0]).toHaveProperty('middleName');
  });
});
