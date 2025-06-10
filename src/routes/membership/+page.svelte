<script lang="ts">
  import { onMount } from 'svelte';
  
  let mounted = false;
  let selectedPlan = 'Pro';
  
  onMount(() => {
    mounted = true;
  });
  
  const membershipPlans = [
    {
      name: 'Basic',
      tagline: 'ENTRY LEVEL',
      price: '$29',
      period: 'per month',
      features: [
        'Access to gym equipment',
        'Digital workout tracking',
        'Locker room access',
        'Mobile app access',
        'Basic progress analytics'
      ],
      notIncluded: [
        'Personal training',
        'Group classes',
        'Recovery tech',
        'Nutrition planning'
      ],
      gradient: 'from-gray-600 to-gray-800',
      highlighted: false
    },
    {
      name: 'Pro',
      tagline: 'MOST POPULAR',
      price: '$59',
      period: 'per month',
      features: [
        'Everything in Basic',
        'Unlimited group classes',
        '2 personal training sessions/month',
        'AI-powered workout plans',
        'Nutrition consultation',
        'Priority equipment booking',
        'Body composition analysis',
        'Recovery zone access'
      ],
      notIncluded: [
        'Unlimited PT sessions',
        'Custom meal plans'
      ],
      gradient: 'from-red-600 to-red-800',
      highlighted: true
    },
    {
      name: 'Elite',
      tagline: 'ULTIMATE TRANSFORMATION',
      price: '$99',
      period: 'per month',
      features: [
        'Everything in Pro',
        'Unlimited personal training',
        'Custom meal plans & tracking',
        'Weekly body composition scans',
        'Priority 24/7 gym access',
        'Guest passes (2/month)',
        'Exclusive masterclasses',
        'Dedicated performance coach',
        'VIP locker & amenities'
      ],
      notIncluded: [],
      gradient: 'from-purple-600 to-pink-600',
      highlighted: false
    }
  ];
</script>

<svelte:head>
  <title>Membership Plans - Power Zone Gym</title>
</svelte:head>

<!-- Hero Section -->
<section class="relative py-32 px-4 overflow-hidden">
  <!-- Animated background -->
  <div class="absolute inset-0">
    <div class="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
    <!-- Animated grid lines -->
    <div class="absolute inset-0 opacity-20">
      <div class="absolute inset-0" style="
        background-image: 
          linear-gradient(to right, transparent 0%, rgba(220, 38, 38, 0.3) 50%, transparent 100%),
          linear-gradient(to bottom, transparent 0%, rgba(220, 38, 38, 0.3) 50%, transparent 100%);
        background-size: 60px 60px;
        animation: grid-shift 20s linear infinite;
      "></div>
    </div>
  </div>
  
  <!-- Floating particles -->
  <div class="absolute inset-0">
    {#each Array(15) as _, i}
      <div 
        class="absolute w-2 h-2 bg-gym-red/30 rounded-full blur-sm animate-float"
        style="
          left: {Math.random() * 100}%;
          top: {Math.random() * 100}%;
          animation-delay: {Math.random() * 10}s;
          animation-duration: {10 + Math.random() * 20}s;
        "
      ></div>
    {/each}
  </div>
  
  <div class="container mx-auto max-w-6xl text-center relative z-10">
    <div class="inline-block px-4 py-1 bg-gym-red/20 border border-gym-red/50 rounded-full 
                text-gym-red text-sm font-bold tracking-wider uppercase mb-6 animate-slide-up">
      Level Up
    </div>
    <h1 class="text-6xl md:text-7xl font-black mb-6 animate-slide-up" style="animation-delay: 0.1s">
      CHOOSE YOUR <span class="text-gym-red glow-text glitch">POWER</span>
    </h1>
    <p class="text-xl text-gray-300 max-w-3xl mx-auto animate-slide-up" style="animation-delay: 0.2s">
      Select your transformation tier. Each level unlocks new possibilities for your evolution.
    </p>
  </div>
</section>

<!-- Pricing Cards -->
<section class="py-20 px-4 relative">
  <div class="container mx-auto max-w-7xl">
    <!-- Plan selector (mobile) -->
    <div class="md:hidden mb-8">
      <div class="flex gap-2 p-1 bg-gray-900 rounded-lg border border-gray-800">
        {#each membershipPlans as plan}
          <button
            on:click={() => selectedPlan = plan.name}
            class="flex-1 py-2 px-4 rounded-md font-bold text-sm uppercase tracking-wider transition-all
                   {selectedPlan === plan.name 
                     ? 'bg-gym-red text-white' 
                     : 'text-gray-400 hover:text-white'}"
          >
            {plan.name}
          </button>
        {/each}
      </div>
    </div>
    
    <!-- Desktop: All plans -->
    <div class="hidden md:grid md:grid-cols-3 gap-8">
      {#each membershipPlans as plan, i}
        <div class="relative group {mounted ? 'animate-slide-up' : ''}" 
             style="animation-delay: {0.1 * i}s">
          <!-- Glow effect for highlighted plan -->
          {#if plan.highlighted}
            <div class="absolute -inset-1 bg-gradient-to-r {plan.gradient} rounded-lg blur-lg 
                        opacity-50 group-hover:opacity-75 transition-opacity"></div>
          {/if}
          
          <div class="relative futuristic-card h-full border-2 
                      {plan.highlighted ? 'border-gym-red' : 'border-gray-800'}
                      hover:border-gym-red/50 transition-all duration-500 overflow-hidden">
            <!-- Plan header -->
            <div class="p-8 text-center border-b border-gray-800 relative">
              <!-- Background gradient -->
              <div class="absolute inset-0 bg-gradient-to-br {plan.gradient} opacity-10"></div>
              
              <div class="relative">
                <span class="text-xs font-bold tracking-wider text-gray-400 uppercase">
                  {plan.tagline}
                </span>
                <h3 class="text-3xl font-black mt-2 mb-6 uppercase tracking-wider">{plan.name}</h3>
                
                <div class="flex items-baseline justify-center gap-1">
                  <span class="text-5xl font-black text-gym-red">{plan.price}</span>
                  <span class="text-gray-400">/{plan.period}</span>
                </div>
              </div>
            </div>
            
            <!-- Features -->
            <div class="p-8 space-y-6">
              <div class="space-y-3">
                {#each plan.features as feature}
                  <div class="flex items-start gap-3">
                    <div class="w-5 h-5 rounded-full bg-gym-red/20 flex items-center justify-center 
                                flex-shrink-0 mt-0.5">
                      <div class="w-2 h-2 bg-gym-red rounded-full"></div>
                    </div>
                    <span class="text-gray-300 text-sm">{feature}</span>
                  </div>
                {/each}
              </div>
              
              {#if plan.notIncluded.length > 0}
                <div class="pt-4 border-t border-gray-800 space-y-3">
                  {#each plan.notIncluded as feature}
                    <div class="flex items-start gap-3 opacity-50">
                      <div class="w-5 h-5 rounded-full bg-gray-800 flex items-center justify-center 
                                  flex-shrink-0 mt-0.5">
                        <span class="text-xs">×</span>
                      </div>
                      <span class="text-gray-500 text-sm line-through">{feature}</span>
                    </div>
                  {/each}
                </div>
              {/if}
            </div>
            
            <!-- CTA -->
            <div class="p-8 pt-0 mt-auto">
              <a 
                href="/contact" 
                class="block text-center py-4 rounded-lg font-black uppercase tracking-wider
                       transition-all duration-300 relative overflow-hidden group/btn
                       {plan.highlighted 
                         ? 'bg-gym-red hover:shadow-[0_0_30px_rgba(220,38,38,0.5)]' 
                         : 'bg-gray-800 hover:bg-gym-red'}"
              >
                <span class="relative z-10">
                  {plan.highlighted ? 'Start Now' : 'Select Plan'}
                </span>
                <div class="absolute inset-0 bg-gradient-to-r {plan.gradient} 
                            translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
              </a>
            </div>
            
            <!-- Corner accent -->
            {#if plan.highlighted}
              <div class="absolute top-0 right-0 bg-gym-red text-black px-4 py-1 text-xs font-black 
                          uppercase tracking-wider transform rotate-12 translate-x-6 translate-y-3">
                Popular
              </div>
            {/if}
          </div>
        </div>
      {/each}
    </div>
    
    <!-- Mobile: Selected plan -->
    <div class="md:hidden">
      {#each membershipPlans as plan}
        {#if selectedPlan === plan.name}
          <div class="futuristic-card border-2 border-gym-red">
            <!-- Same content as desktop but single card -->
            <div class="p-8 text-center border-b border-gray-800 relative">
              <div class="absolute inset-0 bg-gradient-to-br {plan.gradient} opacity-10"></div>
              <div class="relative">
                <span class="text-xs font-bold tracking-wider text-gray-400 uppercase">
                  {plan.tagline}
                </span>
                <h3 class="text-3xl font-black mt-2 mb-6 uppercase tracking-wider">{plan.name}</h3>
                <div class="flex items-baseline justify-center gap-1">
                  <span class="text-5xl font-black text-gym-red">{plan.price}</span>
                  <span class="text-gray-400">/{plan.period}</span>
                </div>
              </div>
            </div>
            
            <div class="p-8 space-y-6">
              <div class="space-y-3">
                {#each plan.features as feature}
                  <div class="flex items-start gap-3">
                    <div class="w-5 h-5 rounded-full bg-gym-red/20 flex items-center justify-center 
                                flex-shrink-0 mt-0.5">
                      <div class="w-2 h-2 bg-gym-red rounded-full"></div>
                    </div>
                    <span class="text-gray-300 text-sm">{feature}</span>
                  </div>
                {/each}
              </div>
            </div>
            
            <div class="p-8 pt-0">
              <a 
                href="/contact" 
                class="block text-center py-4 bg-gym-red rounded-lg font-black uppercase tracking-wider
                       hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] transition-all duration-300"
              >
                Start Now
              </a>
            </div>
          </div>
        {/if}
      {/each}
    </div>
  </div>
</section>

<!-- Features Grid -->
<section class="py-32 px-4 bg-gradient-to-b from-transparent via-black/50 to-transparent">
  <div class="container mx-auto max-w-7xl">
    <div class="text-center mb-16">
      <span class="inline-block px-4 py-1 bg-gym-red/20 border border-gym-red/50 rounded-full 
                   text-gym-red text-sm font-bold tracking-wider uppercase mb-6">
        All Access
      </span>
      <h2 class="text-5xl md:text-6xl font-black">
        EVERY MEMBERSHIP <span class="text-gym-red glow-text">INCLUDES</span>
      </h2>
    </div>
    
    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {#each [
        { 
          icon: '🏋️', 
          title: 'QUANTUM EQUIPMENT', 
          desc: 'Next-gen machines that adapt to your strength curve in real-time',
          delay: '0s'
        },
        { 
          icon: '📊', 
          title: 'BIOMETRIC TRACKING', 
          desc: 'Monitor heart rate, calories, and performance metrics live',
          delay: '0.1s'
        },
        { 
          icon: '🚿', 
          title: 'LUXURY FACILITIES', 
          desc: 'Premium locker rooms with aromatherapy and rain showers',
          delay: '0.2s'
        },
        { 
          icon: '📱', 
          title: 'ZONE APP', 
          desc: 'Track workouts, book sessions, and connect with the community',
          delay: '0.3s'
        },
        { 
          icon: '🧘', 
          title: 'RECOVERY LOUNGE', 
          desc: 'Meditation pods and stretching zones for optimal recovery',
          delay: '0.4s'
        },
        { 
          icon: '🎯', 
          title: 'GOAL TRACKING', 
          desc: 'AI-powered progress monitoring and milestone celebrations',
          delay: '0.5s'
        },
        { 
          icon: '👥', 
          title: 'COMMUNITY EVENTS', 
          desc: 'Monthly challenges, workshops, and member socials',
          delay: '0.6s'
        },
        { 
          icon: '🏆', 
          title: 'REWARDS PROGRAM', 
          desc: 'Earn points for consistency and unlock exclusive perks',
          delay: '0.7s'
        }
      ] as feature}
        <div class="group {mounted ? 'animate-slide-up' : ''}" style="animation-delay: {feature.delay}">
          <div class="futuristic-card h-full p-6 border border-gray-800 hover:border-gym-red/50 
                      transition-all duration-500 text-center">
            <div class="text-5xl mb-4 group-hover:scale-125 transition-transform duration-300">
              {feature.icon}
            </div>
            <h3 class="text-lg font-black text-gym-red mb-2 tracking-wider">{feature.title}</h3>
            <p class="text-sm text-gray-400 leading-relaxed">{feature.desc}</p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Comparison Table -->
<section class="py-32 px-4 relative overflow-hidden">
  <div class="container mx-auto max-w-6xl">
    <div class="text-center mb-16">
      <span class="inline-block px-4 py-1 bg-gym-red/20 border border-gym-red/50 rounded-full 
                   text-gym-red text-sm font-bold tracking-wider uppercase mb-6">
        Compare
      </span>
      <h2 class="text-5xl md:text-6xl font-black">
        FEATURE <span class="text-gym-red glow-text">MATRIX</span>
      </h2>
    </div>
    
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="border-b border-gray-800">
            <th class="text-left py-4 px-6 font-black uppercase tracking-wider">Features</th>
            <th class="text-center py-4 px-6 font-black uppercase tracking-wider text-gray-400">Basic</th>
            <th class="text-center py-4 px-6 font-black uppercase tracking-wider text-gym-red">Pro</th>
            <th class="text-center py-4 px-6 font-black uppercase tracking-wider text-purple-500">Elite</th>
          </tr>
        </thead>
        <tbody>
          {#each [
            { feature: 'Equipment Access', basic: true, pro: true, elite: true },
            { feature: 'Mobile App', basic: true, pro: true, elite: true },
            { feature: 'Progress Tracking', basic: true, pro: true, elite: true },
            { feature: 'Group Classes', basic: false, pro: true, elite: true },
            { feature: 'Personal Training', basic: false, pro: '2/month', elite: 'Unlimited' },
            { feature: 'Nutrition Plans', basic: false, pro: 'Basic', elite: 'Custom' },
            { feature: 'Recovery Tech', basic: false, pro: true, elite: true },
            { feature: '24/7 Access', basic: false, pro: false, elite: true },
            { feature: 'Guest Passes', basic: false, pro: false, elite: '2/month' },
            { feature: 'VIP Amenities', basic: false, pro: false, elite: true }
          ] as row}
            <tr class="border-b border-gray-800/50 hover:bg-gray-900/50 transition-colors">
              <td class="py-4 px-6 font-medium">{row.feature}</td>
              <td class="py-4 px-6 text-center">
                {#if typeof row.basic === 'boolean'}
                  {#if row.basic}
                    <div class="w-6 h-6 rounded-full bg-green-500/20 border border-green-500/50 
                                flex items-center justify-center mx-auto">
                      <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                  {:else}
                    <span class="text-gray-600">—</span>
                  {/if}
                {:else}
                  <span class="text-gray-400">{row.basic}</span>
                {/if}
              </td>
              <td class="py-4 px-6 text-center">
                {#if typeof row.pro === 'boolean'}
                  {#if row.pro}
                    <div class="w-6 h-6 rounded-full bg-gym-red/20 border border-gym-red/50 
                                flex items-center justify-center mx-auto">
                      <div class="w-2 h-2 bg-gym-red rounded-full"></div>
                    </div>
                  {:else}
                    <span class="text-gray-600">—</span>
                  {/if}
                {:else}
                  <span class="text-gym-red font-bold">{row.pro}</span>
                {/if}
              </td>
              <td class="py-4 px-6 text-center">
                {#if typeof row.elite === 'boolean'}
                  {#if row.elite}
                    <div class="w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/50 
                                flex items-center justify-center mx-auto">
                      <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
                    </div>
                  {:else}
                    <span class="text-gray-600">—</span>
                  {/if}
                {:else}
                  <span class="text-purple-500 font-bold">{row.elite}</span>
                {/if}
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</section>

<!-- FAQ Section -->
<section class="py-32 px-4 bg-black/50">
  <div class="container mx-auto max-w-4xl">
    <div class="text-center mb-16">
      <span class="inline-block px-4 py-1 bg-gym-red/20 border border-gym-red/50 rounded-full 
                   text-gym-red text-sm font-bold tracking-wider uppercase mb-6">
        Intel
      </span>
      <h2 class="text-5xl md:text-6xl font-black">
        FREQUENTLY ASKED <span class="text-gym-red glow-text">QUESTIONS</span>
      </h2>
    </div>
    
    <div class="space-y-4">
      {#each [
        { 
          q: 'Can I switch between membership tiers?', 
          a: 'Absolutely. Upgrade anytime and get instant access to new features. Downgrades take effect at the next billing cycle.' 
        },
        { 
          q: 'Is there a contract or commitment?', 
          a: 'No contracts. All memberships are month-to-month. Cancel anytime with no penalties.' 
        },
        { 
          q: 'Do you offer student or corporate discounts?', 
          a: 'Yes! Students get 20% off with valid ID. Corporate packages available for teams of 5+.' 
        },
        { 
          q: 'What are your operating hours?', 
          a: 'Basic and Pro members: 5 AM - 11 PM daily. Elite members get 24/7 access with biometric entry.' 
        }
      ] as faq, i}
        <div class="futuristic-card p-6 border border-gray-800 hover:border-gym-red/50 
                    transition-all duration-300 {mounted ? 'animate-slide-up' : ''}"
             style="animation-delay: {0.1 * i}s">
          <h3 class="text-lg font-bold mb-2 text-gym-red">{faq.q}</h3>
          <p class="text-gray-400">{faq.a}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- CTA Section -->
<section class="py-32 px-4 relative overflow-hidden">
  <div class="absolute inset-0">
    <div class="absolute inset-0 bg-gradient-to-r from-gym-red/20 via-transparent to-gym-red/20"></div>
  </div>
  
  <div class="container mx-auto max-w-4xl text-center relative z-10">
    <h2 class="text-5xl md:text-6xl font-black mb-6">
      READY TO <span class="text-gym-red glitch">POWER UP?</span>
    </h2>
    <p class="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
      Join thousands who've already transformed their lives. Your journey to peak performance starts here.
    </p>
    <div class="flex flex-col sm:flex-row gap-6 justify-center">
      <a 
        href="/contact" 
        class="group relative px-10 py-4 bg-gym-red text-white font-black text-lg tracking-wider uppercase
               overflow-hidden transition-all duration-300 hover:shadow-[0_0_50px_rgba(220,38,38,0.7)]"
      >
        <span class="relative z-10">Start Free Trial</span>
        <div class="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 translate-x-full 
                    group-hover:translate-x-0 transition-transform duration-300"></div>
      </a>
      <a 
        href="/contact" 
        class="px-10 py-4 border-2 border-gym-red text-white font-black text-lg tracking-wider uppercase
               hover:bg-gym-red/10 transition-all duration-300"
      >
        Schedule Tour
      </a>
    </div>
  </div>
</section>

<style>
  @keyframes grid-shift {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(60px, 60px);
    }
  }
  
  @keyframes float {
    0%, 100% {
      transform: translate(0, 0) scale(1);
    }
    33% {
      transform: translate(30px, -30px) scale(1.1);
    }
    66% {
      transform: translate(-20px, 20px) scale(0.9);
    }
  }
</style>