import { defineConfig } from '@playwright/test';
import process from "process";

export default defineConfig({
    // Look for test files in the "tests" directory, relative to this configuration file.
    testDir: 'tests',

    // Run all tests in parallel.
    fullyParallel: true,

    // Opt out of parallel tests on CI.
    workers: process.env.CI ? 1 : undefined,

    // Reporter to use
    reporter: [
        ['list'],
        ['html', { open: 'never' }],
        ['playwright-graphql/coverage-reporter', {
            graphqlFilePath: './gql/graphql.ts',
            minCoveragePerOperation: 20,
            logUncoveredOperations: true,
            saveGqlCoverageLog: false,
            coverageFilePath: './gql-coverage.log',
            saveHtmlSummary: true
        }]
    ],

});