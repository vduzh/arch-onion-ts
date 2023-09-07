# Installation

- `npm i -g @nestjs/cli`

# Create a new project

- `nest n arch-onion-ts -p yarn -l TS`

# Development

- `nest g lib core-common` with the default prefix
- `nest g lib rest-common` with the default prefix
- `nest g lib in-memory-repository-common` with the default prefix

- `nest g lib notes-core` with the default prefix
- `nest g lib notes-in-memory-repository` with the default prefix

- `nest g app -p notes-rest-api notes-rest-api`

# Run

- `yarn start:dev`

# Check

- `localhost:3000/`
