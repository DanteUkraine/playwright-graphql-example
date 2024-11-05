import { test as baseTest, expect, request, APIRequestContext } from '@playwright/test';
import { getSdkRequester } from 'playwright-graphql';
import { getSdk } from '@gql';

export { expect };

const getClient = (apiContext: APIRequestContext) => getSdk(getSdkRequester(apiContext));

type WorkerFixtures = {
    gql: ReturnType<typeof getClient>;
};

export const test = baseTest.extend<{}, WorkerFixtures>({
    gql: [
        async ({}, use) => {
            const apiContext = await request.newContext({
                baseURL: 'http://localhost:4000'
            });
            await use(getClient(apiContext));
        }, { auto: false, scope: 'worker' }
    ]
});