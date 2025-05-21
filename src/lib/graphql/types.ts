import type { PrismaClient } from '@prisma/client';

export interface GraphQLContext {
  prisma: PrismaClient;
  // Add other context properties as needed (e.g., user authentication, etc.)
}