import { Prisma } from '@prisma/client';
import { prisma } from '../shared/utils/prisma-client.util';

export function findManyUsers(query: Prisma.UserFindManyArgs) {
  return prisma.user.findMany(query);
}

export function findManyPosts(query: Prisma.PostFindManyArgs) {
  return prisma.post.findMany(query);
}
