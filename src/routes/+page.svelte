<script lang="ts">
  import { onMount } from 'svelte';
  import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
  import { db } from '$lib/firebase';
  import PostCard from '$lib/components/PostCard.svelte';
  import type { Post } from '$lib/types';
  
  let recentPosts: Post[] = [];
  let loading = false;
  let heroRef: HTMLElement;
  
  // Mouse parallax effect
  onMount(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 20;
      const y = (clientY / innerHeight - 0.5) * 20;
      
      heroRef.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg)`;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  });
  
  // Dummy data for now
  recentPosts = [
    {
      id: '1',
      title: 'HIIT Revolution Begins',
      content: 'Experience the future of high-intensity training with our new tech-enhanced sessions.',
      date: new Date('2025-01-15'),
      imageURL: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2070'
    },
    {
      id: '2',
      title: 'Biohacking Workshop',
      content: 'Optimize your performance with cutting-edge nutrition and recovery techniques.',
      date: new Date('2025-01-10'),
    },
    {
      id: '3',
      title: 'Neural Training Program',
      content: 'Mind-muscle connection redefined. Join our revolutionary training methodology.',
      date: new Date('2025-01-05'),
      imageURL: 'https://images.unsplash.com/photo-1550345332-09e3ac987658?q=80&w=1887'
    }
  ];
</script>

<svelte:head>
  <title>Power Zone - Enter The Digital Fitness Revolution</title>
</svelte:head>

<!-- Hero Section -->
<section class="relative min-h-screen flex items-center justify-center overflow-hidden">
  <!-- Animated Background -->
  <div class="absolute inset-0">
    <div class="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
    <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070')] 
                bg-cover bg-center opacity-10"></div>
    
    <!-- Animated grid -->
    <div class="absolute inset-0" style="
      background-image: 
        linear-gradient(rgba(220, 38, 38, 0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(220, 38, 38, 0.1) 1px, transparent 1px);
      background-size: 50px 50px;
      animation: grid-move 10s linear infinite;
    "></div>
  </div>
  
  <!-- Floating particles -->
  <div class="absolute inset-0">
    {#each Array(20) as _, i}
      <div 
        class="absolute w-1 h-1 bg-gym-red rounded-full animate-pulse"
        style="
          left: {Math.random() * 100}%;
          top: {Math.random() * 100}%;
          animation-delay: {Math.random() * 5}s;
          animation-duration: {3 + Math.random() * 4}s;
        "
      ></div>
    {/each}
  </div>
  
  <!-- Content -->
  <div bind:this={heroRef} class="relative z-10 text-center px-4 max-w-5xl mx-auto transform-gpu transition-transform duration-100">
    <div class="mb-8 animate-slide-up">
      <span class="inline-block px-4 py-1 bg-gym-red/20 border border-gym-red/50 rounded-full 
                   text-gym-red text-sm font-bold tracking-wider uppercase">
        Welcome to the future
      </span>
    </div>
    
    <h1 class="text-6xl md:text-8xl font-black mb-6 leading-none animate-slide-up" style="animation-delay: 0.1s">
      <span class="block text-white glitch">ENTER THE</span>
      <span class="block text-gym-red glow-text text-7xl md:text-9xl">ZONE</span>
    </h1>
    
    <p class="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto animate-slide-up" style="animation-delay: 0.2s">
      Where human potential meets cutting-edge technology. 
      Transform your body. Upgrade your mind. Become limitless.
    </p>
    
    <div class="flex flex-col sm:flex-row gap-6 justify-center animate-slide-up" style="animation-delay: 0.3s">
      <a 
        href="/membership" 
        class="group relative px-10 py-4 bg-gym-red font-black text-lg tracking-wider uppercase
               overflow-hidden transition-all duration-300 hover:shadow-[0_0_50px_rgba(220,38,38,0.7)]"
      >
        <span class="relative z-10">Initialize Training</span>
        <div class="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 translate-x-full 
                    group-hover:translate-x-0 transition-transform duration-300"></div>
      </a>
      
      <a 
        href="/about" 
        class="px-10 py-4 border-2 border-gym-red/50 font-black text-lg tracking-wider uppercase
               hover:bg-gym-red/10 hover:border-gym-red transition-all duration-300
               hover:shadow-[0_0_30px_rgba(220,38,38,0.3)]"
      >
        System Specs
      </a>
    </div>
  </div>
  
  <!-- Scroll Indicator -->
  <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2">
    <div class="flex flex-col items-center gap-2 text-gym-red">
      <span class="text-xs font-bold tracking-wider uppercase">Dive Deeper</span>
      <svg class="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </div>
  </div>
</section>

<!-- About Section -->
<section class="py-32 px-4 relative overflow-hidden bg-black/90">
  <!-- Background effects -->
  <div class="absolute inset-0">
    <div class="absolute top-0 left-0 w-96 h-96 bg-gym-red/10 rounded-full blur-3xl"></div>
    <div class="absolute bottom-0 right-0 w-96 h-96 bg-gym-red/5 rounded-full blur-3xl"></div>
  </div>
  
  <div class="container mx-auto max-w-7xl relative z-10">
    <div class="grid lg:grid-cols-2 gap-16 items-center">
      <div class="space-y-8 animate-slide-up">
        <div class="inline-block">
          <span class="px-3 py-1 bg-gym-red/20 border border-gym-red/50 rounded text-gym-red text-sm font-bold tracking-wider uppercase">
            Beyond Fitness
          </span>
        </div>
        
        <h2 class="text-5xl md:text-6xl font-black leading-tight">
          MORE THAN A <span class="text-gym-red glow-text">GYM</span>
          <br/>
          <span class="text-3xl md:text-4xl text-gray-400">IT'S A TRANSFORMATION LAB</span>
        </h2>
        
        <p class="text-gray-300 text-lg leading-relaxed">
          Power Zone isn't just a place to work out—it's where human evolution accelerates. 
          Our state-of-the-art facility combines cutting-edge technology with proven training 
          methodologies to unlock your maximum potential.
        </p>
        
        <div class="grid grid-cols-2 gap-6">
          {#each [
            { number: '10K+', label: 'Warriors Trained' },
            { number: '500+', label: 'Classes Monthly' },
            { number: '98%', label: 'Success Rate' },
            { number: '24/7', label: 'Access Available' }
          ] as stat}
            <div class="group">
              <div class="futuristic-card p-6 border border-gray-800 hover:border-gym-red/50 transition-all duration-300">
                <div class="text-3xl font-black text-gym-red glow-text group-hover:scale-110 transition-transform">
                  {stat.number}
                </div>
                <div class="text-sm text-gray-400 uppercase tracking-wider mt-2">
                  {stat.label}
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
      
      <div class="relative group">
        <!-- Main image container -->
        <div class="relative overflow-hidden rounded-lg">
          <img 
            src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070" 
            alt="Gym Interior" 
            class="w-full rounded-lg group-hover:scale-105 transition-transform duration-700"
          />
          
          <!-- Overlay effects -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          
          <!-- Scanning effect -->
          <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div class="absolute inset-0 bg-gradient-to-b from-gym-red/20 to-transparent 
                        animate-scan"></div>
          </div>
        </div>
        
        <!-- Floating badge -->
        <div class="absolute -bottom-8 -left-8 bg-black border-2 border-gym-red p-6 
                    hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] transition-all duration-300">
          <p class="text-5xl font-black text-gym-red glow-text">15+</p>
          <p class="text-sm uppercase tracking-wider">Years of Excellence</p>
        </div>
        
        <!-- Corner accents -->
        <div class="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-gym-red/50"></div>
        <div class="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-gym-red/50"></div>
      </div>
    </div>
  </div>
</section>

<!-- Features Grid -->
<section class="py-20 px-4 bg-black/50">
  <div class="container mx-auto max-w-7xl">
    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {#each [
        { icon: '⚡', title: 'High-Tech Equipment', desc: 'AI-powered machines that adapt to your strength' },
        { icon: '🧬', title: 'Biometric Tracking', desc: 'Real-time performance analytics and optimization' },
        { icon: '🎯', title: 'Precision Training', desc: 'Targeted programs based on your DNA profile' },
        { icon: '🚀', title: 'Recovery Tech', desc: 'Cryotherapy, infrared sauna, and more' }
      ] as feature, i}
        <div 
          class="futuristic-card p-6 border border-gray-800 hover:border-gym-red/50 
                 transition-all duration-300 animate-slide-up group"
          style="animation-delay: {i * 0.1}s"
        >
          <div class="text-4xl mb-4 group-hover:scale-125 transition-transform duration-300">
            {feature.icon}
          </div>
          <h3 class="text-lg font-bold mb-2 text-gym-red">{feature.title}</h3>
          <p class="text-sm text-gray-400">{feature.desc}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Featured Instructor -->
<section class="py-32 px-4 bg-black/90 relative overflow-hidden">
  <!-- Hexagon pattern background -->
  <div class="absolute inset-0 opacity-5">
    <svg width="100%" height="100%">
      <pattern id="hexagons" x="0" y="0" width="50" height="60" patternUnits="userSpaceOnUse">
        <polygon points="25,5 45,20 45,40 25,55 5,40 5,20" fill="none" stroke="#DC2626" stroke-width="0.5"/>
      </pattern>
      <rect width="100%" height="100%" fill="url(#hexagons)" />
    </svg>
  </div>
  
  <div class="container mx-auto max-w-6xl relative z-10">
    <div class="text-center mb-16">
      <span class="inline-block px-4 py-1 bg-gym-red/20 border border-gym-red/50 rounded-full 
                   text-gym-red text-sm font-bold tracking-wider uppercase mb-4">
        Master Trainer
      </span>
      <h2 class="text-5xl md:text-6xl font-black">
        MEET YOUR <span class="text-gym-red glow-text">ARCHITECT</span>
      </h2>
    </div>
    
    <div class="futuristic-card max-w-4xl mx-auto p-8 md:p-12 border-2 border-gray-800 
                hover:border-gym-red/50 transition-all duration-500">
      <div class="grid md:grid-cols-2 gap-12 items-center">
        <div class="relative group">
          <!-- Profile image with effects -->
          <div class="relative overflow-hidden rounded-lg">
            <img 
              src="https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=1887" 
              alt="Marcus Johnson" 
              class="w-full rounded-lg group-hover:scale-105 transition-transform duration-700"
            />
            
            <!-- Cyber overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            
            <!-- Stats overlay -->
            <div class="absolute bottom-4 left-4 right-4 grid grid-cols-2 gap-2">
              <div class="bg-black/80 backdrop-blur border border-gym-red/50 p-3 text-center">
                <p class="text-2xl font-black text-gym-red">20+</p>
                <p class="text-xs uppercase tracking-wider">Years XP</p>
              </div>
              <div class="bg-black/80 backdrop-blur border border-gym-red/50 p-3 text-center">
                <p class="text-2xl font-black text-gym-red">1K+</p>
                <p class="text-xs uppercase tracking-wider">Transformed</p>
              </div>
            </div>
          </div>
          
          <!-- Decorative elements -->
          <div class="absolute -top-4 -right-4 w-24 h-24 border-2 border-gym-red/30 rounded-full"></div>
          <div class="absolute -bottom-4 -left-4 w-32 h-32 border-2 border-gym-red/20 rounded-full"></div>
        </div>
        
        <div class="space-y-6">
          <div>
            <h3 class="text-3xl font-black mb-2">MARCUS JOHNSON</h3>
            <p class="text-gym-red font-bold tracking-wider uppercase">Founder & Lead Architect</p>
          </div>
          
          <p class="text-gray-300 leading-relaxed">
            Former special ops turned fitness revolutionary. Marcus doesn't just train bodies—he 
            engineers human machines. His proprietary ZONE methodology combines military precision 
            with cutting-edge sports science to deliver unprecedented results.
          </p>
          
          <div class="space-y-3">
            <div class="flex items-center gap-3">
              <div class="w-2 h-2 bg-gym-red rounded-full"></div>
              <span class="text-sm text-gray-400">Certified Biomechanics Specialist</span>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-2 h-2 bg-gym-red rounded-full"></div>
              <span class="text-sm text-gray-400">Neural Performance Optimization</span>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-2 h-2 bg-gym-red rounded-full"></div>
              <span class="text-sm text-gray-400">Advanced Nutrition Programming</span>
            </div>
          </div>
          
          <a href="/about" class="inline-flex items-center gap-2 text-gym-red font-bold 
                                  hover:gap-4 transition-all duration-300 group">
            <span>Access Full Profile</span>
            <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Recent Posts -->
<section class="py-32 px-4 bg-gradient-to-b from-transparent via-black/50 to-transparent">
  <div class="container mx-auto max-w-7xl">
    <div class="text-center mb-16">
      <span class="inline-block px-4 py-1 bg-gym-red/20 border border-gym-red/50 rounded-full 
                   text-gym-red text-sm font-bold tracking-wider uppercase mb-4">
        Intel Feed
      </span>
      <h2 class="text-5xl md:text-6xl font-black">
        LATEST <span class="text-gym-red glow-text">TRANSMISSIONS</span>
      </h2>
    </div>
    
    {#if loading}
      <div class="flex justify-center">
        <div class="cyber-loader"></div>
      </div>
    {:else if recentPosts.length > 0}
      <div class="grid md:grid-cols-3 gap-8">
        {#each recentPosts as post, i}
          <div class="animate-slide-up" style="animation-delay: {i * 0.1}s">
            <PostCard {post} />
          </div>
        {/each}
      </div>
      
      <div class="text-center mt-12">
        <a href="/blog" class="inline-flex items-center gap-3 px-8 py-3 
                               bg-gym-red/10 border border-gym-red/50 
                               hover:bg-gym-red hover:border-gym-red
                               font-bold uppercase tracking-wider transition-all duration-300
                               hover:shadow-[0_0_30px_rgba(220,38,38,0.5)]">
          <span>Access Full Database</span>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    {:else}
      <div class="text-center py-20">
        <div class="inline-block p-8 border border-gray-800 rounded-lg">
          <p class="text-gray-400 mb-4">No transmissions detected</p>
          <div class="flex justify-center gap-1">
            <div class="w-2 h-2 bg-gray-600 rounded-full animate-pulse"></div>
            <div class="w-2 h-2 bg-gray-600 rounded-full animate-pulse" style="animation-delay: 0.2s"></div>
            <div class="w-2 h-2 bg-gray-600 rounded-full animate-pulse" style="animation-delay: 0.4s"></div>
          </div>
        </div>
      </div>
    {/if}
  </div>
</section>

<!-- CTA Section -->
<section class="relative py-32 px-4 overflow-hidden">
  <!-- Animated background -->
  <div class="absolute inset-0 bg-gym-red">
    <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070')] 
                bg-cover bg-center opacity-20"></div>
    <div class="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80"></div>
  </div>
  
  <!-- Animated lines -->
  <div class="absolute inset-0">
    {#each Array(5) as _, i}
      <div 
        class="absolute h-px bg-white/20 w-full"
        style="
          top: {20 + i * 20}%;
          animation: slide-line 10s linear infinite;
          animation-delay: {i * 2}s;
        "
      ></div>
    {/each}
  </div>
  
  <div class="container mx-auto max-w-4xl text-center relative z-10">
    <div class="space-y-8">
      <h2 class="text-5xl md:text-7xl font-black leading-tight">
        READY TO
        <span class="block text-6xl md:text-8xl glitch">EVOLVE?</span>
      </h2>
      
      <p class="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto text-black/80">
        The future of fitness is here. Join the elite few who refuse to accept limitations.
      </p>
      
      <div class="flex flex-col sm:flex-row gap-6 justify-center pt-8">
        <a 
          href="/membership" 
          class="group relative px-12 py-5 bg-black font-black text-lg tracking-wider uppercase
                 overflow-hidden transition-all duration-300 hover:shadow-[0_0_50px_rgba(0,0,0,0.5)]"
        >
          <span class="relative z-10">INITIATE PROTOCOL</span>
          <div class="absolute inset-0 bg-gradient-to-r from-gray-900 to-black 
                      translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
        </a>
        
        <a 
          href="/contact" 
          class="px-12 py-5 border-2 border-black bg-black/20 backdrop-blur
                 font-black text-lg tracking-wider uppercase
                 hover:bg-black/40 transition-all duration-300"
        >
          REQUEST ACCESS
        </a>
      </div>
    </div>
  </div>
</section>

<style>
  @keyframes grid-move {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(50px, 50px);
    }
  }
  
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
  
  @keyframes slide-line {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
</style>