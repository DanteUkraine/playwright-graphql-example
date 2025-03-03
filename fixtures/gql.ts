import { test as baseTest, expect, request, APIRequestContext, APIResponse } from '@playwright/test';
import { getClient, GqlAPI, RequestHandler } from '@gql';

export { expect };

// This optional callback allows user to add custom logic to gql api call.
const requestHandlerCallback: RequestHandler = async (request: () => Promise<APIResponse>) => {
  //  console.log('Before api call');
    const res = await request();
 //   console.log(`After api call: ${res.status()}`);
    return res;
};

type WorkerFixtures = {
    apiContext: APIRequestContext;
    gql: GqlAPI;
};

export const test = baseTest.extend<{}, WorkerFixtures>({
    apiContext: [
        async ({}, use) => {
            const apiContext = await request.newContext({
                baseURL: 'https://graphql-pokeapi.graphcdn.app/',
                extraHTTPHeaders: {
                  'Content-Type': 'application/json'
                }
            });
            await use(apiContext);
        }, { scope: 'worker' }
    ],
    gql: [
        async ({ apiContext }, use) => {
            await use(getClient(apiContext, { gqlEndpoint: '' }, requestHandlerCallback));
        }, { auto: false, scope: 'worker' }
    ],
});