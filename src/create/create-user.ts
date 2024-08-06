import { Prisma, User } from '@prisma/client';
import { ErrorSerializer } from '../shared/utils/error-serializer.util';
import { prisma } from '../shared/utils/prisma-client.util';

const errorSerializer = new ErrorSerializer();

export async function createUserUsingPrisma(
  user: Prisma.UserCreateArgs['data'],
): Promise<User> | never {
  const result = await prisma.user
    .create({
      data: user,
    })
    .catch((error) => {
      errorSerializer.duplicateEmail(error);
      errorSerializer.unknown(error);
    });

  if (!result) {
    throw 'No result!';
  }

  return result;
}
