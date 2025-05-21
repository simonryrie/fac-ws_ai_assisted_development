**IMPORTANT FOR CLAUDE: Reference this file before implementing anything**

# Project: Travel Planning App

## Project Overview

A SvelteKit application for planning and managing trips. Users can browse catalog trips, create personalized itineraries with activities, and track expenses. The app uses GraphQL for data management and SQLite for storage.

## Tech Stack

- Languages: TypeScript
- Frameworks: SvelteKit with Svelte 4
- UI: TailwindCSS with custom components
- API: GraphQL with Apollo Client and codegen
- Database: SQLite with Prisma ORM
- State: Svelte stores
- Testing: Vitest
- Documentation: Storybook, README, GraphQL schema docs
- Tooling: ESLint, Prettier, Husky

## Code Style & Conventions

### Import/Module Standards

- Group imports by type (Svelte, external, internal)
- Use absolute imports from `$lib` for project files
- Destructure imports when importing multiple items

```typescript
// External libraries
import { GraphQLClient } from 'graphql-request';
import { browser } from '$app/environment';

// Internal modules
import { userStore } from '$lib/stores/userStore';
import type { User, Trip } from '$lib/types';
```

### Naming Conventions

- Functions: camelCase (e.g., `createTrip`, `fetchActivities`)
- Components: PascalCase (e.g., `TripCard.svelte`, `ActivityList.svelte`)
- Constants: UPPER_SNAKE_CASE (e.g., `API_ENDPOINT`, `DEFAULT_LIMIT`)
- Files: Lowercase for routes, PascalCase for components
- Interfaces/Types: PascalCase with descriptive names

### Patterns to Follow

- Use layer-based architecture (components, stores, utils, server)
- Handle GraphQL errors with Apollo Client error policies
- Use SvelteKit's global error hooks for centralized error handling
- Implement Svelte stores for state management
- Follow SvelteKit's routing conventions

## Development Workflow

- Branch strategy: Feature branches from main
- Commit message format: Conventional Commits (`feat(Banner): Build banner component`)
- PR requirements: ESLint and tests must pass

## Testing Strategy

- Test framework: Vitest
- Component tests: Testing library
- Coverage target: 70% minimum
- Test naming: `{unit-name}.test.ts` or `{unit-name}.test.js`

## Environment Setup

- Required environment variables:
  ```
  DATABASE_URL="file:./dev.db"
  ```
- Setup commands:
  ```bash
  npm install
  npx prisma generate
  npx prisma migrate dev
  ```
- Local development server:
  ```bash
  npm run dev
  ```

## Common Commands

```bash
# Build command
npm run build

# Test command
npm run test

# Lint command
npm run lint

# Format command
npm run format

# Development server
npm run dev
```

## Project Structure

Key directories and their purpose:

- `/src` - Application source code
  - `/lib` - Reusable code
    - `/components` - UI components 
    - `/components/shared` - Utility components (Button, etc.)
    - `/stores` - Svelte stores for state management
    - `/graphql` - GraphQL schema, queries, and mutations
    - `/types` - TypeScript type definitions
    - `/utils` - Helper functions
    - `/server` - Server-side code
  - `/routes` - SvelteKit routes
- `/prisma` - Database schema and migrations
- `/tests` - Test files
- `/static` - Static assets

## Review Process Guidelines

Before submitting any code, ensure the following steps are completed:

1. **Run all lint, check and test commands**

2. **Review outputs and iterate until all issues are resolved**

3. **Assess compliance**:
   For each standard, explicitly state ✅ or ❌ and explain why:

   - Code style and formatting
   - Naming conventions
   - Architecture patterns (refer to `ARCHITECTURE.md`)
   - Error handling
   - Test coverage
   - Documentation

4. **Self-review checklist**:
   - [ ] Code follows defined patterns
   - [ ] No debug/commented code
   - [ ] Error handling implemented
   - [ ] Tests written and passing
   - [ ] Documentation updated

## Known Issues & Workarounds

- SQLite limitations: For larger scale, consider migrating to PostgreSQL
- Apollo Client setup with SvelteKit requires careful configuration
- Client-side persistence uses localStorage (not secure for sensitive data)

## References

- [SvelteKit Documentation](https://kit.svelte.dev/docs)
- [Apollo Client Documentation](https://www.apollographql.com/docs/react/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [FUNCTIONAL.md](FUNCTIONAL.md) - Functional requirements
- [ARCHITECTURE.md](ARCHITECTURE.md) - Technical architecture