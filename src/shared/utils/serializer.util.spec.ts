import { beforeAll, describe, expect, it } from '@jest/globals';
import { PrismaUsersCountInEachCityReturnType } from '../types/user.type';
import { UserSerializer } from './serializer.util';

describe('UserSerializer', () => {
  let userSerializer: UserSerializer;

  beforeAll(() => {
    userSerializer = new UserSerializer();
  });

  it.each<PrismaUsersCountInEachCityReturnType>([
    {
      _count: { _all: 7 },
      cityId: 'BER',
    },
    {
      _count: { _all: 3 },
      cityId: 'KIB',
    },
  ])('should serialize counted users', (unserialized) => {
    const result = userSerializer.serializeUsersCountInEachCity([
      unserialized,
    ]);

    expect(result[0]).toStrictEqual({
      cityId: unserialized.cityId,
      count: unserialized._count._all,
    });
  });
});
