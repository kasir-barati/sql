import { beforeAll, describe, expect, it } from '@jest/globals';
import { UniqueEmailConstraints } from '../shared/types/unique-email-constraints.type';
import { cleanup } from '../shared/utils/cleanup.util';
import { ErrorSerializer } from '../shared/utils/error-serializer.util';
import { UserRawQueryResultsSerializer } from '../shared/utils/serializer.util';
import { UserRepository } from './insert-user';

describe('UserRepository', () => {
  let userRepository: UserRepository;
  let errorSerializer: ErrorSerializer;
  let userRawQueryResultsSerializer: UserRawQueryResultsSerializer;

  beforeAll(async () => {
    errorSerializer = new ErrorSerializer();
    userRawQueryResultsSerializer =
      new UserRawQueryResultsSerializer();
    userRepository = new UserRepository(
      errorSerializer,
      userRawQueryResultsSerializer,
    );
    await cleanup();
  });

  it.each<
    Parameters<typeof userRepository.insertUserUsingRawQuery>['0']
  >([
    {
      email: 'ryoku.chikara@gmail.com',
      firstName: 'りょく',
      middleName: '',
      lastName: 'ちから',
    },
    {
      email: 'mao.kunai@gmail.com',
      firstName: 'まおう',
      middleName: '',
      lastName: 'くない',
    },
  ])('should insert a new user with email: $email', async (data) => {
    const user = await userRepository.insertUserUsingRawQuery(data);

    expect(user).toStrictEqual(expect.objectContaining(data));
  });

  it('should throw an error on duplicate email: ryoku.chikara@gmail.com', async () => {
    const result = userRepository.insertUserUsingRawQuery({
      email: 'ryoku.chikara@gmail.com',
      firstName: 'りょく',
      middleName: '',
      lastName: 'ちから',
    });

    await expect(result).rejects.toThrowError(UniqueEmailConstraints);
  });
});
