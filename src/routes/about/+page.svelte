<script lang="ts">
</script>

<svelte:head>
  <title>About Power Zone - Our Story & Mission</title>
</svelte:head>

<!-- Hero Section -->
<section class="relative py-20 px-4 bg-gradient-to-b from-black to-gray-900">
  <div class="container mx-auto max-w-4xl text-center">
    <h1 class="text-5xl font-black mb-6">
      OUR <span class="text-gym-red">STORY</span>
    </h1>
    <p class="text-xl text-gray-300">
      Building champions since 2010
    </p>
  </div>
</section>

<!-- Mission Section -->
<section class="py-20 px-4">
  <div class="container mx-auto max-w-6xl">
    <div class="grid md:grid-cols-2 gap-12 items-center">
      <div>
        <h2 class="text-4xl font-black mb-6">
          OUR <span class="text-gym-red">MISSION</span>
        </h2>
        <p class="text-gray-300 mb-6 text-lg">
          At Power Zone, we believe that fitness is not just about physical strength—it's 
          about mental resilience, community support, and personal growth. Our mission is 
          to create an environment where every individual can discover their true potential.
        </p>
        <p class="text-gray-300 mb-6 text-lg">
          We're not just building bodies; we're building confidence, discipline, and a 
          lifestyle that extends far beyond the gym walls.
        </p>
        <div class="grid grid-cols-2 gap-4 mt-8">
          <div class="bg-gray-900 p-4 rounded-lg border border-gray-800">
            <p class="text-2xl font-bold text-gym-red">5000+</p>
            <p class="text-gray-400">Members Strong</p>
          </div>
          <div class="bg-gray-900 p-4 rounded-lg border border-gray-800">
            <p class="text-2xl font-bold text-gym-red">50+</p>
            <p class="text-gray-400">Classes Weekly</p>
          </div>
        </div>
      </div>
      <div>
        <img 
          src="https://images.unsplash.com/photo-1558611848-73f7eb4001a1?q=80&w=2071" 
          alt="Gym Community" 
          class="rounded-lg shadow-2xl"
        />
      </div>
    </div>
  </div>
</section>

<!-- Values Section -->
<section class="py-20 px-4 bg-gray-900">
  <div class="container mx-auto max-w-6xl">
    <h2 class="text-4xl font-black mb-12 text-center">
      OUR <span class="text-gym-red">VALUES</span>
    </h2>
    <div class="grid md:grid-cols-3 gap-8">
      <div class="text-center">
        <div class="w-20 h-20 bg-gym-red rounded-full flex items-center justify-center mx-auto mb-4">
          <span class="text-3xl">💪</span>
        </div>
        <h3 class="text-xl font-bold mb-2">Strength</h3>
        <p class="text-gray-400">
          We build physical and mental strength through consistent training and support.
        </p>
      </div>
      <div class="text-center">
        <div class="w-20 h-20 bg-gym-red rounded-full flex items-center justify-center mx-auto mb-4">
          <span class="text-3xl">🤝</span>
        </div>
        <h3 class="text-xl font-bold mb-2">Community</h3>
        <p class="text-gray-400">
          Our members support and motivate each other to achieve their goals together.
        </p>
      </div>
      <div class="text-center">
        <div class="w-20 h-20 bg-gym-red rounded-full flex items-center justify-center mx-auto mb-4">
          <span class="text-3xl">📈</span>
        </div>
        <h3 class="text-xl font-bold mb-2">Progress</h3>
        <p class="text-gray-400">
          We celebrate every milestone and help you track your journey to success.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- Team Section -->
<section class="py-20 px-4">
  <div class="container mx-auto max-w-6xl">
    <h2 class="text-4xl font-black mb-12 text-center">
      MEET THE <span class="text-gym-red">TEAM</span>
    </h2>
    <div class="grid md:grid-cols-3 gap-8">
      <div class="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <img 
          src="https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=1887" 
          alt="Marcus Johnson" 
          class="w-full h-64 object-cover rounded-lg mb-4"
        />
        <h3 class="text-xl font-bold mb-1">Marcus Johnson</h3>
        <p class="text-gym-red mb-3">Founder & Head Coach</p>
        <p class="text-gray-400 text-sm">
          20+ years of experience. Certified in strength training, nutrition, and sports psychology.
        </p>
      </div>
      <div class="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <img 
          src="https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1887" 
          alt="Sarah Chen" 
          class="w-full h-64 object-cover rounded-lg mb-4"
        />
        <h3 class="text-xl font-bold mb-1">Sarah Chen</h3>
        <p class="text-gym-red mb-3">Fitness Director</p>
        <p class="text-gray-400 text-sm">
          Specializes in HIIT, yoga, and functional fitness. 10+ years coaching experience.
        </p>
      </div>
      <div class="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <img 
          src="https://images.unsplash.com/photo-1534367610401-9f5ed68180aa?q=80&w=2070" 
          alt="Mike Torres" 
          class="w-full h-64 object-cover rounded-lg mb-4"
        />
        <h3 class="text-xl font-bold mb-1">Mike Torres</h3>
        <p class="text-gym-red mb-3">Strength Coach</p>
        <p class="text-gray-400 text-sm">
          Former competitive powerlifter. Expert in strength training and muscle development.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- CTA Section -->
<section class="py-20 px-4 bg-gym-red">
  <div class="container mx-auto max-w-4xl text-center">
    <h2 class="text-4xl font-black mb-6">JOIN THE POWER ZONE FAMILY</h2>
    <p class="text-xl mb-8 opacity-90">
      Experience the difference of training in an environment built for success.
    </p>
    <a 
      href="/contact" 
      class="inline-block px-8 py-4 bg-black hover:bg-gray-900 rounded-lg font-bold text-lg transition-colors"
    >
      Get Started Today
    </a>
  </div>
</section>