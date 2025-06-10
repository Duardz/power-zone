<script lang="ts">
  import { onMount } from 'svelte';
  
  let mounted = false;
  let selectedPlan = 'Regular';
  
  onMount(() => {
    mounted = true;
  });
  
  const membershipPlans = [
    {
      name: 'Basic',
      tagline: 'GET STARTED',
      price: '₱399',
      period: 'per month',
      icon: '🔓',
      features: [
        'Unlimited gym access',
        'Use of all equipment',
        'Orientation on first visit',
        'Bring your own towel & bottle'
      ],
      notIncluded: [
        'Progress check-ins',
        'Guest passes',
        'Weekend bootcamps'
      ],
      gradient: 'from-gray-600 to-gray-800',
      highlighted: false
    },
    {
      name: 'Regular',
      tagline: 'MOST POPULAR',
      price: '₱599',
      period: 'per month',
      icon: '✅',
      features: [
        'Everything in Basic',
        '1 Progress Check-in per month',
        'Invite a friend (1 free pass/month)',
        'Access to special weekend bootcamps (coming soon)'
      ],
      notIncluded: [
        'Lifetime locked-in rate',
        'Founders Wall recognition'
      ],
      gradient: 'from-red-600 to-red-800',
      highlighted: true
    },
    {
      name: 'PowerZone Founder',
      tagline: 'LIFETIME MEMBER',
      price: '₱799',
      period: 'per month',
      icon: '🔥',
      features: [
        'Everything in Regular',
        'Lifetime locked-in rate',
        'Your name on our "Founders Wall"',
        'Priority for future upgrades',
        'Help shape the gym\'s future through feedback'
      ],
      notIncluded: [],
      gradient: 'from-purple-600 to-pink-600',
      highlighted: false
    }
  ];
</script>

<svelte:head>
  <title>Membership Plans - PowerZone Gym Dingalan</title>
</svelte:head>

<!-- Hero Section -->
<section class="relative py-32 px-4 overflow-hidden bg-black/90">
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
      Simple & Honest Pricing
    </div>
    <h1 class="text-6xl md:text-7xl font-black mb-6 animate-slide-up" style="animation-delay: 0.1s">
      CHOOSE YOUR <span class="text-gym-red glow-text glitch">PLAN</span>
    </h1>
    <p class="text-xl text-gray-300 max-w-3xl mx-auto animate-slide-up" style="animation-delay: 0.2s">
      No contracts. No hidden fees. Just straightforward membership options for our community.
    </p>
  </div>
</section>

<!-- What's Included Section -->
<section class="py-20 px-4 bg-black/80">
  <div class="container mx-auto max-w-7xl">
    <div class="text-center mb-12">
      <span class="inline-block px-4 py-1 bg-gym-red/20 border border-gym-red/50 rounded-full 
                   text-gym-red text-sm font-bold tracking-wider uppercase mb-6">
        All Plans Include
      </span>
      <h2 class="text-4xl md:text-5xl font-black">
        EVERY MEMBERSHIP <span class="text-gym-red glow-text">INCLUDES</span>
      </h2>
    </div>
    
    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
      {#each [
        { 
          icon: '🏋️', 
          title: 'Full Equipment Access', 
          desc: 'Use everything we have, no hidden restrictions'
        },
        { 
          icon: '🧍‍♂️', 
          title: 'Basic Guidance', 
          desc: 'Ask Anthony for help with equipment or beginner tips'
        },
        { 
          icon: '💦', 
          title: 'Free Water Refill Station', 
          desc: 'Stay hydrated anytime'
        },
        { 
          icon: '📆', 
          title: 'Progress Check-ins', 
          desc: 'Monthly casual progress talks or weight checks'
        },
        { 
          icon: '👥', 
          title: 'Supportive Community', 
          desc: 'A place where everyone starts somewhere'
        },
        { 
          icon: '📸', 
          title: 'Gym Wall of Fame', 
          desc: 'Be part of our growth and history'
        },
        { 
          icon: '🧍‍♀️', 
          title: 'No Pressure Vibe', 
          desc: 'Come as you are, train at your pace'
        },
        { 
          icon: '🎯', 
          title: 'Flexible Hours', 
          desc: 'Train when it works for you'
        }
      ] as feature}
        <div class="group {mounted ? 'animate-slide-up' : ''}">
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

<!-- Pricing Cards -->
<section class="py-20 px-4 relative bg-black/90">
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
            {plan.icon}
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
                <div class="text-6xl mb-4">{plan.icon}</div>
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
                  {plan.highlighted ? 'Get Started' : 'Choose Plan'}
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
                <div class="text-6xl mb-4">{plan.icon}</div>
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
                Get Started
              </a>
            </div>
          </div>
        {/if}
      {/each}
    </div>
  </div>
</section>

<!-- FAQ Section -->
<section class="py-32 px-4 bg-black/80">
  <div class="container mx-auto max-w-4xl">
    <div class="text-center mb-16">
      <span class="inline-block px-4 py-1 bg-gym-red/20 border border-gym-red/50 rounded-full 
                   text-gym-red text-sm font-bold tracking-wider uppercase mb-6">
        Questions?
      </span>
      <h2 class="text-5xl md:text-6xl font-black">
        FREQUENTLY ASKED <span class="text-gym-red glow-text">QUESTIONS</span>
      </h2>
    </div>
    
    <div class="space-y-4">
      {#each [
        { 
          q: 'Can I switch between membership plans?', 
          a: 'Yes! You can upgrade anytime and the new rate applies immediately. For downgrades, just let us know before your next billing date.' 
        },
        { 
          q: 'Is there a contract or joining fee?', 
          a: 'No contracts and no joining fees! We keep it simple - pay monthly, cancel anytime.' 
        },
        { 
          q: 'What should I bring on my first visit?', 
          a: 'Just bring a towel, water bottle, and your positive energy! We\'ll handle the orientation.' 
        },
        { 
          q: 'What are your operating hours?', 
          a: 'We\'re open 7 days a week! Call us at +63 926 922 8903 for current hours.' 
        },
        { 
          q: 'Do you offer day passes?', 
          a: 'Yes! Contact us for day pass rates. Regular members also get 1 free guest pass per month.' 
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
<section class="py-32 px-4 relative overflow-hidden bg-black/90">
  <div class="absolute inset-0">
    <div class="absolute inset-0 bg-gradient-to-r from-gym-red/20 via-transparent to-gym-red/20"></div>
  </div>
  
  <div class="container mx-auto max-w-4xl text-center relative z-10">
    <h2 class="text-5xl md:text-6xl font-black mb-6">
      START YOUR <span class="text-gym-red glitch">JOURNEY</span>
    </h2>
    <p class="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
      Join our growing fitness family today. No excuses, just results.
    </p>
    <div class="flex flex-col sm:flex-row gap-6 justify-center">
      <a 
        href="/contact" 
        class="group relative px-10 py-4 bg-gym-red text-white font-black text-lg tracking-wider uppercase
               overflow-hidden transition-all duration-300 hover:shadow-[0_0_50px_rgba(220,38,38,0.7)]"
      >
        <span class="relative z-10">Sign Up Now</span>
        <div class="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 translate-x-full 
                    group-hover:translate-x-0 transition-transform duration-300"></div>
      </a>
      <a 
        href="tel:+639269228903" 
        class="px-10 py-4 border-2 border-gym-red text-white font-black text-lg tracking-wider uppercase
               hover:bg-gym-red/10 transition-all duration-300"
      >
        Call Us
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