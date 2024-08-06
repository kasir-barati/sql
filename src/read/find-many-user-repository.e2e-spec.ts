import { beforeAll, describe, expect, it } from '@jest/globals';
import { DateTime } from 'luxon';
import { UserBuilder } from '../shared/builders/user.builder';
import { createDummyUsersForOperatorPrecedence } from '../shared/dummy/user.dummy';
import { cleanup } from '../shared/utils/cleanup.util';
import { UserRepository } from './find-many';

describe('UserRepository - findManyUsers', () => {
  let userRepository: UserRepository;

  beforeAll(() => {
    userRepository = new UserRepository();
  });

  it('should return only one user', async () => {
    const email = 'random' + Date.now() + '@cia.jp';
    const userId = await new UserBuilder().setEmail(email).build();

    const users = await userRepository.findManyUsers({
      where: {
        email,
      },
    });

    expect(users).toHaveLength(1);
    expect(users[0]).toStrictEqual(
      expect.objectContaining({
        id: userId,
        email,
      }),
    );
  });

  it('should return an array with no element', async () => {
    const users = await userRepository.findManyUsers({
      where: {
        email: 'null@null.null',
      },
    });

    expect(users).toHaveLength(0);
  });
});

describe('UserRepository - findManyUsers: Operator precedence', () => {
  let userRepository: UserRepository;

  beforeAll(async () => {
    userRepository = new UserRepository();
    await cleanup();
    await createDummyUsersForOperatorPrecedence();
  });

  it('should return asdoiunhcd@asdm.com & au123ASD@asd.com', async () => {
    // All of the following queries return the same result. Or perhaps I am doing something wrong.

    // { cityId: "TYO", OR: [{firstName: "Kasir" }, { firstName: "Mohammad Jawad" }] }
    // { AND: { OR: [{ firstName: 'Kasir' }, { firstName: 'Mohammad Jawad' }], cityId: 'TYO' }}
    // { AND: { cityId: 'TYO' }, OR: [{ firstName: 'Kasir' }, { firstName: 'Mohammad Jawad' } ]}
    // { OR: [{firstName: 'Kasir'}, { firstName: 'Mohammad Jawad' }], AND: { cityId: 'TYO' }}
    // { OR: [{ firstName: "Kasir" }, { firstName: "Mohammad Jawad" }], cityId: "TYO", }

    const result = await userRepository.findManyUsers({
      where: {
        cityId: 'TYO',
        OR: [
          {
            firstName: 'Kasir',
          },
          { firstName: 'Mohammad Jawad' },
        ],
      },
    });

    expect(result).toStrictEqual([
      {
        cityId: 'TYO',
        lastName: null,
        middleName: null,
        firstName: 'Kasir',
        id: expect.any(Number),
        birthdate: expect.any(Date),
        email: 'asdoiunhcd@asdm.com',
      },
      {
        cityId: 'TYO',
        lastName: null,
        middleName: null,
        id: expect.any(Number),
        email: 'au123ASD@asd.com',
        birthdate: expect.any(Date),
        firstName: 'Mohammad Jawad',
      },
    ]);
  });
});

describe('UserRepository - findAllLegallyOfAgeUsers', () => {
  let userRepository: UserRepository;

  beforeAll(() => {
    userRepository = new UserRepository();
  });

  it('should return all users who are older than 18', async () => {
    const now = DateTime.now();
    const eighteenYearsAgo = now
      .set({ year: now.year - 18 })
      .toJSDate();
    const userId = await new UserBuilder()
      .setBirthdate(eighteenYearsAgo)
      .build();

    const users = await userRepository.findAllLegallyOfAgeUsers();

    expect(users.filter((user) => user.id === userId)).toHaveLength(
      1,
    );
  });
});
