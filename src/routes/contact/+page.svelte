<script lang="ts">
  import { onMount } from 'svelte';
  import { addDoc, collection } from 'firebase/firestore';
  import { db } from '$lib/firebase';
  
  let mounted = false;
  let formData = {
    name: '',
    email: '',
    phone: '',
    message: '',
    interest: 'general'
  };
  
  let isSubmitting = false;
  let submitMessage = '';
  let submitStatus: 'success' | 'error' | '' = '';
  
  // Form field focus states for animations
  let focusedField = '';
  
  onMount(() => {
    mounted = true;
  });
  
  async function handleSubmit(e: Event) {
    e.preventDefault();
    isSubmitting = true;
    submitMessage = '';
    submitStatus = '';
    
    try {
      // Add to Firestore
      await addDoc(collection(db, 'messages'), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        interest: formData.interest,
        timestamp: new Date(),
        read: false
      });
      
      submitMessage = 'Message sent! We\'ll contact you within 24 hours.';
      submitStatus = 'success';
      // Reset form
      formData = { name: '', email: '', phone: '', message: '', interest: 'general' };
    } catch (error) {
      console.error('Error submitting form:', error);
      submitMessage = 'Failed to send. Please call us at +63 926 922 8903.';
      submitStatus = 'error';
    } finally {
      isSubmitting = false;
    }
  }
</script>

<svelte:head>
  <title>Contact PowerZone - Gym in Dingalan, Aurora</title>
</svelte:head>

<!-- Hero Section -->
<section class="relative py-32 px-4 overflow-hidden bg-black/90">
  <!-- Animated background -->
  <div class="absolute inset-0">
    <div class="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
    <!-- Circuit board pattern -->
    <div class="absolute inset-0 opacity-10">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M10 10h80v80h-80z" fill="none" stroke="#DC2626" stroke-width="0.5"/>
            <circle cx="10" cy="10" r="2" fill="#DC2626"/>
            <circle cx="90" cy="10" r="2" fill="#DC2626"/>
            <circle cx="10" cy="90" r="2" fill="#DC2626"/>
            <circle cx="90" cy="90" r="2" fill="#DC2626"/>
            <path d="M10 50h30 M60 50h30 M50 10v30 M50 60v30" stroke="#DC2626" stroke-width="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit)" />
      </svg>
    </div>
  </div>
  
  <div class="container mx-auto max-w-4xl text-center relative z-10">
    <div class="inline-block px-4 py-1 bg-gym-red/20 border border-gym-red/50 rounded-full 
                text-gym-red text-sm font-bold tracking-wider uppercase mb-6 animate-slide-up">
      Get In Touch
    </div>
    <h1 class="text-6xl md:text-7xl font-black mb-6 animate-slide-up" style="animation-delay: 0.1s">
      CONNECT WITH <span class="text-gym-red glow-text glitch">POWERZONE</span>
    </h1>
    <p class="text-xl text-gray-300 max-w-2xl mx-auto animate-slide-up" style="animation-delay: 0.2s">
      Ready to start your fitness journey? We're here to help you take the first step.
    </p>
  </div>
</section>

<!-- Contact Section -->
<section class="py-20 px-4 relative bg-black/80">
  <div class="container mx-auto max-w-7xl">
    <div class="grid lg:grid-cols-2 gap-16">
      <!-- Contact Form -->
      <div class="{mounted ? 'animate-slide-up' : ''}">
        <div class="futuristic-card p-8 border border-gray-800 hover:border-gym-red/30 transition-all duration-500">
          <h2 class="text-3xl font-black mb-2">SEND US A MESSAGE</h2>
          <p class="text-gray-400 mb-8">Have questions? Want to join? Drop us a message!</p>
          
          <form on:submit={handleSubmit} class="space-y-6">
            <!-- Name Field -->
            <div class="relative">
              <label for="name" class="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-400">
                Your Name <span class="text-gym-red">*</span>
              </label>
              <input
                type="text"
                id="name"
                bind:value={formData.name}
                on:focus={() => focusedField = 'name'}
                on:blur={() => focusedField = ''}
                required
                disabled={isSubmitting}
                class="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg 
                       focus:border-gym-red focus:outline-none transition-all duration-300
                       hover:border-gray-700 disabled:opacity-50"
                placeholder="Juan Dela Cruz"
              />
              {#if focusedField === 'name'}
                <div class="absolute bottom-0 left-0 w-full h-0.5 bg-gym-red animate-pulse"></div>
              {/if}
            </div>
            
            <!-- Email Field -->
            <div class="relative">
              <label for="email" class="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-400">
                Email Address <span class="text-gym-red">*</span>
              </label>
              <input
                type="email"
                id="email"
                bind:value={formData.email}
                on:focus={() => focusedField = 'email'}
                on:blur={() => focusedField = ''}
                required
                disabled={isSubmitting}
                class="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg 
                       focus:border-gym-red focus:outline-none transition-all duration-300
                       hover:border-gray-700 disabled:opacity-50"
                placeholder="your.email@gmail.com"
              />
              {#if focusedField === 'email'}
                <div class="absolute bottom-0 left-0 w-full h-0.5 bg-gym-red animate-pulse"></div>
              {/if}
            </div>
            
            <!-- Phone Field -->
            <div class="relative">
              <label for="phone" class="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-400">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                bind:value={formData.phone}
                on:focus={() => focusedField = 'phone'}
                on:blur={() => focusedField = ''}
                disabled={isSubmitting}
                class="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg 
                       focus:border-gym-red focus:outline-none transition-all duration-300
                       hover:border-gray-700 disabled:opacity-50"
                placeholder="+63 9XX XXX XXXX"
              />
              {#if focusedField === 'phone'}
                <div class="absolute bottom-0 left-0 w-full h-0.5 bg-gym-red animate-pulse"></div>
              {/if}
            </div>
            
            <!-- Interest Field -->
            <div class="relative">
              <label for="interest" class="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-400">
                What are you interested in?
              </label>
              <select
                id="interest"
                bind:value={formData.interest}
                on:focus={() => focusedField = 'interest'}
                on:blur={() => focusedField = ''}
                disabled={isSubmitting}
                class="w-full px-4 py-3 bg-black text-white border border-gray-800 rounded-lg 
                      focus:bg-white focus:text-black focus:border-gym-red focus:outline-none 
                      transition-all duration-300 hover:border-gray-700 cursor-pointer disabled:opacity-50"
              >
                <option value="general">General Inquiry</option>
                <option value="membership">Membership Information</option>
                <option value="visit">Schedule a Visit</option>
                <option value="feedback">Feedback/Suggestions</option>
              </select>

              {#if focusedField === 'interest'}
                <div class="absolute bottom-0 left-0 w-full h-0.5 bg-gym-red animate-pulse"></div>
              {/if}
            </div>
            
            <!-- Message Field -->
            <div class="relative">
              <label for="message" class="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-400">
                Your Message <span class="text-gym-red">*</span>
              </label>
              <textarea
                id="message"
                bind:value={formData.message}
                on:focus={() => focusedField = 'message'}
                on:blur={() => focusedField = ''}
                required
                disabled={isSubmitting}
                rows="5"
                class="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg 
                       focus:border-gym-red focus:outline-none transition-all duration-300
                       hover:border-gray-700 resize-none disabled:opacity-50"
                placeholder="Tell us how we can help you..."
              ></textarea>
              {#if focusedField === 'message'}
                <div class="absolute bottom-0 left-0 w-full h-0.5 bg-gym-red animate-pulse"></div>
              {/if}
            </div>
            
            <!-- Submit Button -->
            <button
              type="submit"
              disabled={isSubmitting}
              class="relative w-full py-4 bg-gym-red font-black uppercase tracking-wider 
                     transition-all duration-300 overflow-hidden group
                     hover:shadow-[0_0_30px_rgba(220,38,38,0.5)]
                     disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span class="relative z-10">
                {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
              </span>
              <div class="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 
                          translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
              
              {#if isSubmitting}
                <div class="absolute inset-0 flex items-center justify-center">
                  <div class="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              {/if}
            </button>
            
            {#if submitMessage}
              <div class="p-4 border rounded-lg text-center animate-slide-up
                          {submitStatus === 'success' 
                            ? 'bg-green-500/10 border-green-500/50 text-green-400' 
                            : 'bg-red-500/10 border-red-500/50 text-red-400'}">
                {submitMessage}
              </div>
            {/if}
          </form>
        </div>
      </div>
      
      <!-- Contact Info & Map -->
      <div class="space-y-8 {mounted ? 'animate-slide-up' : ''}" style="animation-delay: 0.1s">
        <!-- Quick Contact Cards -->
        <div class="grid gap-4">
          {#each [
            { 
              icon: '📍', 
              title: 'GYM LOCATION', 
              lines: ['Purok Mulawin, Paltic', 'Dingalan, Aurora'],
              action: { text: 'Get Directions', href: 'https://maps.google.com/?q=Purok+Mulawin+Paltic+Dingalan+Aurora' }
            },
            { 
              icon: '📞', 
              title: 'CALL US', 
              lines: ['+63 926 922 8903', 'Available 7 days a week'],
              action: { text: 'Call Now', href: 'tel:+639269228903' }
            },
            { 
              icon: '✉️', 
              title: 'EMAIL', 
              lines: ['powerzone@gmail.com', 'We reply within 24 hours'],
              action: { text: 'Send Email', href: 'mailto:powerzone@gmail.com' }
            }
          ] as info}
            <div class="futuristic-card p-6 border border-gray-800 hover:border-gym-red/50 
                        transition-all duration-300 group">
              <div class="flex items-start gap-4">
                <div class="text-3xl">{info.icon}</div>
                <div class="flex-1">
                  <h3 class="font-black text-gym-red uppercase tracking-wider mb-2">{info.title}</h3>
                  {#each info.lines as line}
                    <p class="text-gray-300">{line}</p>
                  {/each}
                  <a 
                    href={info.action.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-2 mt-3 text-sm font-bold text-gym-red 
                           hover:gap-3 transition-all duration-300"
                  >
                    {info.action.text}
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                            d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          {/each}
        </div>
        
        <!-- Why PowerZone -->
        <div class="futuristic-card p-6 border border-gray-800">
          <h3 class="font-black text-gym-red uppercase tracking-wider mb-4">WHY CHOOSE POWERZONE?</h3>
          <ul class="space-y-3">
            <li class="flex items-start gap-3">
              <span class="text-gym-red mt-1">✓</span>
              <span class="text-gray-300">No contracts or hidden fees</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-gym-red mt-1">✓</span>
              <span class="text-gray-300">Friendly, supportive environment</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-gym-red mt-1">✓</span>
              <span class="text-gray-300">Equipment for all fitness levels</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-gym-red mt-1">✓</span>
              <span class="text-gray-300">Local community focused</span>
            </li>
          </ul>
        </div>
        
        <!-- Map Section -->
        <div class="relative h-96 futuristic-card border border-gray-800 overflow-hidden group">
          <!-- Map placeholder with futuristic overlay -->
          <div class="absolute inset-0 bg-gray-900 flex items-center justify-center">
            <div class="text-center">
              <div class="text-6xl mb-4 animate-pulse">📍</div>
              <p class="text-gray-400 mb-2 font-bold">POWERZONE GYM</p>
              <p class="text-gray-500 text-sm mb-4">Purok Mulawin, Paltic, Dingalan, Aurora</p>
              <a 
                href="https://maps.google.com/?q=Purok+Mulawin+Paltic+Dingalan+Aurora"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-6 py-3 bg-gym-red/20 border border-gym-red/50 
                       hover:bg-gym-red hover:border-gym-red font-bold uppercase tracking-wider 
                       transition-all duration-300"
              >
                Open in Maps
              </a>
            </div>
          </div>
          
          <!-- Futuristic grid overlay -->
          <div class="absolute inset-0 opacity-20 pointer-events-none">
            <div class="absolute inset-0" style="
              background-image: 
                repeating-linear-gradient(0deg, #DC2626 0px, transparent 1px, transparent 40px, #DC2626 41px),
                repeating-linear-gradient(90deg, #DC2626 0px, transparent 1px, transparent 40px, #DC2626 41px);
              background-size: 41px 41px;
            "></div>
          </div>
          
          <!-- Hover effect -->
          <div class="absolute inset-0 bg-gym-red/20 opacity-0 group-hover:opacity-100 
                      transition-opacity duration-500 pointer-events-none"></div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Testimonials Section -->
<section class="py-32 px-4 bg-gradient-to-b from-transparent via-black/50 to-transparent">
  <div class="container mx-auto max-w-7xl">
    <div class="text-center mb-16">
      <span class="inline-block px-4 py-1 bg-gym-red/20 border border-gym-red/50 rounded-full 
                   text-gym-red text-sm font-bold tracking-wider uppercase mb-6">
        Community Voices
      </span>
      <h2 class="text-5xl md:text-6xl font-black">
        WHAT OUR <span class="text-gym-red glow-text">MEMBERS SAY</span>
      </h2>
    </div>
    
    <div class="grid md:grid-cols-3 gap-8">
      {#each [
        {
          name: 'Maria Santos',
          role: 'Member since 2024',
          text: 'PowerZone feels like family. Anthony and the team make everyone feel welcome!',
          rating: 5
        },
        {
          name: 'Jose Reyes',
          role: 'Founder Member',
          text: 'Finally, a gym in Dingalan that understands what locals need. Simple and effective.',
          rating: 5
        },
        {
          name: 'Ana Garcia',
          role: 'Weekend Warrior',
          text: 'Love the no-pressure environment. I can work out at my own pace without judgment.',
          rating: 5
        }
      ] as testimonial, i}
        <div class="futuristic-card p-6 border border-gray-800 hover:border-gym-red/50 
                    transition-all duration-300 {mounted ? 'animate-slide-up' : ''}"
             style="animation-delay: {0.1 * i}s">
          <div class="flex gap-1 mb-4">
            {#each Array(testimonial.rating) as _}
              <span class="text-gym-red">⭐</span>
            {/each}
          </div>
          <p class="text-gray-300 mb-6 italic">"{testimonial.text}"</p>
          <div>
            <p class="font-bold">{testimonial.name}</p>
            <p class="text-sm text-gray-400">{testimonial.role}</p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- CTA Section -->
<section class="py-32 px-4 relative overflow-hidden bg-black/90">
  <div class="absolute inset-0">
    <div class="absolute inset-0 bg-gradient-to-r from-gym-red/10 via-transparent to-gym-red/10"></div>
  </div>
  
  <div class="container mx-auto max-w-4xl text-center relative z-10">
    <h2 class="text-5xl md:text-6xl font-black mb-6">
      DON'T WAIT <span class="text-gym-red glitch">START TODAY</span>
    </h2>
    <p class="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
      Every journey begins with a single step. Take yours with PowerZone.
    </p>
    <div class="flex flex-col sm:flex-row gap-6 justify-center">
      <a 
        href="tel:+639269228903"
        class="group relative px-10 py-4 bg-gym-red text-white font-black text-lg tracking-wider uppercase
               overflow-hidden transition-all duration-300 hover:shadow-[0_0_50px_rgba(220,38,38,0.7)]"
      >
        <span class="relative z-10">Call Now</span>
        <div class="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 translate-x-full 
                    group-hover:translate-x-0 transition-transform duration-300"></div>
      </a>
      <a 
        href="/membership"
        class="px-10 py-4 border-2 border-gym-red text-white font-black text-lg tracking-wider uppercase
               hover:bg-gym-red/10 transition-all duration-300"
      >
        View Plans
      </a>
    </div>
    
    <!-- Contact Info Summary -->
    <div class="mt-12 pt-8 border-t border-gray-800">
      <div class="flex flex-col md:flex-row gap-6 justify-center items-center text-sm">
        <span class="text-gray-400">📍 Purok Mulawin, Paltic, Dingalan</span>
        <span class="hidden md:inline text-gray-600">•</span>
        <a href="tel:+639269228903" class="text-gray-400 hover:text-gym-red transition-colors">
          📞 +63 926 922 8903
        </a>
        <span class="hidden md:inline text-gray-600">•</span>
        <a href="mailto:powerzone@gmail.com" class="text-gray-400 hover:text-gym-red transition-colors">
          ✉️ powerzone@gmail.com
        </a>
      </div>
    </div>
  </div>
</section>

<style>
  /* Custom form field animations */
  input:focus, select:focus, textarea:focus {
    background-color: rgba(220, 38, 38, 0.05);
  }
  
  /* Glitch effect for headers */
  @keyframes glitch {
    0%, 100% {
      text-shadow: 
        0.05em 0 0 rgba(220, 38, 38, 0.75),
        -0.05em -0.025em 0 rgba(38, 220, 220, 0.75),
        0.025em 0.05em 0 rgba(220, 220, 38, 0.75);
    }
    15% {
      text-shadow: 
        -0.05em -0.025em 0 rgba(220, 38, 38, 0.75),
        0.025em 0.025em 0 rgba(38, 220, 220, 0.75),
        -0.05em -0.05em 0 rgba(220, 220, 38, 0.75);
    }
    50% {
      text-shadow: 
        0.025em 0.05em 0 rgba(220, 38, 38, 0.75),
        0.05em 0 0 rgba(38, 220, 220, 0.75),
        0 -0.05em 0 rgba(220, 220, 38, 0.75);
    }
  }
  
  .glitch {
    animation: glitch 3s infinite;
  }
</style>