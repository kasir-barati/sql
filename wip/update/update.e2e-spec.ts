import { beforeAll, describe, expect, it } from '@jest/globals';
import { UserBuilder } from '../shared/builders/user.builder';
import { prisma } from '../shared/utils/prisma-client.util';
import { generateRandomNumber } from '../shared/utils/random.util';
import { UserRepository } from './prisma-update';

describe('UserRepository - update', () => {
  let userRepository: UserRepository;

  beforeAll(() => {
    userRepository = new UserRepository(prisma);
  });

  it.each<{ [x: string]: string }>([
    { middleName: '   middle' },
    { email: 'es' + generateRandomNumber(10) + '1t@ila.ir    ' },
    { firstName: '   Mohammad    ' },
    { lastName: ' family ' },
  ])(
    'should update user data with raw query: %p',
    async (unsanitizedData) => {
      const key = Object.keys(unsanitizedData)[0];
      const sanitizedData = Object.values(unsanitizedData)[0].trim();
      const userId = await new UserBuilder()
        .setMiddleName('Jakobe')
        .setEmail('so12' + generateRandomNumber(13) + 'pasn2@ne.lo')
        .setFirstName('killola')
        .setLastName('ngangular')
        .build();

      const user = (await userRepository.update(
        userId,
        unsanitizedData,
      )) as any;

      console.log({ user });

      expect(user[key]).toBe(sanitizedData);
    },
  );
});
