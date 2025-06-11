<script lang="ts">
  import { goto } from '$app/navigation';
  import { signInWithEmailAndPassword, type UserCredential } from 'firebase/auth';
  import { auth } from '$lib/firebase';
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  
  let email = '';
  let password = '';
  let error = '';
  let isLoading = false;
  let showPassword = false;
  let mounted = false;
  
  onMount(() => {
    mounted = true;
    
    // Check if already logged in
    if (browser && auth && auth.onAuthStateChanged) {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          goto('/admin/dashboard');
        }
      });
      
      return () => unsubscribe();
    }
  });
  
  async function handleLogin(e: Event) {
    e.preventDefault();
    error = '';
    isLoading = true;
    
    // Basic validation
    if (!email || !password) {
      error = 'Please enter both email and password.';
      isLoading = false;
      return;
    }
    
    try {
      // Check if Firebase is available
      if (!browser || !auth) {
        throw new Error('Authentication service not available');
      }
      
      const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Login successful:', userCredential.user.email);
      // Navigation will be handled by onAuthStateChanged
    } catch (err: any) {
      console.error('Login error:', err);
      
      // Handle specific Firebase Auth errors
      switch (err.code) {
        case 'auth/user-not-found':
          error = 'No user found with this email address.';
          break;
        case 'auth/wrong-password':
          error = 'Incorrect password. Please try again.';
          break;
        case 'auth/invalid-email':
          error = 'Invalid email address format.';
          break;
        case 'auth/user-disabled':
          error = 'This account has been disabled.';
          break;
        case 'auth/too-many-requests':
          error = 'Too many failed attempts. Please try again later.';
          break;
        case 'auth/network-request-failed':
          error = 'Network error. Please check your connection.';
          break;
        default:
          error = err.message || 'Authentication failed. Please try again.';
      }
    } finally {
      isLoading = false;
    }
  }
</script>

<svelte:head>
  <title>Admin Access - PowerZone Control Center</title>
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
            {auth ? 'Secure Connection Active' : 'Connection Initializing...'}
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
              disabled={isLoading || !auth}
              class="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg 
                     focus:border-gym-red focus:outline-none transition-all duration-300
                     hover:border-gray-700 pl-10 disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="admin@powerzone.gym"
              autocomplete="username"
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
              disabled={isLoading || !auth}
              class="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg 
                     focus:border-gym-red focus:outline-none transition-all duration-300
                     hover:border-gray-700 pl-10 pr-12 disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="••••••••"
              autocomplete="current-password"
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
              disabled={isLoading || !auth}
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gym-red 
                     transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
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
              <div class="text-red-500 mt-0.5 flex-shrink-0">
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
          disabled={isLoading || !email || !password || !auth}
          class="relative w-full py-4 bg-gym-red font-black uppercase tracking-wider 
                 transition-all duration-300 overflow-hidden group
                 hover:shadow-[0_0_30px_rgba(220,38,38,0.5)]
                 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span class="relative z-10">
            {#if !auth}
              INITIALIZING...
            {:else if isLoading}
              AUTHENTICATING...
            {:else}
              INITIALIZE SESSION
            {/if}
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
        
        <!-- Forgot Password Link -->
        <div class="mt-4 text-center">
          <a href="/admin/forgot-password" class="text-sm text-gray-400 hover:text-gym-red transition-colors">
            Forgot your password?
          </a>
        </div>
      </div>
      
      <!-- Corner accents -->
      <div class="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-gym-red"></div>
      <div class="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-gym-red"></div>
      <div class="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-gym-red"></div>
      <div class="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-gym-red"></div>
    </form>
    
    <!-- Footer -->
    <div class="text-center mt-8">
      <a href="/" class="text-gray-400 hover:text-gym-red transition-colors text-sm inline-flex items-center gap-2 group">
        <svg class="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Return to Main Site
      </a>
    </div>
    
    <!-- Security Notice -->
    <div class="mt-8 p-4 border border-gray-800 rounded-lg bg-black/50">
      <p class="text-xs text-gray-500 text-center">
        🔒 This area is monitored and restricted to authorized personnel only. 
        All access attempts are logged.
      </p>
    </div>
    
    <!-- Demo Credentials (Remove in production) -->
    {#if import.meta.env.DEV}
      <div class="mt-4 p-3 border border-gray-800 rounded-lg bg-black/50">
        <p class="text-xs text-gray-500 text-center">
          Demo: admin@powerzone.gym / password123
        </p>
      </div>
    {/if}
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
  
  /* Additional animations */
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
  
  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  
  @keyframes slide-up {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-slide-up {
    animation: slide-up 0.6s ease-out;
  }
  
  @keyframes bounce {
    0%, 100% {
      transform: translateY(-25%);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    50% {
      transform: translateY(0);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
  }
  
  .animate-bounce {
    animation: bounce 1s infinite;
  }
</style>