<script lang="ts">
  import { onMount } from 'svelte';
  
  let mounted = false;
  
  onMount(() => {
    mounted = true;
  });
</script>

<svelte:head>
  <title>About Power Zone - Our Story & Mission</title>
</svelte:head>

<!-- Hero Section -->
<section class="relative py-32 px-4 overflow-hidden">
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
      EST. 2010
    </div>
    <h1 class="text-6xl md:text-7xl font-black mb-6 animate-slide-up" style="animation-delay: 0.1s">
      OUR <span class="text-gym-red glow-text">STORY</span>
    </h1>
    <p class="text-xl text-gray-300 max-w-2xl mx-auto animate-slide-up" style="animation-delay: 0.2s">
      From military training grounds to the future of fitness
    </p>
  </div>
  
  <!-- Floating elements -->
  <div class="absolute top-20 left-10 w-20 h-20 border border-gym-red/20 rounded-full animate-pulse"></div>
  <div class="absolute bottom-20 right-10 w-32 h-32 border border-gym-red/10 rounded-full animate-pulse" style="animation-delay: 1s"></div>
</section>

<!-- Mission Section -->
<section class="py-32 px-4 relative bg-black/90 overflow-hidden">
  <div class="container mx-auto max-w-7xl">
    <div class="grid lg:grid-cols-2 gap-16 items-center">
      <div class="space-y-8 {mounted ? 'animate-slide-up' : ''}">
        <div class="inline-block">
          <span class="px-3 py-1 bg-gym-red/20 border border-gym-red/50 rounded text-gym-red text-sm font-bold tracking-wider uppercase">
            Our Mission
          </span>
        </div>
        
        <h2 class="text-5xl md:text-6xl font-black leading-tight">
          ENGINEERING <span class="text-gym-red glow-text">HUMAN</span>
          <br/>
          <span class="text-3xl md:text-4xl text-gray-400">POTENTIAL</span>
        </h2>
        
        <div class="space-y-4 text-gray-300 text-lg">
          <p>
            Power Zone was born from a simple observation: traditional gyms were failing to evolve. 
            While technology revolutionized every aspect of our lives, fitness remained stuck in the past.
          </p>
          <p>
            We created Power Zone to bridge that gap—combining cutting-edge technology with proven 
            training methodologies to create an environment where limits are meant to be broken.
          </p>
        </div>
        
        <div class="grid grid-cols-2 gap-4">
          {#each [
            { metric: '15+', label: 'Years of Innovation' },
            { metric: '10K+', label: 'Lives Transformed' },
            { metric: '98%', label: 'Success Rate' },
            { metric: '24/7', label: 'Always Evolving' }
          ] as stat, i}
            <div class="futuristic-card p-6 border border-gray-800 hover:border-gym-red/50 
                        transition-all duration-300 group {mounted ? 'animate-slide-up' : ''}"
                 style="animation-delay: {0.3 + i * 0.1}s">
              <div class="text-3xl font-black text-gym-red glow-text group-hover:scale-110 transition-transform">
                {stat.metric}
              </div>
              <div class="text-sm text-gray-400 uppercase tracking-wider mt-2">
                {stat.label}
              </div>
            </div>
          {/each}
        </div>
      </div>
      
      <div class="relative">
        <div class="relative group">
          <img 
            src="https://images.unsplash.com/photo-1558611848-73f7eb4001a1?q=80&w=2071" 
            alt="Gym Community" 
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

<!-- Values Section -->
<section class="py-32 px-4 bg-gradient-to-b from-transparent via-black/50 to-transparent relative overflow-hidden">
  <!-- Background pattern -->
  <div class="absolute inset-0 opacity-10">
    <svg width="100%" height="100%">
      <pattern id="hexagons-about" x="0" y="0" width="60" height="70" patternUnits="userSpaceOnUse">
        <polygon points="30,5 55,22 55,48 30,65 5,48 5,22" fill="none" stroke="#DC2626" stroke-width="0.5"/>
      </pattern>
      <rect width="100%" height="100%" fill="url(#hexagons-about)" />
    </svg>
  </div>
  
  <div class="container mx-auto max-w-7xl relative z-10">
    <div class="text-center mb-16">
      <span class="inline-block px-4 py-1 bg-gym-red/20 border border-gym-red/50 rounded-full 
                   text-gym-red text-sm font-bold tracking-wider uppercase mb-6">
        Core Values
      </span>
      <h2 class="text-5xl md:text-6xl font-black">
        THE <span class="text-gym-red glow-text">ZONE</span> PRINCIPLES
      </h2>
    </div>
    
    <div class="grid md:grid-cols-3 gap-8">
      {#each [
        { 
          icon: '⚡', 
          title: 'INTENSITY', 
          desc: 'Every workout is designed to push boundaries. We don\'t do comfortable.',
          gradient: 'from-red-600 to-orange-600'
        },
        { 
          icon: '🧬', 
          title: 'INNOVATION', 
          desc: 'Constantly evolving with the latest in sports science and technology.',
          gradient: 'from-red-600 to-pink-600'
        },
        { 
          icon: '🎯', 
          title: 'PRECISION', 
          desc: 'Data-driven approach to fitness. Every rep counts, every metric matters.',
          gradient: 'from-red-600 to-purple-600'
        }
      ] as value, i}
        <div class="group relative {mounted ? 'animate-slide-up' : ''}" style="animation-delay: {0.1 * i}s">
          <div class="futuristic-card p-8 border border-gray-800 hover:border-gym-red/50 
                      transition-all duration-500 h-full">
            <!-- Icon container -->
            <div class="relative mb-6">
              <div class="text-6xl group-hover:scale-125 transition-transform duration-300">
                {value.icon}
              </div>
              <div class="absolute inset-0 bg-gradient-to-r {value.gradient} opacity-20 blur-xl 
                          group-hover:opacity-40 transition-opacity"></div>
            </div>
            
            <h3 class="text-2xl font-black mb-4 text-gym-red tracking-wider">{value.title}</h3>
            <p class="text-gray-400 leading-relaxed">{value.desc}</p>
            
            <!-- Bottom accent -->
            <div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r {value.gradient} 
                        transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Team Section -->
<section class="py-32 px-4 relative bg-black/90 overflow-hidden">
  <div class="container mx-auto max-w-7xl">
    <div class="text-center mb-16">
      <span class="inline-block px-4 py-1 bg-gym-red/20 border border-gym-red/50 rounded-full 
                   text-gym-red text-sm font-bold tracking-wider uppercase mb-6">
        Elite Squad
      </span>
      <h2 class="text-5xl md:text-6xl font-black">
        THE <span class="text-gym-red glow-text">ARCHITECTS</span>
      </h2>
      <p class="text-gray-400 text-lg mt-4 max-w-2xl mx-auto">
        Hand-picked experts who live and breathe transformation
      </p>
    </div>
    
    <div class="grid md:grid-cols-3 gap-8">
      {#each [
        {
          name: 'Marcus Johnson',
          role: 'Founder & Head Architect',
          image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=1887',
          specialties: ['Biomechanics', 'Neural Training', 'Strategic Planning'],
          stats: { experience: '20+', clients: '1000+' }
        },
        {
          name: 'Sarah Chen',
          role: 'Performance Director',
          image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1887',
          specialties: ['HIIT Programming', 'Metabolic Conditioning', 'Recovery Tech'],
          stats: { experience: '10+', certifications: '15+' }
        },
        {
          name: 'Mike Torres',
          role: 'Strength Architect',
          image: 'https://images.unsplash.com/photo-1534367610401-9f5ed68180aa?q=80&w=2070',
          specialties: ['Powerlifting', 'Olympic Lifting', 'Strength Systems'],
          stats: { experience: '15+', records: '5' }
        }
      ] as member, i}
        <div class="group {mounted ? 'animate-slide-up' : ''}" style="animation-delay: {0.1 * i}s">
          <div class="futuristic-card overflow-hidden border border-gray-800 hover:border-gym-red/50 
                      transition-all duration-500">
            <!-- Image container -->
            <div class="relative h-80 overflow-hidden">
              <img 
                src={member.image} 
                alt={member.name} 
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
              
              <!-- Stats overlay -->
              <div class="absolute bottom-4 left-4 right-4 flex gap-4">
                {#each Object.entries(member.stats) as [key, value]}
                  <div class="bg-black/80 backdrop-blur border border-gym-red/50 px-3 py-2 rounded">
                    <p class="text-sm font-bold text-gym-red">{value}</p>
                    <p class="text-xs uppercase tracking-wider text-gray-400">{key}</p>
                  </div>
                {/each}
              </div>
            </div>
            
            <!-- Content -->
            <div class="p-6 space-y-4">
              <div>
                <h3 class="text-2xl font-black">{member.name}</h3>
                <p class="text-gym-red font-bold tracking-wider uppercase text-sm">{member.role}</p>
              </div>
              
              <!-- Specialties -->
              <div class="flex flex-wrap gap-2">
                {#each member.specialties as specialty}
                  <span class="px-3 py-1 bg-gym-red/10 border border-gym-red/30 rounded-full 
                               text-xs text-gray-300 uppercase tracking-wider">
                    {specialty}
                  </span>
                {/each}
              </div>
            </div>
          </div>
        </div>
      {/each}
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
        THE <span class="text-gym-red glow-text">JOURNEY</span>
      </h2>
    </div>
    
    <div class="relative">
      <!-- Timeline line -->
      <div class="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gym-red/30"></div>
      
      <!-- Timeline items -->
      {#each [
        { year: '2010', title: 'Genesis', desc: 'Power Zone opens with a vision to revolutionize fitness' },
        { year: '2015', title: 'Expansion', desc: 'Introduction of AI-powered training systems' },
        { year: '2020', title: 'Innovation', desc: 'Launch of biometric tracking and recovery tech' },
        { year: '2025', title: 'Evolution', desc: 'Leading the future of human performance optimization' }
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

<!-- CTA Section -->
<section class="py-32 px-4 relative overflow-hidden">
  <div class="absolute inset-0 bg-gradient-to-r from-gym-red/20 via-black to-gym-red/20"></div>
  
  <div class="container mx-auto max-w-4xl text-center relative z-10">
    <h2 class="text-5xl md:text-6xl font-black mb-6">
      READY TO JOIN THE <span class="text-gym-red glitch">REVOLUTION?</span>
    </h2>
    <p class="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
      Step into the future of fitness. Your transformation starts now.
    </p>
    <div class="flex flex-col sm:flex-row gap-6 justify-center">
      <a 
        href="/membership" 
        class="group relative px-10 py-4 bg-gym-red text-white font-black text-lg tracking-wider uppercase
               overflow-hidden transition-all duration-300 hover:shadow-[0_0_50px_rgba(220,38,38,0.7)]"
      >
        <span class="relative z-10">View Memberships</span>
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