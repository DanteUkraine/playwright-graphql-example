import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: 'tests',
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