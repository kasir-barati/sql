import {
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';
import { DateTime } from 'luxon';
import { UserBuilder } from '../shared/builders/user.builder';
import { UserRawQueryResultsSerializer } from '../shared/utils/serializer.util';
import { UserRepository } from './select-user';

describe('UserRepository - selectAllUsers', () => {
  let userRepository: UserRepository;
  let userRawQueryResultsSerializer: UserRawQueryResultsSerializer;

  beforeAll(() => {
    userRawQueryResultsSerializer =
      new UserRawQueryResultsSerializer();
    userRepository = new UserRepository(
      userRawQueryResultsSerializer,
    );
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return all users', async () => {
    const users = await userRepository.selectAllUsers();

    expect(users.length).toBeGreaterThanOrEqual(0);
  });

  it('should call serializer', async () => {
    const serializeSelectAllUsersSpy = jest.spyOn(
      userRawQueryResultsSerializer,
      'serializeSelectAllUsers',
    );

    await userRepository.selectAllUsers();

    expect(serializeSelectAllUsersSpy).toHaveBeenCalledTimes(1);
  });
});

describe('UserRepository - selectAllLegallyOfAgeUsers', () => {
  let userRepository: UserRepository;
  let userRawQueryResultsSerializer: UserRawQueryResultsSerializer;

  beforeAll(() => {
    userRawQueryResultsSerializer =
      new UserRawQueryResultsSerializer();
    userRepository = new UserRepository(
      userRawQueryResultsSerializer,
    );
  });

  beforeEach(() => {
    jest.clearAllMocks();
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

  it("should've called the serializer", async () => {
    const serializeSelectAllUsersSpy = jest.spyOn(
      userRawQueryResultsSerializer,
      'serializeSelectAllUsers',
    );

    await userRepository.selectAllLegallyOfAgeUsers();

    expect(serializeSelectAllUsersSpy).toHaveBeenCalledTimes(1);
  });
});
