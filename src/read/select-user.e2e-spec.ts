import { beforeAll, describe, expect, it } from '@jest/globals';
import { DateTime } from 'luxon';
import { UserBuilder } from '../shared/builders/user.builder';
import { prisma } from '../shared/utils/prisma-client.util';
import { UserRawQueryResultsSerializer } from '../shared/utils/serializer.util';
import { UserRepository } from './select-user';

describe('UserRepository - selectAllUsers', () => {
  let userRepository: UserRepository;
  let userRawQueryResultsSerializer: UserRawQueryResultsSerializer;

  beforeAll(() => {
    userRawQueryResultsSerializer =
      new UserRawQueryResultsSerializer();
    userRepository = new UserRepository(
      prisma,
      userRawQueryResultsSerializer,
    );
  });

  it('should return all users', async () => {
    const users = await userRepository.selectAllUsers();

    expect(users.length).toBeGreaterThanOrEqual(0);
  });
});

describe('UserRepository - selectAllLegallyOfAgeUsers', () => {
  let userRepository: UserRepository;
  let userRawQueryResultsSerializer: UserRawQueryResultsSerializer;

  beforeAll(() => {
    userRawQueryResultsSerializer =
      new UserRawQueryResultsSerializer();
    userRepository = new UserRepository(
      prisma,
      userRawQueryResultsSerializer,
    );
  });

  it('should return all users who are older than 18', async () => {
    const now = DateTime.now();
    const eighteenYearsAgo = now
      .set({ year: now.year - 18 })
      .toJSDate();
    const userId = await new UserBuilder()
      .setBirthdate(eighteenYearsAgo)
      .build();

    const users = await userRepository.selectAllLegallyOfAgeUsers();

    expect(users.filter((user) => user.id === userId)).toHaveLength(
      1,
    );
  });
});

describe('UserRepository - usersCountInEachCity', () => {
  let userRepository: UserRepository;
  let userRawQueryResultsSerializer: UserRawQueryResultsSerializer;

  beforeAll(() => {
    userRawQueryResultsSerializer =
      new UserRawQueryResultsSerializer();
    userRepository = new UserRepository(
      prisma,
      userRawQueryResultsSerializer,
    );
  });

  it('should return city id and how many user is in it', async () => {
    await new UserBuilder().setCityId('HKG').build();
    await new UserBuilder().setCityId('HKG').build();
    await new UserBuilder().setCityId('HKG').build();
    await new UserBuilder().setCityId('SIN').build();
    await new UserBuilder().setCityId('SIN').build();
    await new UserBuilder().setCityId('SIN').build();

    const result = await userRepository.usersCountInEachCity();

    expect(
      result.find(({ cityId }) => cityId === 'HKG')?.count,
    ).toBeGreaterThanOrEqual(3);
    expect(
      result.find(({ cityId }) => cityId === 'SIN')?.count,
    ).toBeGreaterThanOrEqual(3);
  });
});
