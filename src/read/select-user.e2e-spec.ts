import {
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';
import { UserRawQueryResultsSerializer } from '../shared/utils/serializer.util';
import { UserRepository } from './select-user';

describe('UserRepository', () => {
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
