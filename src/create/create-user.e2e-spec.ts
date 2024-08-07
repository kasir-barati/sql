import { beforeAll, describe, expect, it } from '@jest/globals';
import { UniqueEmailConstraints } from '../shared/types/unique-email-constraints.type';
import { cleanup } from '../shared/utils/cleanup.util';
import {
  generateRandomDate,
  generateRandomNumber,
} from '../shared/utils/random.util';
import { createUserUsingPrisma } from './create-user';

describe('createUserUsingPrisma', () => {
  beforeAll(async () => {
    await cleanup();
  });

  it.each<Parameters<typeof createUserUsingPrisma>['0']>([
    {
      email: 'kasir.barati@gmail.com',
      firstName: 'Mohammad',
      middleName: 'Jawad',
      lastName: 'Barati',
      birthdate: generateRandomDate(),
    },
    {
      email: 'node.js.developers.kh@gmail.com',
      firstName: 'Mohammad',
      middleName: 'Jawad',
      lastName: 'Barati',
      birthdate: generateRandomDate(),
    },
  ])('should create a user with this email: $email', async (data) => {
    const user = await createUserUsingPrisma(data);

    expect(user).toStrictEqual(expect.objectContaining(data));
  });

  it('should not create user with duplicated email: kasir.barati@gmail.com', async () => {
    const result = createUserUsingPrisma({
      email: 'kasir.barati@gmail.com',
      firstName: 'Mohammad',
      middleName: 'Jawad',
      lastName: 'Barati',
      birthdate: generateRandomDate(),
    });

    await expect(result).rejects.toThrowError(UniqueEmailConstraints);
  });

  it.each<{ [x: string]: string }>([
    { middleName: '   middle' },
    { email: 'm.test@il.co    ' },
    { firstName: '   Mohammad    ' },
    { lastName: ' family ' },
  ])(
    'should sanitize data before inserting it: : %p',
    async (unsanitizedData) => {
      const sanitizedData = Object.values(unsanitizedData)[0].trim();

      const user = (await createUserUsingPrisma({
        birthdate: generateRandomDate(),
        email: 'e' + generateRandomNumber(4) + '@uu.cn',
        cityId: 'MUC',
        firstName: 'some thing',
        lastName: 'another thing',
        middleName: 'professed child',
        ...unsanitizedData,
      })) as any;

      expect(user[Object.keys(unsanitizedData)[0]]).toBe(
        sanitizedData,
      );
    },
  );
});
