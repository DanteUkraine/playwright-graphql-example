import { test as baseTest, expect, request, APIRequestContext, APIResponse } from '@playwright/test';
import { getClient as getPokemonClient, GqlAPI as PokemonAPI, RequestHandler as PokemonRequestHandler } from '@gql/pokemon';
import { getClient as getCountryClient, GqlAPI as CountryAPI } from '@gql/country';

export { expect };

// This optional callback allows user to add custom logic to gql api call.
const requestHandlerCallback: PokemonRequestHandler = async (request: () => Promise<APIResponse>) => {
  //  console.log('Before api call');
    const res = await request();
 //   console.log(`After api call: ${res.status()}`);
    return res;
};

type WorkerFixtures = {
    apiContext: APIRequestContext;
    pokemonAPI: PokemonAPI;
    countryAPI: CountryAPI;
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
    pokemonAPI: [
        async ({ apiContext }, use) => {
            await use(getPokemonClient(apiContext, { gqlEndpoint: '' }, requestHandlerCallback));
        }, { auto: false, scope: 'worker' }
    ],
    countryAPI: [
        async ({ apiContext }, use) => {
            await use(getCountryClient(apiContext, { gqlEndpoint: '' }));
        }, { auto: false, scope: 'worker' }
    ],
});