import { Prisma, PrismaClient } from '@prisma/client';

export class UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  update(id: number, data: Prisma.UserUpdateArgs['data']) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }
}
