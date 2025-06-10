<script lang="ts">
  const membershipPlans = [
    {
      name: 'Basic',
      price: '$29',
      period: 'per month',
      features: [
        'Access to gym equipment',
        'Locker room access',
        'Free fitness assessment',
        'Mobile app access'
      ],
      highlighted: false
    },
    {
      name: 'Pro',
      price: '$59',
      period: 'per month',
      features: [
        'Everything in Basic',
        'Unlimited group classes',
        '2 personal training sessions/month',
        'Nutrition consultation',
        'Priority booking'
      ],
      highlighted: true
    },
    {
      name: 'Elite',
      price: '$99',
      period: 'per month',
      features: [
        'Everything in Pro',
        'Unlimited personal training',
        'Custom meal plans',
        'Quarterly body composition analysis',
        '24/7 gym access',
        'Guest passes (2/month)'
      ],
      highlighted: false
    }
  ];
</script>

<svelte:head>
  <title>Membership Plans - Power Zone Gym</title>
</svelte:head>

<section class="py-20 px-4">
  <div class="container mx-auto max-w-6xl">
    <h1 class="text-5xl font-black text-center mb-6">
      CHOOSE YOUR <span class="text-gym-red">POWER</span>
    </h1>
    <p class="text-xl text-gray-300 text-center mb-12 max-w-2xl mx-auto">
      Select the membership plan that fits your fitness goals and lifestyle.
    </p>
    
    <div class="grid md:grid-cols-3 gap-8">
      {#each membershipPlans as plan}
        <div class="bg-gray-900 rounded-lg p-8 border-2 {plan.highlighted ? 'border-gym-red' : 'border-gray-800'} relative">
          {#if plan.highlighted}
            <div class="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gym-red px-4 py-1 rounded-full text-sm font-bold">
              MOST POPULAR
            </div>
          {/if}
          
          <h3 class="text-2xl font-bold mb-4">{plan.name}</h3>
          <div class="mb-6">
            <span class="text-4xl font-black text-gym-red">{plan.price}</span>
            <span class="text-gray-400">/{plan.period}</span>
          </div>
          
          <ul class="space-y-3 mb-8">
            {#each plan.features as feature}
              <li class="flex items-start">
                <span class="text-gym-red mr-2">✓</span>
                <span class="text-gray-300">{feature}</span>
              </li>
            {/each}
          </ul>
          
          <a 
            href="/contact" 
            class="block text-center py-3 rounded-lg font-bold transition-all
                   {plan.highlighted 
                     ? 'bg-gym-red hover:bg-red-700' 
                     : 'bg-gray-800 hover:bg-gray-700'}"
          >
            Get Started
          </a>
        </div>
      {/each}
    </div>
    
    <div class="mt-16 bg-gray-900 rounded-lg p-8 border border-gray-800">
      <h2 class="text-3xl font-bold mb-6 text-center">All Memberships Include</h2>
      <div class="grid md:grid-cols-4 gap-6 text-center">
        <div>
          <div class="text-4xl mb-2">🏋️</div>
          <h3 class="font-semibold mb-1">State-of-the-art Equipment</h3>
          <p class="text-gray-400 text-sm">Latest machines and free weights</p>
        </div>
        <div>
          <div class="text-4xl mb-2">🚿</div>
          <h3 class="font-semibold mb-1">Premium Facilities</h3>
          <p class="text-gray-400 text-sm">Clean locker rooms and showers</p>
        </div>
        <div>
          <div class="text-4xl mb-2">📱</div>
          <h3 class="font-semibold mb-1">Fitness Tracking</h3>
          <p class="text-gray-400 text-sm">Mobile app with workout logs</p>
        </div>
        <div>
          <div class="text-4xl mb-2">🤝</div>
          <h3 class="font-semibold mb-1">Community Support</h3>
          <p class="text-gray-400 text-sm">Connect with fellow members</p>
        </div>
      </div>
    </div>
  </div>
</section>