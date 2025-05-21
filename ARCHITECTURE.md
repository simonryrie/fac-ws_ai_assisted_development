# Travel Planning App: Architecture

## Technology Stack

### Frontend
- **Framework**: SvelteKit 2.x with Svelte 4
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **State Management**: Svelte stores
- **UI Components**: Custom components with TailwindCSS
- **Documentation**: Storybook

### Backend
- **Framework**: SvelteKit (server routes/API endpoints)
- **API**: GraphQL with Apollo Client
- **Database**: SQLite with Prisma ORM
- **Code Generation**: GraphQL codegen for TypeScript types

### Development Tools
- **Package Manager**: npm
- **Linting/Formatting**: ESLint + Prettier with pre-commit hooks using Husky
- **Testing**: Vitest
- **Version Control**: Git with Conventional Commits

## Architecture Overview

The Travel Planning App follows a layer-based architecture within the SvelteKit framework. This approach organizes code by technical role rather than by feature, promoting reusability and maintainability.

### Architectural Layers

1. **Presentation Layer**
   - SvelteKit routes and layouts
   - Svelte components
   - UI utilities and helpers

2. **State Management Layer**
   - Svelte stores for application state
   - Local storage persistence for user ID

3. **Data Access Layer**
   - GraphQL queries and mutations
   - Apollo Client configuration
   - Type definitions (generated)

4. **Server Layer**
   - GraphQL API implementation
   - SvelteKit API routes
   - Server-side validation

5. **Database Layer**
   - Prisma schema
   - Database models
   - Migrations

## Project Structure

```
travel-planner/
├── src/
│   ├── lib/
│   │   ├── components/ - Reusable UI components
│   │   │   ├── shared/ - Shared UI utility components (Button, Typography, etc.)
│   │   │   └── ... - Feature-specific components
│   │   ├── stores/ - Svelte stores for state management
│   │   ├── types/ - TypeScript type definitions
│   │   ├── graphql/ - GraphQL queries, mutations, and schema
│   │   ├── utils/ - Utility functions
│   │   └── server/ - Server-side code
│   │       ├── db/ - Database utilities
│   │       └── api/ - API utilities
│   ├── routes/ - SvelteKit routes
│   │   ├── +layout.svelte - Root layout
│   │   ├── +page.svelte - Home page
│   │   └── trips/ - Trip-related routes
│   └── app.html - HTML template
├── prisma/
│   ├── schema.prisma - Database schema
│   └── migrations/ - Database migrations
├── static/ - Static assets
├── tests/ - Test files
├── .eslintrc.js - ESLint configuration
├── .prettierrc - Prettier configuration
├── svelte.config.js - SvelteKit configuration
├── tailwind.config.js - TailwindCSS configuration
├── tsconfig.json - TypeScript configuration
└── vite.config.js - Vite configuration
```

## Data Flow

1. **User Interface → State Management**
   - User interactions trigger state updates
   - Svelte stores manage and propagate state changes

2. **State Management → Data Access**
   - State changes trigger data operations
   - GraphQL queries/mutations fetch/update data

3. **Data Access → Server**
   - GraphQL requests processed by the server
   - SvelteKit form actions validate and process data

4. **Server → Database**
   - Prisma ORM handles database operations
   - Type-safe queries based on schema

5. **Database → Server → UI**
   - Query results flow back to the UI
   - Data is transformed and displayed to the user

## Database Schema

### Entity Relationship Diagram

```
User (1) --- (*) UserTrip (*)---(1) CatalogTrip (1)---(*)--Location
                    |                    |                  |
                    |                    |                  |
                    v                    v                  |
             (*) Activity (*) <---- (*) CatalogTripExpense  |
                    ^                                       |
                    |                                       |
                    +---------------------------------------+
```

### Core Entities

```prisma
model User {
  id        String     @id @default(uuid())
  createdAt DateTime   @default(now())
  userTrips UserTrip[]
}

model CatalogTrip {
  id          String               @id @default(uuid())
  title       String
  description String?
  startDate   DateTime
  endDate     DateTime
  country     String
  continent   String
  locations   Location[]
  userTrips   UserTrip[]
  expenses    CatalogTripExpense[] // Base expenses for the catalog trip
}

model UserTrip {
  id            String                @id @default(uuid())
  userId        String
  catalogTripId String
  startDate     DateTime
  endDate       DateTime
  createdAt     DateTime              @default(now())
  updatedAt     DateTime              @updatedAt
  user          User                  @relation(fields: [userId], references: [id])
  catalogTrip   CatalogTrip           @relation(fields: [catalogTripId], references: [id])
  activities    UserTripActivity[]
}

model Location {
  id            String             @id @default(uuid())
  name          String
  catalogTripId String
  arrivalDate   DateTime
  departureDate DateTime
  catalogTrip   CatalogTrip        @relation(fields: [catalogTripId], references: [id])
  activities    ActivityLocation[]
}

model Activity {
  id          String             @id @default(uuid())
  title       String
  description String?
  duration    Int                // in minutes
  cost        Decimal            @db.Decimal(10, 2) // Fixed cost per activity
  locations   ActivityLocation[]
  userTrips   UserTripActivity[]
}

model ActivityLocation {
  activityId String
  locationId String
  activity   Activity @relation(fields: [activityId], references: [id])
  location   Location @relation(fields: [locationId], references: [id])

  @@id([activityId, locationId])
}

model UserTripActivity {
  userTripId String
  activityId String
  startTime  DateTime
  userTrip   UserTrip  @relation(fields: [userTripId], references: [id])
  activity   Activity  @relation(fields: [activityId], references: [id])

  @@id([userTripId, activityId])
}

model CatalogTripExpense {
  id            String      @id @default(uuid())
  catalogTripId String
  amount        Decimal     @db.Decimal(10, 2)
  category      String      // food, lodging, transport, etc.
  description   String
  catalogTrip   CatalogTrip @relation(fields: [catalogTripId], references: [id])
}
```

## GraphQL Schema

The GraphQL schema will be designed to match the database structure, with types corresponding to the database models.

```graphql
type User {
  id: ID!
  createdAt: DateTime!
  userTrips: [UserTrip!]!
}

type CatalogTrip {
  id: ID!
  title: String!
  description: String
  startDate: DateTime!
  endDate: DateTime!
  country: String!
  continent: String!
  locations: [Location!]!
  expenses: [CatalogTripExpense!]!
  totalCost: Float! # Calculated field
}

type UserTrip {
  id: ID!
  user: User!
  catalogTrip: CatalogTrip!
  startDate: DateTime!
  endDate: DateTime!
  createdAt: DateTime!
  updatedAt: DateTime!
  activities: [UserTripActivity!]!
  totalCost: Float! # Calculated from catalog trip + activities
}

type Location {
  id: ID!
  name: String!
  arrivalDate: DateTime!
  departureDate: DateTime!
  activities: [Activity!]!
}

type Activity {
  id: ID!
  title: String!
  description: String
  duration: Int!
  cost: Float!
  locations: [Location!]!
}

type UserTripActivity {
  activity: Activity!
  startTime: DateTime!
}

type CatalogTripExpense {
  id: ID!
  amount: Float!
  category: String!
  description: String!
}

# Queries and mutations will be defined to match the application requirements
```

## Error Handling

The application uses a combination of SvelteKit's global error hooks and targeted try/catch blocks:

1. **Global Error Handling**
   ```typescript
   // src/hooks.server.ts
   export const handleError: HandleServerError = ({ error, event }) => {
     const errorId = crypto.randomUUID();
     console.error(`Error ${errorId}: ${error.message}`);
     
     return {
       message: 'An unexpected error occurred',
       errorId,
     };
   };
   ```

2. **Form Validation**
   - Server-side validation with SvelteKit form actions
   - Clear error messages returned to the user

3. **GraphQL Error Handling**
   - Apollo Client error policies
   - Custom error types for different scenarios

## Security Considerations

1. **Data Validation**
   - Input sanitization for all user inputs
   - Strict type checking with TypeScript
   - Validation before database operations

2. **User Identification**
   - Unique user ID stored in local storage
   - No sensitive data stored client-side

3. **API Protection**
   - Rate limiting on API endpoints
   - Input validation on all API calls

## Performance Optimizations

1. **Code Splitting**
   - Route-based code splitting with SvelteKit
   - Dynamic imports for larger components

2. **Data Fetching**
   - Apollo cache for GraphQL queries
   - Optimistic UI updates for better UX

3. **Rendering**
   - Svelte's efficient DOM updates
   - Minimizing component re-renders

## References

- [FUNCTIONAL.md](FUNCTIONAL.md) - Functional requirements
- [CLAUDE.md](CLAUDE.md) - Coding standards and guidelines