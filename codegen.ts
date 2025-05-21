import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'src/lib/graphql/schema.ts',
  documents: ['src/lib/graphql/queries.ts'],
  generates: {
    // Generate server-side types for resolvers
    './src/lib/graphql/generated/schema.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        useIndexSignature: true,
        contextType: '../types#GraphQLContext',
        mappers: {
          User: '@prisma/client#User as UserModel',
          CatalogTrip: '@prisma/client#CatalogTrip as CatalogTripModel',
          UserTrip: '@prisma/client#UserTrip as UserTripModel',
          Location: '@prisma/client#Location as LocationModel',
          Activity: '@prisma/client#Activity as ActivityModel',
          CatalogTripExpense: '@prisma/client#CatalogTripExpense as CatalogTripExpenseModel',
        },
      },
    },
    
    // Generate TypeScript types for client operations
    './src/lib/graphql/generated/operations.ts': {
      plugins: ['typescript', 'typescript-operations'],
      config: {
        avoidOptionals: true,
        skipTypename: true,
      },
    },
    
    // Generate GraphQL and TypeScript typed operations
    './src/lib/graphql/generated/operations-types.ts': {
      plugins: ['typescript-operations'],
      config: {
        skipTypename: true,
        dedupeFragments: true,
      },
    },
  },
};

export default config;