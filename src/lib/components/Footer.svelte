<script>
  import { onMount } from 'svelte';
  
  let mounted = false;
  
  onMount(() => {
    mounted = true;
  });
</script>

<footer class="bg-gradient-to-br from-gray-950 via-black to-gray-900 border-t border-red-800/40 mt-auto relative overflow-hidden">
  <!-- Animated background elements -->
  <div class="absolute inset-0 opacity-15">
    <!-- Grid pattern -->
    <div class="absolute inset-0" style="
      background-image: 
        linear-gradient(rgba(220, 38, 38, 0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(220, 38, 38, 0.05) 1px, transparent 1px);
      background-size: 40px 40px;
    "></div>
    
    <!-- Floating geometric shapes -->
    <div class="absolute top-10 left-1/4 w-20 h-20 border border-red-600/10 rotate-45 animate-pulse"></div>
    <div class="absolute bottom-20 right-1/3 w-16 h-16 bg-red-600/5 rounded-full animate-bounce" style="animation-delay: 2s; animation-duration: 3s;"></div>
    <div class="absolute top-1/2 right-10 w-12 h-12 border-2 border-red-500/8 rotate-12 animate-spin" style="animation-duration: 8s;"></div>
  </div>
  
  <!-- Glowing top border -->
  <div class="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-60"></div>
  
  <div class="container mx-auto px-6 py-16 relative z-10">
    <!-- Main content grid -->
    <div class="grid lg:grid-cols-4 md:grid-cols-2 gap-12 mb-12">
      <!-- Brand section with enhanced styling -->
      <div class="lg:col-span-2">
        <div class="flex items-center space-x-3 mb-6 group">
          <div class="relative">
            <span class="text-4xl font-black text-red-500 glow-text tracking-tight">POWER</span>
            <div class="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-red-600 opacity-60"></div>
          </div>
          <span class="text-4xl font-black text-white tracking-tight">ZONE</span>
        </div>
        
        <p class="text-gray-200 leading-relaxed mb-6 text-lg max-w-md">
          Your local fitness family in <span class="text-red-400 font-semibold">Dingalan, Aurora</span>. 
          Step into the zone where every rep counts and every effort matters.
        </p>
        
        <!-- Stats or highlights -->
        <div class="grid grid-cols-2 gap-4 mb-6">
          <div class="bg-black/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
            <div class="text-red-400 font-bold text-xl">7</div>
            <div class="text-gray-300 text-sm">Days Open</div>
          </div>
          <div class="bg-black/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
            <div class="text-red-400 font-bold text-xl">24/7</div>
            <div class="text-gray-300 text-sm">Support</div>
          </div>
        </div>
        
        <!-- Social links with enhanced design -->
        <div class="flex gap-4">
          <a href="https://facebook.com/powerzonegym" target="_blank" rel="noopener noreferrer" 
             class="group relative w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-900 
                    border border-gray-700 rounded-xl flex items-center justify-center
                    hover:from-red-600 hover:to-red-700 hover:border-red-500 
                    transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-red-500/25">
            <svg class="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
        </div>
      </div>
      
      <!-- Quick Links with hover effects -->
      <div>
        <h3 class="font-bold text-red-400 mb-6 tracking-wider uppercase text-sm relative">
          Quick Links
          <div class="absolute -bottom-2 left-0 w-8 h-0.5 bg-red-500"></div>
        </h3>
        <ul class="space-y-4">
          {#each [
            { href: '/about', label: 'About Us' },
            { href: '/membership', label: 'Membership Plans' },
            { href: '/contact', label: 'Contact & Location' },
            { href: '/classes', label: 'Fitness Classes' }
          ] as link}
            <li>
              <a href={link.href} 
                 class="text-gray-200 hover:text-red-400 transition-all duration-300 
                        inline-flex items-center gap-3 group py-1 relative">
                <span class="text-red-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 
                           transition-all duration-300 text-sm">→</span>
                <span class="group-hover:translate-x-1 transition-transform duration-300">{link.label}</span>
              </a>
            </li>
          {/each}
        </ul>
      </div>
      
      <!-- Contact Info with enhanced styling -->
      <div>
        <h3 class="font-bold text-red-400 mb-6 tracking-wider uppercase text-sm relative">
          Find Us
          <div class="absolute -bottom-2 left-0 w-8 h-0.5 bg-red-500"></div>
        </h3>
        <ul class="space-y-4 text-gray-200">
          <li class="flex items-start gap-4 group">
            <span class="text-red-400 mt-1 text-lg group-hover:scale-110 transition-transform">📍</span>
            <div>
              <span class="text-white leading-relaxed font-medium">Purok Mulawin, Paltic</span><br/>
              <span class="text-gray-300">Dingalan, Aurora</span>
            </div>
          </li>
          <li class="flex items-center gap-4 group">
            <span class="text-red-400 text-lg group-hover:scale-110 transition-transform">📞</span>
            <a href="tel:+639269228903" 
               class="text-white hover:text-red-400 transition-colors font-medium">
              +63 926 922 8903
            </a>
          </li>
          <li class="flex items-center gap-4 group">
            <span class="text-red-400 text-lg group-hover:scale-110 transition-transform">✉️</span>
            <a href="mailto:powerzone@gmail.com" 
               class="text-white hover:text-red-400 transition-colors font-medium">
              powerzone@gmail.com
            </a>
          </li>
        </ul>
        
        <!-- Hours card with glow effect -->
        <div class="mt-8 p-4 bg-black/60 backdrop-blur-sm rounded-xl border border-gray-600
                    hover:border-red-500/50 transition-all duration-300 group">
          <div class="flex items-center gap-2 mb-2">
            <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <p class="text-xs text-gray-300 uppercase tracking-wide font-medium">Status</p>
          </div>
          <p class="text-sm font-bold text-white">Open 7 days a week</p>
          <p class="text-xs text-gray-300 mt-1">Call for current hours</p>
        </div>
      </div>
    </div>
    
    <!-- Bottom section with creator credits -->
    <div class="border-t border-gray-700/50 pt-8">
      <div class="flex flex-col lg:flex-row justify-between items-center gap-6">
        <!-- Copyright -->
        <div class="text-center lg:text-left">
          <p class="text-gray-200 text-sm font-medium">
            &copy; 2024-2025 PowerZone Gym. All rights reserved.
          </p>
          <p class="text-gray-400 text-xs mt-1">
            Proudly serving the Dingalan community
          </p>
        </div>
        
        <!-- AXIONARK Credits with enhanced styling -->
        <div class="flex items-center gap-4 text-center lg:text-right">
          <div class="text-xs text-gray-300">
            Website crafted by
          </div>
          <a href="https://axionark.com" target="_blank" rel="noopener noreferrer"
             class="group relative inline-flex items-center gap-2 px-4 py-2 
                    bg-gradient-to-r from-gray-800 to-black 
                    border border-gray-600 rounded-lg
                    hover:from-red-900/60 hover:to-red-800/60 hover:border-red-500/60
                    transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/20">
            
            <!-- AXIONARK logo/icon -->
            <div class="w-5 h-5 bg-gradient-to-br from-red-400 to-red-600 rounded 
                        flex items-center justify-center group-hover:rotate-12 transition-transform">
              <span class="text-white text-xs font-bold">A</span>
            </div>
            
            <div class="flex flex-col items-start">
              <span class="text-white font-bold text-sm tracking-wide">AXIONARK</span>
              <span class="text-gray-300 text-xs group-hover:text-red-300 transition-colors">
                Web Solutions
              </span>
            </div>
            
            <!-- Hover arrow -->
            <span class="text-red-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 
                       transition-all duration-300 text-sm">→</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</footer>

<style>
  .glow-text {
    text-shadow: 0 0 10px rgba(239, 68, 68, 0.5), 0 0 20px rgba(239, 68, 68, 0.3);
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  
  .animate-float {
    animation: float 4s ease-in-out infinite;
  }
</style>