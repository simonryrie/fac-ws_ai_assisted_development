<script lang="ts">
  import { onMount } from 'svelte';
  import createClient from '$lib/graphql/client';
  import { GET_USERS } from '$lib/graphql/queries';
  import type { GetUsersQuery } from '$lib/graphql/generated/operations-types';
  import { browser } from '$app/environment';

  let users: GetUsersQuery['users'] = [];
  let loading = true;
  let error: Error | null = null;

  async function fetchData() {
    try {
      loading = true;
      error = null;
      
      // Only run on the client to avoid hydration issues
      if (browser) {
        const client = createClient();
        const result = await client.query<GetUsersQuery>({
          query: GET_USERS,
          fetchPolicy: 'no-cache'
        });
        
        users = result.data.users;
      }
    } catch (err) {
      console.error('GraphQL Error:', err);
      error = err as Error;
    } finally {
      loading = false;
    }
  }

  onMount(() => {
    if (browser) {
      fetchData();
    }
  });
</script>

<div class="p-4">
  <h1 class="text-2xl font-bold mb-4">GraphQL Test with Generated Types</h1>
  
  {#if loading}
    <p>Loading users...</p>
  {:else if error}
    <div class="p-4 mb-4 bg-red-100 text-red-700 rounded">
      <h3>Error:</h3>
      <pre>{JSON.stringify(error, null, 2)}</pre>
    </div>
  {:else if users.length === 0}
    <p>No users found.</p>
  {:else}
    <div class="mb-4">
      <h3 class="text-lg font-semibold mb-2">Users:</h3>
      <ul class="list-disc pl-5">
        {#each users as user}
          <li class="mb-2">
            <strong>ID:</strong> {user.id}
            <br />
            <strong>Created:</strong> {new Date(user.createdAt).toLocaleString()}
          </li>
        {/each}
      </ul>
    </div>
  {/if}
  
  <button 
    class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
    on:click={fetchData}
    disabled={loading}
  >
    {loading ? 'Loading...' : 'Refresh Data'}
  </button>
</div>