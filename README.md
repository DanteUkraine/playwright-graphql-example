# Playwright-graphql example
This is playwright-graphql project template.

As a System under test you can use https://github.com/GraphQLGuide/graphql-rest-api-demo

When your SUT is ready.

### Install dependencies
`npm i`

### Generate graphql schema, operations and types
`npm run codegen`

### Run tests
`npm test`

```ts
test('verify location retrieval', async ({ gql }) => {
    const response = await gql.getLocation({ locationId: 1428 });

    // Assertions on the returned data
    expect(response.location.name).toBe('Test Location');
});

```
