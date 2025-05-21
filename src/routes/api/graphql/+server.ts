import { json } from '@sveltejs/kit';
import { createYoga } from 'graphql-yoga';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDefs } from '$lib/graphql/schema';
import { resolvers } from '$lib/graphql/resolvers';
import { prisma } from '$lib/server/db';
import type { RequestHandler } from './$types';

// Create a simple schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Create GraphQL Yoga instance
const yoga = createYoga({
  schema,
  graphiql: true,
  context: { prisma },
});

// SvelteKit request handlers with proper typing
export const GET: RequestHandler = async ({ request }) => {
  try {
    const response = await yoga.fetch(request);
    // Ensure we're returning a proper Response object
    return new Response(response.body, {
      status: response.status,
      headers: response.headers,
    });
  } catch (error) {
    console.error('GraphQL Error:', error);
    return json({ error: 'Internal Server Error' }, { status: 500 });
  }
};

export const POST: RequestHandler = async ({ request }) => {
  try {
    const response = await yoga.fetch(request);
    // Ensure we're returning a proper Response object
    return new Response(response.body, {
      status: response.status,
      headers: response.headers,
    });
  } catch (error) {
    console.error('GraphQL Error:', error);
    return json({ error: 'Internal Server Error' }, { status: 500 });
  }
};