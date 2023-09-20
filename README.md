# Installation

- `npm i -g @nestjs/cli`
- `yarn add @nestjs/graphql @nestjs/apollo @apollo/server graphql`

# Create a new project

- `nest n arch-onion-ts -p yarn -l TS`

# Development

- `nest g lib core-common` with the default prefix
- `nest g lib rest-common` with the default prefix
- `nest g lib in-memory-repository-common` with the default prefix

- `nest g lib note/core` with the default prefix
- `nest g lib note/in-memory-repository` with the default prefix
- `nest g lib note/in-memory-service-provider` with the default prefix

- `nest g app note/rest-api`
- `nest g app note/graphql-api`

# Build

- `nest build note-rest-api`
- `nest build note-graphql-api`

# Run

- `yarn start:dev` or `yarn start:dev note-rest-api`
- `yarn start:dev note-graphql-api`

# Check

- `http://localhost:3000/`, `http://localhost:3000/notes`
- `http://localhost:3001/`
