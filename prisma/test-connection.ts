import { PrismaClient } from '@prisma/client';

async function main() {
  // Create a new Prisma Client
  const prisma = new PrismaClient();

  try {
    // Connect to the database
    await prisma.$connect();
    console.log('✅ Successfully connected to the database');

    // Create a test user
    const user = await prisma.user.create({
      data: {
        id: 'test-user-1',
      },
    });
    console.log('✅ Test user created:', user);

    // Query the user to verify it was created
    const queriedUser = await prisma.user.findUnique({
      where: {
        id: 'test-user-1',
      },
    });
    console.log('✅ Queried user:', queriedUser);

    // Clean up
    await prisma.user.delete({
      where: {
        id: 'test-user-1',
      },
    });
    console.log('✅ Test user deleted');

  } catch (error) {
    console.error('❌ Error testing database connection:', error);
  } finally {
    // Disconnect from the database
    await prisma.$disconnect();
    console.log('✅ Disconnected from the database');
  }
}

main();