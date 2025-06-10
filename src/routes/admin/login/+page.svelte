<script lang="ts">
  import { goto } from '$app/navigation';
  import { signInWithEmailAndPassword } from 'firebase/auth';
  import { auth } from '$lib/firebase';
  
  let email = '';
  let password = '';
  let error = '';
  let isLoading = false;
  
  async function handleLogin(e: Event) {
    e.preventDefault();
    error = '';
    isLoading = true;
    
    try {
      // For now, just simulate login
      console.log('Login attempt:', { email, password });
      
      // Uncomment when Firebase is configured
      // await signInWithEmailAndPassword(auth, email, password);
      
      // Simulate successful login
      await goto('/admin/dashboard');
    } catch (err: any) {
      error = err.message || 'Failed to login';
      console.error('Login error:', err);
    } finally {
      isLoading = false;
    }
  }
</script>

<svelte:head>
  <title>Admin Login - Power Zone Gym</title>
</svelte:head>

<section class="min-h-screen flex items-center justify-center px-4">
  <div class="max-w-md w-full">
    <div class="text-center mb-8">
      <h1 class="text-4xl font-black mb-2">
        ADMIN <span class="text-gym-red">LOGIN</span>
      </h1>
      <p class="text-gray-400">Access the dashboard</p>
    </div>
    
    <form on:submit={handleLogin} class="bg-gray-900 rounded-lg p-8 border border-gray-800">
      <div class="mb-6">
        <label for="email" class="block text-sm font-medium mb-2">Email</label>
        <input
          type="email"
          id="email"
          bind:value={email}
          required
          class="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:border-gym-red focus:outline-none"
          placeholder="admin@powerzone.gym"
        />
      </div>
      
      <div class="mb-6">
        <label for="password" class="block text-sm font-medium mb-2">Password</label>
        <input
          type="password"
          id="password"
          bind:value={password}
          required
          class="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:border-gym-red focus:outline-none"
          placeholder="••••••••"
        />
      </div>
      
      {#if error}
        <div class="mb-6 p-3 bg-red-900/20 border border-red-800 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      {/if}
      
      <button
        type="submit"
        disabled={isLoading}
        class="w-full py-3 bg-gym-red hover:bg-red-700 rounded-lg font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
    
    <div class="text-center mt-6">
      <a href="/" class="text-gray-400 hover:text-gym-red transition-colors">
        ← Back to website
      </a>
    </div>
  </div>
</section>