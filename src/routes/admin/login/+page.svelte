<script lang="ts">
  import { goto } from '$app/navigation';
  import { signInWithEmailAndPassword } from 'firebase/auth';
  import { auth } from '$lib/firebase';
  import { onMount } from 'svelte';
  
  let email = '';
  let password = '';
  let error = '';
  let isLoading = false;
  let showPassword = false;
  let mounted = false;
  
  onMount(() => {
    mounted = true;
  });
  
  async function handleLogin(e: Event) {
    e.preventDefault();
    error = '';
    isLoading = true;
    
    try {
      // For now, just simulate login
      console.log('Login attempt:', { email, password });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Uncomment when Firebase is configured
      // await signInWithEmailAndPassword(auth, email, password);
      
      // Simulate successful login
      await goto('/admin/dashboard');
    } catch (err: any) {
      error = err.message || 'Authentication failed. Access denied.';
      console.error('Login error:', err);
    } finally {
      isLoading = false;
    }
  }
</script>

<svelte:head>
  <title>Admin Access - Power Zone Control Center</title>
</svelte:head>

<section class="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
  <!-- Animated Background -->
  <div class="absolute inset-0">
    <div class="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
    
    <!-- Matrix-like falling code -->
    <div class="absolute inset-0 opacity-10">
      {#each Array(20) as _, i}
        <div 
          class="absolute text-gym-red text-xs font-mono animate-fall"
          style="
            left: {Math.random() * 100}%;
            animation-delay: {Math.random() * 10}s;
            animation-duration: {10 + Math.random() * 10}s;
          "
        >
          {Array(20).fill(0).map(() => Math.random() > 0.5 ? '1' : '0').join('')}
        </div>
      {/each}
    </div>
    
    <!-- Scan line effect -->
    <div class="absolute inset-0 bg-gradient-to-b from-transparent via-gym-red/10 to-transparent 
                h-32 animate-scan-vertical"></div>
  </div>
  
  <!-- Login Container -->
  <div class="relative z-10 w-full max-w-md {mounted ? 'animate-slide-up' : ''}">
    <!-- Header -->
    <div class="text-center mb-8">
      <div class="inline-flex items-center justify-center w-20 h-20 bg-gym-red/20 
                  border-2 border-gym-red rounded-full mb-4 animate-pulse">
        <span class="text-3xl">🔐</span>
      </div>
      <h1 class="text-4xl font-black mb-2">
        ADMIN <span class="text-gym-red glow-text">ACCESS</span>
      </h1>
      <p class="text-gray-400">Authorized personnel only</p>
    </div>
    
    <!-- Login Form -->
    <form on:submit={handleLogin} class="relative">
      <div class="futuristic-card p-8 border-2 border-gray-800 hover:border-gym-red/50 
                  transition-all duration-500">
        <!-- Security Status -->
        <div class="flex items-center gap-2 mb-6 p-3 bg-gym-red/10 border border-gym-red/30 rounded">
          <div class="w-2 h-2 bg-gym-red rounded-full animate-pulse"></div>
          <span class="text-xs font-bold uppercase tracking-wider text-gym-red">
            Secure Connection Active
          </span>
        </div>
        
        <!-- Email Field -->
        <div class="mb-6 relative">
          <label for="email" class="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-400">
            Admin Email
          </label>
          <div class="relative">
            <input
              type="email"
              id="email"
              bind:value={email}
              required
              disabled={isLoading}
              class="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg 
                     focus:border-gym-red focus:outline-none transition-all duration-300
                     hover:border-gray-700 pl-10 disabled:opacity-50"
              placeholder="admin@powerzone.gym"
            />
            <div class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
        </div>
        
        <!-- Password Field -->
        <div class="mb-6 relative">
          <label for="password" class="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-400">
            Access Code
          </label>
          <div class="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              bind:value={password}
              required
              disabled={isLoading}
              class="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg 
                     focus:border-gym-red focus:outline-none transition-all duration-300
                     hover:border-gray-700 pl-10 pr-12 disabled:opacity-50"
              placeholder="••••••••"
            />
            <div class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <button
              type="button"
              on:click={() => showPassword = !showPassword}
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gym-red 
                     transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {#if showPassword}
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                {:else}
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                {/if}
              </svg>
            </button>
          </div>
        </div>
        
        {#if error}
          <div class="mb-6 p-4 bg-red-900/20 border border-red-800 rounded-lg animate-slide-up">
            <div class="flex items-start gap-3">
              <div class="text-red-500 mt-0.5">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div class="flex-1">
                <p class="text-red-400 font-bold text-sm">Authentication Failed</p>
                <p class="text-red-400/80 text-sm mt-1">{error}</p>
              </div>
            </div>
          </div>
        {/if}
        
        <!-- Submit Button -->
        <button
          type="submit"
          disabled={isLoading}
          class="relative w-full py-4 bg-gym-red font-black uppercase tracking-wider 
                 transition-all duration-300 overflow-hidden group
                 hover:shadow-[0_0_30px_rgba(220,38,38,0.5)]
                 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span class="relative z-10">
            {isLoading ? 'AUTHENTICATING...' : 'INITIALIZE SESSION'}
          </span>
          <div class="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 
                      translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
          
          {#if isLoading}
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="flex gap-1">
                <div class="w-2 h-2 bg-white rounded-full animate-bounce" style="animation-delay: 0s"></div>
                <div class="w-2 h-2 bg-white rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                <div class="w-2 h-2 bg-white rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
              </div>
            </div>
          {/if}
        </button>
      </div>
      
      <!-- Corner accents -->
      <div class="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-gym-red"></div>
      <div class="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-gym-red"></div>
      <div class="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-gym-red"></div>
      <div class="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-gym-red"></div>
    </form>
    
    <!-- Footer -->
    <div class="text-center mt-8">
      <a href="/" class="text-gray-400 hover:text-gym-red transition-colors text-sm">
        ← Return to Main Site
      </a>
    </div>
    
    <!-- Security Notice -->
    <div class="mt-8 p-4 border border-gray-800 rounded-lg bg-black/50">
      <p class="text-xs text-gray-500 text-center">
        🔒 This area is monitored and restricted to authorized personnel only. 
        All access attempts are logged.
      </p>
    </div>
  </div>
</section>

<style>
  @keyframes fall {
    0% {
      transform: translateY(-100vh);
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      transform: translateY(100vh);
      opacity: 0;
    }
  }
  
  .animate-fall {
    animation: fall linear infinite;
  }
  
  @keyframes scan-vertical {
    0% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(100vh);
    }
  }
  
  .animate-scan-vertical {
    animation: scan-vertical 8s linear infinite;
  }
</style>