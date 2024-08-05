import { beforeAll, describe, expect, it } from '@jest/globals';
import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
} from '@prisma/client/runtime/library';
import { UniqueEmailConstraints } from '../types/unique-email-constraints.type';
import { ErrorSerializer } from './error-serializer.util';

describe('ErrorSerializer', () => {
  let errorSerializer: ErrorSerializer;

  beforeAll(() => {
    errorSerializer = new ErrorSerializer();
  });

  describe('duplicateEmail', () => {
    it('should throw UniqueEmailConstraints error for duplicate email error', () => {
      const error = {
        code: 'P2002',
        meta: {
          target: ['email'],
          message:
            'Unique constraint failed on the fields: (`email`)',
        },
      } as unknown as PrismaClientKnownRequestError;

      expect(() => errorSerializer.duplicateEmail(error)).toThrow(
        UniqueEmailConstraints,
      );
    });

    it('should return undefined for non-duplicate email error', () => {
      const error = {
        code: 'P2003',
        meta: {
          target: ['id'],
          message: 'Some other constraint failed',
        },
      } as unknown as PrismaClientKnownRequestError;

      expect(() =>
        errorSerializer.duplicateEmail(error),
      ).not.toThrow();
    });
  });

  describe('unknown', () => {
    it('should throw the given unknown error', () => {
      const error = new PrismaClientUnknownRequestError(
        'Unknown error',
        {
          clientVersion: '2.0.0',
        },
      );
      expect(() => errorSerializer.unknown(error)).toThrow(error);
    });
  });
});
