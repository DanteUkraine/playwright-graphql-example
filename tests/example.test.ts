import { test, expect } from "@fixtures/gql";

test('playwright-graphql test', async ({ gql }) => {
    const res = await gql.users({});

    expect(res.users).toEqual(
        expect.arrayContaining([
            expect.objectContaining({ username: 'jeresig' })
        ])
    );
})

test('playwright-graphql test with raw response', async ({ rawGql }) => {
    const res = await rawGql.users({});

    expect(res.data?.users).toEqual(
        expect.arrayContaining([
            expect.objectContaining({ username: 'jeresig' })
        ])
    );
})