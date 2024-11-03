import { beforeAll, describe, expect, it } from '@jest/globals';
import { UserBuilder } from '../shared/builders/user.builder';
import { prisma } from '../shared/utils/prisma-client.util';
import { generateRandomNumber } from '../shared/utils/random.util';
import { UserRepository } from './prisma-update';

describe('UserRepository - prisma update', () => {
  let userRepository: UserRepository;

  beforeAll(() => {
    userRepository = new UserRepository(prisma);
  });

  it.each<{ [x: string]: string }>([
    { middleName: '   middle' },
    { email: 'mest@il.co    ' },
    { firstName: '   Mohammad    ' },
    { lastName: ' family ' },
  ])(
    'should update user data with prisma: %p',
    async (unsanitizedData) => {
      const key = Object.keys(unsanitizedData)[0];
      const sanitizedData = Object.values(unsanitizedData)[0].trim();
      const userId = await new UserBuilder()
        .setMiddleName('some middle name')
        .setEmail('idd' + generateRandomNumber(10) + 'le@ne.lo')
        .setFirstName('jogo god')
        .setLastName('yin yang')
        .build();

      const user = (await userRepository.update(
        userId,
        unsanitizedData,
      )) as any;

      expect(user[key]).toBe(sanitizedData);
    },
  );
});
