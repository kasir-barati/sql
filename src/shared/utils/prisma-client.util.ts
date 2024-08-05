import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({ log: ['query', 'info'] });

process.on('beforeExit', async () => {
  await prisma.$disconnect();
});
