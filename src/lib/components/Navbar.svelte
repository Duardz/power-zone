<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  
  let isMenuOpen = false;
  let scrolled = false;
  
  const navLinks = [
    { href: '/', label: 'HOME' },
    { href: '/about', label: 'ABOUT' },
    { href: '/membership', label: 'MEMBERSHIP' },
    { href: '/contact', label: 'CONTACT' },
  ];
  
  onMount(() => {
    const handleScroll = () => {
      scrolled = window.scrollY > 50;
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });
</script>

<nav class="fixed top-0 z-50 w-full transition-all duration-300
            {scrolled ? 'bg-black/95 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,0.8)]' : 'bg-gradient-to-b from-black/80 to-transparent'}">
  <div class="absolute inset-0 bg-gradient-to-r from-transparent via-red-900/5 to-transparent"></div>
  
  <div class="container mx-auto px-4 relative">
    <div class="flex items-center justify-between h-20">
      <!-- Logo -->
      <a href="/" class="flex items-center space-x-2 group">
        <div class="relative">
          <span class="text-3xl font-black text-gym-red glow-text transition-all group-hover:scale-110">
            POWER
          </span>
          <span class="text-3xl font-black text-white transition-all group-hover:scale-110">
            ZONE
          </span>
          <div class="absolute -bottom-2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gym-red to-transparent 
                      scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
        </div>
      </a>
      
      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center space-x-1">
        {#each navLinks as link}
          <a 
            href={link.href} 
            class="relative px-6 py-3 font-medium tracking-wider text-sm
                   {$page.url.pathname === link.href ? 'text-gym-red' : 'text-gray-300'}
                   hover:text-gym-red transition-all duration-300 group"
          >
            <span class="relative z-10">{link.label}</span>
            
            <!-- Hover effect -->
            <div class="absolute inset-0 bg-gym-red/10 scale-x-0 group-hover:scale-x-100 
                        transition-transform duration-300 origin-left"></div>
            
            <!-- Active indicator -->
            {#if $page.url.pathname === link.href}
              <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-gym-red glow-text"></div>
            {/if}
          </a>
        {/each}
        
      </div>
      
      <!-- Mobile menu button -->
      <!-- svelte-ignore a11y_consider_explicit_label -->
      <button 
        class="md:hidden text-gray-300 p-2 hover:text-gym-red transition-colors"
        on:click={() => isMenuOpen = !isMenuOpen}
      >
        <div class="w-6 h-5 relative flex flex-col justify-between">
          <span class="w-full h-[2px] bg-current transition-all duration-300 origin-left
                       {isMenuOpen ? 'rotate-45 translate-y-[9px]' : ''}"></span>
          <span class="w-full h-[2px] bg-current transition-all duration-300
                       {isMenuOpen ? 'opacity-0' : ''}"></span>
          <span class="w-full h-[2px] bg-current transition-all duration-300 origin-left
                       {isMenuOpen ? '-rotate-45 -translate-y-[9px]' : ''}"></span>
        </div>
      </button>
    </div>
    
    <!-- Mobile Navigation -->
    <div class="md:hidden overflow-hidden transition-all duration-300
                {isMenuOpen ? 'max-h-96' : 'max-h-0'}">
      <div class="py-4 space-y-2 border-t border-gray-800/50 bg-black/95 backdrop-blur">
        {#each navLinks as link}
          <a 
            href={link.href} 
            class="block py-3 px-4 font-medium tracking-wider
                   {$page.url.pathname === link.href ? 'text-gym-red bg-gym-red/10' : 'text-gray-300'}
                   hover:text-gym-red hover:bg-gym-red/5 transition-all duration-300"
            on:click={() => isMenuOpen = false}
          >
            {link.label}
          </a>
        {/each}
        <a 
          href="/admin/login" 
          class="block py-3 px-4 mt-4 bg-gym-red/10 border border-gym-red/50
                 hover:bg-gym-red text-gray-300 hover:text-white font-bold tracking-wider transition-all duration-300"
        >
          ADMIN ACCESS
        </a>
      </div>
    </div>
  </div>
  
  <!-- Bottom border gradient -->
  <div class="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r 
              from-transparent via-gym-red/50 to-transparent"></div>
</nav>

<!-- Spacer for fixed navbar -->
<div class="h-20"></div>