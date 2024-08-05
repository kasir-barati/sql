import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
} from '@prisma/client/runtime/library';
import { UniqueEmailConstraints } from '../types/unique-email-constraints.type';

export class ErrorSerializer {
  duplicateEmail(
    error: PrismaClientKnownRequestError,
  ): never | undefined {
    const { code, message, target } = this.extractErrorInfo(error);
    const uniqueConstraintsOrFailedRawQuery =
      this.isUniqueConstraints(error.code) ||
      this.didRawQueryFailed(error.code);

    if (
      this.isEmailConstraints({ target, code, message }) &&
      uniqueConstraintsOrFailedRawQuery
    ) {
      throw new UniqueEmailConstraints();
    }
  }

  unknown(error: PrismaClientUnknownRequestError): never {
    throw error;
  }

  private extractErrorInfo(error: PrismaClientKnownRequestError) {
    const targets = error?.meta?.target as string[] | undefined;
    const target = Array.isArray(targets) ? targets[0] : '';
    const code = error.meta?.code as string | undefined;
    const message = error.meta?.message as string | undefined;

    return {
      target,
      code,
      message,
    };
  }

  private didRawQueryFailed(code: string) {
    return 'P2010' === code;
  }
  /**
   *
   * @param code https://www.prisma.io/docs/orm/reference/error-reference
   */
  private isUniqueConstraints(code: string): boolean {
    return 'P2002' === code;
  }
  /**
   *
   * @param {object} params
   * @param {string} params.code https://www.postgresql.org/docs/current/errcodes-appendix.html
   */
  private isEmailConstraints({
    target,
    code,
    message,
  }: {
    target?: string;
    code?: string;
    message?: string;
  }): boolean {
    if (
      target === 'email' ||
      (code === '23505' && message?.includes('email'))
    ) {
      return true;
    }
    return false;
  }
}
