import { test, expect } from "@fixtures/gql";

test('playwright-graphql test', async ({ pokemonAPI }) => {
    const res = await pokemonAPI.pokemons({
        limit: 2,
        offset: 1,
    });

    expect(res.pokemons?.results).toEqual(
        expect.arrayContaining([
            expect.objectContaining({ name: 'venusaur' })
        ])
    );
})

test('playwright-graphql negative test', async ({ pokemonAPI }) => {
    const res = await pokemonAPI.region({
        // @ts-ignore // this turns off TS protection and allows you to not send required field
        region: undefined
    }, { failOnEmptyData: false });

    console.log({ data: res })
    expect(res).toHaveProperty('errors[0].message', 'Variable "$region" of required type "String!" was not provided.');
})

test('playwright-graphql second schema test', async ({ countryAPI }) => {
    const res = await countryAPI.countries({
        lang: 'ua'
    });

    console.log({ data: res })
})
