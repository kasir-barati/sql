import { JestConfigWithTsJest } from 'ts-jest';

export default {
  displayName: 'awesome-sql-orm',
  testEnvironment: 'node',
  transform: {
    '^.+.tsx?$': ['ts-jest', {}],
  },
  verbose: true,
  testMatch: ['**/*.spec.ts'],
  // testMatch: ['<rootDir>/src/shared/utils/error-serializer.util.spec.ts'],
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
} satisfies JestConfigWithTsJest;
