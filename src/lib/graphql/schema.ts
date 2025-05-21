import gql from 'graphql-tag';

// Define your GraphQL schema
export const typeDefs = gql`
  # Custom scalar for DateTime (ISO format)
  scalar DateTime

  # Main entity types
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
    catalogTrip: CatalogTrip!
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
    userTrip: UserTrip!
    activity: Activity!
    startTime: DateTime!
  }

  type CatalogTripExpense {
    id: ID!
    catalogTrip: CatalogTrip!
    amount: Float!
    category: String!
    description: String!
  }

  # Input types for mutations
  input CreateUserTripInput {
    catalogTripId: ID!
    startDate: DateTime!
    endDate: DateTime!
  }
  
  input AddActivityToUserTripInput {
    userTripId: ID!
    activityId: ID!
    startTime: DateTime!
  }

  # Queries
  type Query {
    # User queries
    user(id: ID!): User
    users: [User!]!
    
    # CatalogTrip queries
    catalogTrip(id: ID!): CatalogTrip
    catalogTrips: [CatalogTrip!]!
    catalogTripsByContinent(continent: String!): [CatalogTrip!]!
    catalogTripsByCountry(country: String!): [CatalogTrip!]!
    
    # UserTrip queries
    userTrip(id: ID!): UserTrip
    userTripsByUser(userId: ID!): [UserTrip!]!
    
    # Location queries
    location(id: ID!): Location
    locationsByCatalogTrip(catalogTripId: ID!): [Location!]!
    
    # Activity queries
    activity(id: ID!): Activity
    activitiesByLocation(locationId: ID!): [Activity!]!
    
    # Expense queries
    catalogTripExpenses(catalogTripId: ID!): [CatalogTripExpense!]!
    expensesByCategory(catalogTripId: ID!, category: String!): [CatalogTripExpense!]!
  }

  # Mutations
  type Mutation {
    # User mutations
    createUser: User!
    
    # UserTrip mutations
    createUserTrip(input: CreateUserTripInput!): UserTrip!
    deleteUserTrip(id: ID!): Boolean!
    
    # Activity mutations
    addActivityToUserTrip(input: AddActivityToUserTripInput!): UserTripActivity!
    removeActivityFromUserTrip(userTripId: ID!, activityId: ID!): Boolean!
  }
`;

export default typeDefs;