import { JestConfigWithTsJest } from 'ts-jest';

export default {
  displayName: 'awesome-sql-orm',
  testEnvironment: 'node',
  transform: {
    '^.+.tsx?$': ['ts-jest', {}],
  },
  verbose: true,
  testMatch: ['**/*.e2e-spec.ts'],
  // testMatch: ['<rootDir>/src/read/select-user.e2e-spec.ts'],
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
} satisfies JestConfigWithTsJest;
