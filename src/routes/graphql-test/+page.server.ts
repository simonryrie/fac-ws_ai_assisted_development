import type { PageServerLoad } from './$types';

// This function runs on the server only
export const load: PageServerLoad = async () => {
  // You can return data here that won't cause hydration issues
  return {
    // Server-specific data that won't interfere with client-side rendering
    pageInfo: {
      title: 'GraphQL Test',
      description: 'Testing Apollo Client with GraphQL in SvelteKit'
    }
  };
};