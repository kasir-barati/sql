import { Logger } from './logger.util';
import { prisma } from './prisma-client.util';

/**
 * @description
 * IMPORTANT:
 *
 * To keep things tidy and neat we are deleting in order, meaning we are deleting those who are not referenced in other tables.
 * But this might get tricky as our database gets more complex and complicated. But I guess as its name implies we can always opt for forcing our way.
 */
export async function cleanup() {
  Logger.log('Cleaning up the database...');
  await prisma.post.deleteMany({});
  await prisma.user.deleteMany({});
}
