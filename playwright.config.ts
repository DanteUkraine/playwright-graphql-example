import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: 'tests',
    reporter: [
        ['list'],
        ['html', { open: 'never' }],
        ['playwright-graphql/coverage-reporter', {
            graphqlFilePath: './gql/pokemon.ts',
            minCoveragePerOperation: 20,
            logUncoveredOperations: true,
            saveGqlCoverageLog: false,
            saveHtmlSummary: true
        }],
        ['playwright-graphql/coverage-reporter', {
            graphqlFilePath: './gql/country.ts',
            minCoveragePerOperation: 20,
            logUncoveredOperations: true,
            saveGqlCoverageLog: false,
            saveHtmlSummary: true
        }]
    ],
});