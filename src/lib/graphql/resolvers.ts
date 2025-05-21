import type { PrismaClient } from '@prisma/client';
import { GraphQLScalarType, Kind } from 'graphql';

type Context = {
  prisma: PrismaClient;
};

// Custom DateTime scalar
const dateTimeScalar = new GraphQLScalarType({
  name: 'DateTime',
  description: 'DateTime custom scalar type',
  serialize(value: Date) {
    return value.toISOString(); // Convert outgoing Date to ISO string
  },
  parseValue(value: string) {
    return new Date(value); // Convert incoming ISO string to Date
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value); // Convert AST string to Date
    }
    return null;
  },
});

export const resolvers = {
  // Register the DateTime scalar
  DateTime: dateTimeScalar,
  
  // Relation resolvers
  User: {
    userTrips: async (parent: any, _: any, context: Context) => {
      return context.prisma.userTrip.findMany({
        where: { userId: parent.id },
      });
    },
  },
  
  CatalogTrip: {
    locations: async (parent: any, _: any, context: Context) => {
      return context.prisma.location.findMany({
        where: { catalogTripId: parent.id },
      });
    },
    expenses: async (parent: any, _: any, context: Context) => {
      return context.prisma.catalogTripExpense.findMany({
        where: { catalogTripId: parent.id },
      });
    },
    totalCost: async (parent: any, _: any, context: Context) => {
      const expenses = await context.prisma.catalogTripExpense.findMany({
        where: { catalogTripId: parent.id },
      });
      return expenses.reduce((total, expense) => total + Number(expense.amount), 0);
    },
  },
  
  UserTrip: {
    user: async (parent: any, _: any, context: Context) => {
      return context.prisma.user.findUnique({
        where: { id: parent.userId },
      });
    },
    catalogTrip: async (parent: any, _: any, context: Context) => {
      return context.prisma.catalogTrip.findUnique({
        where: { id: parent.catalogTripId },
      });
    },
    activities: async (parent: any, _: any, context: Context) => {
      const userTripActivities = await context.prisma.userTripActivity.findMany({
        where: { userTripId: parent.id },
        include: { activity: true }
      });
      return userTripActivities;
    },
    totalCost: async (parent: any, _: any, context: Context) => {
      // Get catalog trip costs
      const catalogTrip = await context.prisma.catalogTrip.findUnique({
        where: { id: parent.catalogTripId },
        include: {
          expenses: true,
        },
      });
      
      const baseCost = catalogTrip?.expenses.reduce(
        (total, expense) => total + Number(expense.amount), 
        0
      ) || 0;
      
      // Get additional activity costs
      const userTripActivities = await context.prisma.userTripActivity.findMany({
        where: { userTripId: parent.id },
        include: { activity: true }
      });
      
      const activityCost = userTripActivities.reduce(
        (total, item) => total + Number(item.activity.cost), 
        0
      );
      
      return baseCost + activityCost;
    },
  },
  
  Query: {
    // User queries
    user: async (_: any, args: { id: string }, context: Context) => {
      return context.prisma.user.findUnique({
        where: { id: args.id },
      });
    },
    users: async (_: any, __: any, context: Context) => {
      return context.prisma.user.findMany();
    },
    
    // For now, we'll just implement basic queries
    // More queries will be implemented as needed
  },
  
  Mutation: {
    // User mutations
    createUser: async (_: any, __: any, context: Context) => {
      return context.prisma.user.create({
        data: {},
      });
    },
    
    // For now, we'll just implement basic mutations
    // More mutations will be implemented as needed
  },
};