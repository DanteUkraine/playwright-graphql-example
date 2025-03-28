# Playwright-graphql example
This is playwright-graphql project template.

As a System under test is https://graphql-pokeapi.vercel.app playground.

### Install dependencies
`npm i`

### Generate graphql schema, operations and types
`npm playwright-graphql --url https://graphql-pokeapi.vercel.app --coverage`

### Generate multiple schemas and type safe clients
`playwright-graphql -u https://graphql-pokeapi.graphcdn.app -u https://countries.trevorblades.com -s pokemon.gql -s country.gql --coverage`

### In case you need to send headers too

The same header will be added to each schema introspect API call.
`playwright-graphql -u https://graphql-pokeapi.graphcdn.app -u https://countries.trevorblades.com -h "Authorization: Bearer common-token" -s pokemon.gql -s country.gql --coverage`

Different headers for each url requires splitting scripts:
`playwright-graphql -u https://graphql-pokeapi.graphcdn.app -h "Authorization: Bearer pokemon-token" -s pokemon.gql -s country.gql --coverage`
`playwright-graphql -u https://countries.trevorblades.com -h "Authorization: Bearer country-token" -s country.gql --coverage`

### Run tests
`npm test`

### Coverage calculation
Config example in `playwright.config.ts`
