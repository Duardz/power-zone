<script lang="ts">
  import { onMount } from 'svelte';
  
  let mounted = false;
  
  onMount(() => {
    mounted = true;
  });
</script>

<svelte:head>
  <title>About PowerZone - Your Local Gym in Dingalan, Aurora</title>
</svelte:head>

<!-- Hero Section -->
<section class="relative py-32 px-4 overflow-hidden bg-black/90">
  <!-- Animated background -->
  <div class="absolute inset-0">
    <div class="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
    <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070')] 
                bg-cover bg-center opacity-5"></div>
    <!-- Grid overlay -->
    <div class="absolute inset-0" style="
      background-image: 
        linear-gradient(rgba(220, 38, 38, 0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(220, 38, 38, 0.05) 1px, transparent 1px);
      background-size: 100px 100px;
    "></div>
  </div>
  
  <div class="container mx-auto max-w-4xl text-center relative z-10">
    <div class="inline-block px-4 py-1 bg-gym-red/20 border border-gym-red/50 rounded-full 
                text-gym-red text-sm font-bold tracking-wider uppercase mb-6 animate-slide-up">
      EST. 2024
    </div>
    <h1 class="text-6xl md:text-7xl font-black mb-6 animate-slide-up" style="animation-delay: 0.1s">
      OUR <span class="text-gym-red glow-text">STORY</span>
    </h1>
    <p class="text-xl text-gray-300 max-w-2xl mx-auto animate-slide-up" style="animation-delay: 0.2s">
      The Real Ones Who Keep Things Running
    </p>
  </div>
  
  <!-- Floating elements -->
  <div class="absolute top-20 left-10 w-20 h-20 border border-gym-red/20 rounded-full animate-pulse"></div>
  <div class="absolute bottom-20 right-10 w-32 h-32 border border-gym-red/10 rounded-full animate-pulse" style="animation-delay: 1s"></div>
</section>

<!-- Mission Section -->
<section class="py-32 px-4 relative bg-black/80">
  <div class="container mx-auto max-w-7xl">
    <div class="grid lg:grid-cols-2 gap-16 items-center">
      <div class="space-y-8 {mounted ? 'animate-slide-up' : ''}">
        <div class="inline-block">
          <span class="px-3 py-1 bg-gym-red/20 border border-gym-red/50 rounded text-gym-red text-sm font-bold tracking-wider uppercase">
            Our Mission
          </span>
        </div>
        
        <h2 class="text-5xl md:text-6xl font-black leading-tight">
          BUILDING A <span class="text-gym-red glow-text">STRONGER</span>
          <br/>
          <span class="text-3xl md:text-4xl text-gray-400">COMMUNITY</span>
        </h2>
        
        <div class="space-y-4 text-gray-300 text-lg">
          <p>
            We're not pros. We're <strong>locals</strong> who just want to build a better, healthier community — one step at a time. 
            At <strong>PowerZone</strong>, we believe fitness doesn't have to be fancy to be effective.
          </p>
          <p>
            No complicated machines. No egos. Just real people trying to get stronger, together.
          </p>
        </div>
        
        <div class="space-y-4">
          <h3 class="text-2xl font-black text-gym-red">OUR GOALS:</h3>
          <div class="space-y-3">
            <div class="flex items-center gap-3">
              <span class="text-gym-red text-xl">🔹</span>
              <span class="text-lg">Make fitness <strong>accessible</strong></span>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-gym-red text-xl">🔹</span>
              <span class="text-lg">Keep things <strong>honest</strong></span>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-gym-red text-xl">🔹</span>
              <span class="text-lg">Grow stronger, <strong>as a community</strong></span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="relative">
        <div class="relative group">
          <img 
            src="https://images.unsplash.com/photo-1558611848-73f7eb4001a1?q=80&w=2071" 
            alt="PowerZone Community" 
            class="rounded-lg shadow-2xl group-hover:scale-105 transition-transform duration-700"
          />
          <!-- Overlay gradient -->
          <div class="absolute inset-0 bg-gradient-to-tr from-black/50 via-transparent to-gym-red/20 rounded-lg"></div>
          
          <!-- Tech overlay effect -->
          <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div class="absolute inset-0 bg-gradient-to-b from-gym-red/20 to-transparent animate-scan rounded-lg"></div>
          </div>
        </div>
        
        <!-- Decorative elements -->
        <div class="absolute -top-8 -right-8 w-32 h-32 bg-gym-red/10 rounded-full blur-2xl"></div>
        <div class="absolute -bottom-8 -left-8 w-40 h-40 bg-gym-red/5 rounded-full blur-3xl"></div>
      </div>
    </div>
  </div>
</section>

<!-- Team Section -->
<section class="py-32 px-4 relative bg-black/90">
  <div class="container mx-auto max-w-7xl">
    <div class="text-center mb-16">
      <span class="inline-block px-4 py-1 bg-gym-red/20 border border-gym-red/50 rounded-full 
                   text-gym-red text-sm font-bold tracking-wider uppercase mb-6">
        Elite Squad
      </span>
      <h2 class="text-5xl md:text-6xl font-black">
        MEET THE <span class="text-gym-red glow-text">TEAM</span>
      </h2>
      <p class="text-gray-400 text-lg mt-4 max-w-2xl mx-auto">
        We're not claiming to be experts — but we show up, and we're here to help.
      </p>
    </div>
    
    <div class="max-w-4xl mx-auto">
      <div class="group {mounted ? 'animate-slide-up' : ''}">
        <div class="futuristic-card overflow-hidden border-2 border-gray-800 hover:border-gym-red/50 
                    transition-all duration-500">
          <div class="grid md:grid-cols-2 gap-8 items-center p-8">
            <!-- Image container -->
            <div class="relative h-96 overflow-hidden rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=1887" 
                alt="Anthony Cerenas" 
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
              
              <!-- Stats overlay -->
              <div class="absolute bottom-4 left-4 right-4">
                <div class="bg-black/80 backdrop-blur border border-gym-red/50 p-4 rounded">
                  <div class="flex items-center gap-4 text-sm">
                    <span>📍 Dingalan Local</span>
                    <span>|</span>
                    <span>🏋️ Everyday Grind</span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Content -->
            <div class="space-y-6">
              <div>
                <h3 class="text-3xl font-black mb-2">ANTHONY CERENAS</h3>
                <p class="text-gym-red font-bold tracking-wider uppercase">Gym Staff & Community Motivator</p>
              </div>
              
              <p class="text-gray-300 leading-relaxed">
                Anthony is the heart of PowerZone. Not a certified trainer (yet!), but always there to help you settle in, 
                stay consistent, and make your workouts count.
              </p>
              
              <p class="text-gray-300 leading-relaxed">
                Friendly, approachable, and committed to learning alongside our members.
              </p>
              
              <!-- Contact -->
              <div class="pt-4 border-t border-gray-800">
                <p class="text-sm text-gray-400 mb-2">Need help? Find Anthony at:</p>
                <div class="flex flex-col gap-2">
                  <a href="tel:+639269228903" class="text-gym-red hover:text-white transition-colors">
                    📞 +63 926 922 8903
                  </a>
                  <span class="text-gray-400">
                    📍 PowerZone Gym, Purok Mulawin
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Timeline Section -->
<section class="py-32 px-4 bg-black/80 relative overflow-hidden">
  <div class="container mx-auto max-w-6xl">
    <div class="text-center mb-16">
      <span class="inline-block px-4 py-1 bg-gym-red/20 border border-gym-red/50 rounded-full 
                   text-gym-red text-sm font-bold tracking-wider uppercase mb-6">
        Evolution
      </span>
      <h2 class="text-5xl md:text-6xl font-black">
        OUR <span class="text-gym-red glow-text">JOURNEY</span>
      </h2>
      <p class="text-gray-400 text-lg mt-4">Just Getting Started</p>
    </div>
    
    <div class="relative">
      <!-- Timeline line -->
      <div class="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gym-red/30"></div>
      
      <!-- Timeline items -->
      {#each [
        { 
          year: '2024', 
          title: 'Stepping In the Zone', 
          desc: 'PowerZone Gym opens its doors with humble equipment and a big goal: help locals take charge of their health.' 
        },
        { 
          year: '2025', 
          title: 'Community First', 
          desc: 'We start building our loyal fitness family. Free orientations, flexible memberships, and simple but consistent service.' 
        },
        { 
          year: 'Future', 
          title: 'Step by Step, We Grow', 
          desc: 'More equipment. Better training. Real transformation. And maybe, someday — full-time pros.' 
        }
      ] as item, i}
        <div class="relative flex items-center justify-center mb-16 {mounted ? 'animate-slide-up' : ''}" 
             style="animation-delay: {0.1 * i}s">
          <div class="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gym-red rounded-full 
                      shadow-[0_0_20px_rgba(220,38,38,0.8)]"></div>
          
          <div class="w-full max-w-md {i % 2 === 0 ? 'pr-8 text-right ml-auto' : 'pl-8 mr-auto'}">
            <div class="futuristic-card p-6 border border-gray-800 hover:border-gym-red/50 transition-all duration-300">
              <span class="text-gym-red font-black text-2xl">{item.year}</span>
              <h3 class="text-xl font-bold mt-2 mb-1">{item.title}</h3>
              <p class="text-gray-400">{item.desc}</p>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Contact Info Section -->
<section class="py-20 px-4 bg-black/90">
  <div class="container mx-auto max-w-4xl">
    <div class="futuristic-card p-8 border-2 border-gray-800 text-center">
      <h3 class="text-2xl font-black mb-6 text-gym-red">FIND US</h3>
      <div class="grid md:grid-cols-3 gap-6">
        <div>
          <p class="text-3xl mb-2">📍</p>
          <p class="font-bold">Location</p>
          <p class="text-gray-400 text-sm">Purok Mulawin, Paltic, Dingalan, Aurora</p>
        </div>
        <div>
          <p class="text-3xl mb-2">📞</p>
          <p class="font-bold">Phone</p>
          <a href="tel:+639269228903" class="text-gray-400 hover:text-gym-red text-sm transition-colors">
            +63 926 922 8903
          </a>
        </div>
        <div>
          <p class="text-3xl mb-2">✉️</p>
          <p class="font-bold">Email</p>
          <a href="mailto:powerzone@gmail.com" class="text-gray-400 hover:text-gym-red text-sm transition-colors">
            powerzone@gmail.com
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- CTA Section -->
<section class="py-32 px-4 relative overflow-hidden bg-black/80">
  <div class="absolute inset-0 bg-gradient-to-r from-gym-red/20 via-black to-gym-red/20"></div>
  
  <div class="container mx-auto max-w-4xl text-center relative z-10">
    <h2 class="text-5xl md:text-6xl font-black mb-6">
      COME STEP INTO THE <span class="text-gym-red glitch">ZONE</span>
    </h2>
    <p class="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
      Where every rep counts and every effort matters.
    </p>
    <div class="flex flex-col sm:flex-row gap-6 justify-center">
      <a 
        href="/membership" 
        class="group relative px-10 py-4 bg-gym-red text-white font-black text-lg tracking-wider uppercase
               overflow-hidden transition-all duration-300 hover:shadow-[0_0_50px_rgba(220,38,38,0.7)]"
      >
        <span class="relative z-10">Join Now</span>
        <div class="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 translate-x-full 
                    group-hover:translate-x-0 transition-transform duration-300"></div>
      </a>
      <a 
        href="/contact" 
        class="px-10 py-4 border-2 border-gym-red text-white font-black text-lg tracking-wider uppercase
               hover:bg-gym-red/10 transition-all duration-300"
      >
        Contact Us
      </a>
    </div>
  </div>
</section>

<style>
  @keyframes scan {
    0% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(100%);
    }
  }
  
  .animate-scan {
    animation: scan 2s linear infinite;
  }
</style>