import { test, expect } from "@fixtures/gql";

test('playwright-graphql test', async ({ gql }) => {
    const res = await gql.pokemons({
        limit: 2,
        offset: 1,
    });

    expect(res.pokemons?.results).toEqual(
        expect.arrayContaining([
            expect.objectContaining({ name: 'venusaur' })
        ])
    );
})

test('playwright-graphql test with raw response', async ({ rawGql }) => {
    const res = await rawGql.pokemon({
        name: 'venusaur'
    });

    expect(res.data?.pokemon).toMatchObject({ name: 'venusaur' });
})