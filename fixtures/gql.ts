import { test as baseTest, expect, request, APIRequestContext, APIResponse } from '@playwright/test';
import { getSdkRequester, coverageLogger } from '../../../TypeScript/playwright-graphql/lib';
import { getSdk } from '@gql';
import { getSdk as getSdkRaw } from '@gql.raw';

export { expect };
// This optional callback allows user to add custom logic to gql api call.
// Flexibility in this place helps implement different listeners and limit handlers, or slowdown test artificially.
const requestHandlerCallback = async (request: () => Promise<APIResponse>) => {
    console.log('Before api call');
    const res = await request();
    console.log(`After api call: ${res.status()}`);
    return res;
};

const getClient = (apiContext: APIRequestContext) => getSdk(getSdkRequester(apiContext, '/graphql', requestHandlerCallback));
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
            await use(coverageLogger(getClient(apiContext)));
        }, { auto: false, scope: 'worker' }
    ],
    rawGql: [
        async ({ apiContext }, use) => {
            await use(coverageLogger(getRawClient(apiContext)));
        }, { auto: false, scope: 'worker' }
    ]
});