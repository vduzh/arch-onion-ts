# Installation

- `npm i -g @nestjs/cli`
- `yarn add @nestjs/graphql @nestjs/apollo @apollo/server graphql`

# Create a new project

- `nest n arch-onion-ts -p yarn -l TS`

# Development

- `nest g lib common/core/domain` with the default prefix
- `nest g lib common/core/application` with the default prefix
- `nest g lib common/infrastructure/in-memory-repository` with the default prefix
- `nest g lib common/infrastructure/rest-api` with the default prefix
- `nest g lib common/infrastructure/graphql-api` with the default prefix

- `nest g lib note/core/domain` with the default prefix
- `nest g lib note/core/application` with the default prefix- 
- `nest g lib note/infrastructure/in-memory-repository` with the default prefix
- `nest g lib note/infrastructure/in-memory-service-provider` with the default prefix

- `nest g app note/rest-api`
- `nest g app note/graphql-api`

# Code the app

...

# Build

- `nest build note-rest-api`
- `nest build note-graphql-api`

# Test

- `yarn test:note-rest-api`
- `yarn test:note-graphql-api`

# e2e Test

- `yarn test:note-rest-api:e2e`
- `yarn test:note-graphql-api:e2e`

# Run

- `yarn start:dev note-rest-api`
- `yarn start:dev note-graphql-api`

# Check

- REST: `http://localhost:3000/notes`
- GraphQL: `http://localhost:3001/graphql`
