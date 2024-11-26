import { test, expect } from "@fixtures/gql";

test('playwright-graphql test', async ({ gql }) => {
    const res = await gql.users({});

    expect(res.users).toEqual(
        expect.arrayContaining([
            expect.objectContaining({ username: 'jeresig' })
        ])
    );
})