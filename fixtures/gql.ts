import { test as baseTest, expect, request, APIRequestContext } from '@playwright/test';
import { getSdkRequester } from '../../../TypeScript/playwright-graphql/lib/requester';
import { getSdk } from '@gql';
import { getSdk as getSdkRaw } from '@gql.raw';

export { expect };

const getClient = (apiContext: APIRequestContext) => getSdk(getSdkRequester(apiContext, { gqlEndpoint: '/graphql' }));
const getRawClient = (apiContext: APIRequestContext) => getSdkRaw(getSdkRequester(apiContext, { gqlEndpoint: '/graphql', rawResponse: true }));


type WorkerFixtures = {
    apiContext: APIRequestContext;
    gql: ReturnType<typeof getClient>;
    rawGql: ReturnType<typeof getRawClient>;
};

export const test = baseTest.extend<{}, WorkerFixtures>({
    apiContext: [
        async ({}, use) => {
            const apiContext = await request.newContext({
                baseURL: 'http://localhost:3000'
            });
            await use(apiContext);
        }, { scope: 'worker' }
    ],
    gql: [
        async ({ apiContext }, use) => {
            await use(getClient(apiContext));
        }, { auto: false, scope: 'worker' }
    ],
    rawGql: [
        async ({ apiContext }, use) => {
            await use(getRawClient(apiContext));
        }, { auto: false, scope: 'worker' }
    ]
});