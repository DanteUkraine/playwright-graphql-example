import { test, expect } from "@fixtures/gql";

test('playwright-graphql test', async ({ gql }) => {
    const res = await gql.getCityByName({
        name: 'Lviv'
    });

    expect(res.getCityByName).not.toBeNull();
})