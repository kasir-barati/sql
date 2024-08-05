import { beforeAll, describe, expect, it } from '@jest/globals';
import { createUserUsingPrisma } from '../create/create-user';
import { createDummyUsersForOperatorPrecedence } from '../shared/dummy/user.dummy';
import { cleanup } from '../shared/utils/cleanup.util';
import { findManyUsers } from './find-many';

describe('findMany', () => {
  it('should return only one user', async () => {
    const email = 'random' + Date.now() + '@cia.jp';
    await createUserUsingPrisma({
      email,
      firstName: 'random',
      lastName: 'rand',
    });

    const users = await findManyUsers({
      where: {
        email,
      },
    });

    expect(users).toHaveLength(1);
    expect(users[0]).toStrictEqual(
      expect.objectContaining({
        email,
        firstName: 'random',
        lastName: 'rand',
      }),
    );
  });

  it('should return an array with no element', async () => {
    const users = await findManyUsers({
      where: {
        email: 'null@null.null',
      },
    });

    expect(users).toHaveLength(0);
  });
});

describe('findMany - Operator precedence', () => {
  beforeAll(async () => {
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

    const result = await findManyUsers({
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
        email: 'asdoiunhcd@asdm.com',
      },
      {
        cityId: 'TYO',
        lastName: null,
        middleName: null,
        id: expect.any(Number),
        email: 'au123ASD@asd.com',
        firstName: 'Mohammad Jawad',
      },
    ]);
  });
});
