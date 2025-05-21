<script lang="ts">
  import { onMount } from 'svelte';
  import createClient from '$lib/graphql/client';
  import gql from 'graphql-tag';
  import { browser } from '$app/environment';

  let users = [];
  let loading = true;
  let error = null;
  let status = 'Ready';
  
  // Simple query to test GraphQL connection
  const QUERY = gql`
    query {
      users {
        id
        createdAt
      }
    }
  `;

  async function fetchData() {
    try {
      status = 'Fetching data...';
      loading = true;
      error = null;
      
      // Only run query in browser to prevent hydration mismatch
      if (browser) {
        // Create a client instance for this request
        const client = createClient();
        
        const result = await client.query({
          query: QUERY,
          fetchPolicy: 'no-cache'
        });
        
        users = result.data.users;
        status = 'Data loaded successfully!';
      }
    } catch (err) {
      console.error('GraphQL Error:', err);
      error = err;
      status = 'Error loading data';
    } finally {
      loading = false;
    }
  }

  // Only fetch on client-side to avoid hydration issues
  onMount(() => {
    if (browser) {
      fetchData();
    }
  });
</script>

<div class="p-4">
  <h1 class="text-2xl mb-4">GraphQL Test</h1>
  
  <div class="mb-4">
    <p>Status: {status}</p>
  </div>
  
  {#if error}
    <div class="p-4 mb-4 bg-red-100 text-red-700 rounded">
      <h3>Error:</h3>
      <pre>{JSON.stringify(error, null, 2)}</pre>
    </div>
  {/if}
  
  {#if users.length > 0}
    <div class="mb-4">
      <h3 class="text-lg font-semibold mb-2">Users:</h3>
      <ul class="list-disc pl-5">
        {#each users as user}
          <li>{user.id} - Created: {user.createdAt}</li>
        {/each}
      </ul>
    </div>
  {:else if !loading && !error}
    <p>No users found</p>
  {/if}
  
  <button 
    class="bg-blue-500 text-white px-4 py-2 rounded" 
    on:click={fetchData}
    disabled={loading}
  >
    {loading ? 'Loading...' : 'Refresh Data'}
  </button>
</div>