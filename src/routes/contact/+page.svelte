<script lang="ts">
  import { onMount } from 'svelte';
  import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
  import { isFirebaseReady, getFirebaseDb } from '$lib/firebase';
  
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
  
  onMount(() => {
    mounted = true;
  });
  
  async function handleSubmit(e: Event) {
    e.preventDefault();
    isSubmitting = true;
    submitMessage = '';
    submitStatus = '';
    
    // Input validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      submitMessage = 'Please fill in all required fields.';
      submitStatus = 'error';
      isSubmitting = false;
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      submitMessage = 'Please enter a valid email address.';
      submitStatus = 'error';
      isSubmitting = false;
      return;
    }
    
    try {
      if (!isFirebaseReady()) {
        // Fallback for when Firebase is not available
        console.log('Firebase not ready, simulating submission:', formData);
        await new Promise(resolve => setTimeout(resolve, 1000));
        submitMessage = 'Message sent! We\'ll contact you within 24 hours.';
        submitStatus = 'success';
        formData = { name: '', email: '', phone: '', message: '', interest: 'general' };
        return;
      }
      
      const db = getFirebaseDb();
      
      // Sanitize input data
      const sanitizedData = {
        name: formData.name.trim().slice(0, 100),
        email: formData.email.trim().toLowerCase().slice(0, 100),
        phone: formData.phone.trim().slice(0, 20),
        message: formData.message.trim().slice(0, 1000),
        interest: formData.interest,
        timestamp: serverTimestamp(),
        read: false
      };
      
      await addDoc(collection(db, 'messages'), sanitizedData);
      
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

<!-- Simplified Hero Section -->
<section class="relative py-20 px-4 bg-black/90">
  <div class="container mx-auto max-w-4xl text-center">
    <h1 class="text-5xl md:text-6xl font-black mb-4 animate-slide-up">
      LET'S <span class="text-gym-red glow-text">CONNECT</span>
    </h1>
    <p class="text-xl text-gray-300 animate-slide-up" style="animation-delay: 0.1s">
      We're here to help you start your fitness journey
    </p>
  </div>
</section>

<!-- Main Contact Section -->
<section class="py-16 px-4 bg-black/80">
  <div class="container mx-auto max-w-6xl">
    <div class="grid lg:grid-cols-5 gap-12">
      <!-- Contact Form - Takes up more space -->
      <div class="lg:col-span-3 {mounted ? 'animate-slide-up' : ''}">
        <div class="futuristic-card p-8 border border-gray-700 hover:border-gym-red/60 transition-all duration-300">
          <h2 class="text-2xl font-black mb-6 text-white">SEND A MESSAGE</h2>
          
          <form on:submit={handleSubmit} class="space-y-5">
            <!-- Name Field -->
            <div>
              <label for="name" class="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-400">
                Name <span class="text-gym-red">*</span>
              </label>
              <input
                type="text"
                id="name"
                bind:value={formData.name}
                required
                disabled={isSubmitting}
                class="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg 
                       focus:border-gym-red focus:outline-none transition-all duration-300
                       hover:border-gray-700 disabled:opacity-50"
                placeholder="Your name"
              />
            </div>
            
            <!-- Email Field -->
            <div>
              <label for="email" class="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-400">
                Email <span class="text-gym-red">*</span>
              </label>
              <input
                type="email"
                id="email"
                bind:value={formData.email}
                required
                disabled={isSubmitting}
                class="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg 
                       focus:border-gym-red focus:outline-none transition-all duration-300
                       hover:border-gray-700 disabled:opacity-50"
                placeholder="your@email.com"
              />
            </div>
            
            <!-- Phone Field - Optional -->
            <div>
              <label for="phone" class="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-400">
                Phone <span class="text-gray-600 text-xs font-normal">(optional)</span>
              </label>
              <input
                type="tel"
                id="phone"
                bind:value={formData.phone}
                disabled={isSubmitting}
                class="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg 
                       focus:border-gym-red focus:outline-none transition-all duration-300
                       hover:border-gray-700 disabled:opacity-50"
                placeholder="+63 XXX XXX XXXX"
              />
            </div>
            
            <!-- Interest Field -->
            <div>
              <label for="interest" class="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-400">
                I'm interested in
              </label>
              <select
                id="interest"
                bind:value={formData.interest}
                disabled={isSubmitting}
                class="w-full px-4 py-3 bg-black text-white border border-gray-800 rounded-lg 
                      focus:border-gym-red focus:outline-none transition-all duration-300 
                      hover:border-gray-700 cursor-pointer disabled:opacity-50"
              >
                <option value="general">General Inquiry</option>
                <option value="membership">Membership Info</option>
                <option value="visit">Schedule a Visit</option>
                <option value="feedback">Feedback</option>
              </select>
            </div>
            
            <!-- Message Field -->
            <div>
              <label for="message" class="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-400">
                Message <span class="text-gym-red">*</span>
              </label>
              <textarea
                id="message"
                bind:value={formData.message}
                required
                disabled={isSubmitting}
                rows="4"
                class="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg 
                       focus:border-gym-red focus:outline-none transition-all duration-300
                       hover:border-gray-700 resize-none disabled:opacity-50"
                placeholder="How can we help you?"
              ></textarea>
            </div>
            
            <!-- Submit Button -->
            <button
              type="submit"
              disabled={isSubmitting}
              class="w-full py-4 bg-gym-red font-black uppercase tracking-wider 
                     transition-all duration-300 hover:bg-red-700
                     disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
            </button>
            
            {#if submitMessage}
              <div class="p-4 rounded-lg text-center animate-slide-up
                          {submitStatus === 'success' 
                            ? 'bg-green-500/10 text-green-400' 
                            : 'bg-red-500/10 text-red-400'}">
                {submitMessage}
              </div>
            {/if}
          </form>
        </div>
      </div>
      
      <!-- Contact Info - Simplified -->
      <div class="lg:col-span-2 space-y-6 {mounted ? 'animate-slide-up' : ''}" style="animation-delay: 0.1s">
        <!-- Quick Contact -->
        <div class="futuristic-card p-6 border border-gray-800">
          <h3 class="font-black text-xl mb-4">QUICK CONTACT</h3>
          
          <div class="space-y-4">
            <!-- Phone -->
            <a href="tel:+639269228903" 
               class="flex items-center gap-3 p-3 bg-black border border-gray-800 rounded-lg
                      hover:border-gym-red transition-all duration-300 group">
              <span class="text-2xl">📞</span>
              <div>
                <p class="font-bold group-hover:text-gym-red transition-colors">+63 926 922 8903</p>
                <p class="text-xs text-gray-400">Tap to call</p>
              </div>
            </a>
            
            <!-- Email -->
            <a href="mailto:powerzone@gmail.com" 
               class="flex items-center gap-3 p-3 bg-black border border-gray-800 rounded-lg
                      hover:border-gym-red transition-all duration-300 group">
              <span class="text-2xl">✉️</span>
              <div>
                <p class="font-bold group-hover:text-gym-red transition-colors">powerzone@gmail.com</p>
                <p class="text-xs text-gray-400">Tap to email</p>
              </div>
            </a>
          </div>
        </div>
        
        <!-- Location -->
        <div class="futuristic-card p-6 border border-gray-800">
          <h3 class="font-black text-xl mb-4">FIND US</h3>
          
          <div class="space-y-3">
            <p class="text-gray-300">
              <span class="font-bold">Purok Mulawin, Paltic</span><br>
              Dingalan, Aurora
            </p>
            
            <!-- Embedded Google Map -->
            <div class="relative h-48 bg-gray-900 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3847.5!2d121.3931!3d15.3489!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTXCsDIwJzU2LjAiTiAxMjHCsDIzJzM1LjIiRQ!5e0!3m2!1sen!2sph!4v1234567890"
                width="100%"
                height="100%"
                style="border:0; filter: grayscale(100%) contrast(1.2);"
                allowfullscreen={true}
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                title="PowerZone Gym Location"
              ></iframe>
              
              <!-- Overlay for styling -->
              <div class="absolute inset-0 bg-gym-red/10 pointer-events-none"></div>
            </div>
            
            <a 
              href="https://www.google.com/maps/dir/?api=1&destination=Purok+Mulawin+Paltic+Dingalan+Aurora"
              target="_blank"
              rel="noopener noreferrer"
              class="block w-full py-3 text-center bg-black border border-gym-red text-gym-red
                     font-bold uppercase tracking-wider hover:bg-gym-red hover:text-white
                     transition-all duration-300"
            >
              Get Directions
            </a>
          </div>
        </div>
        
        <!-- Hours -->
        <div class="futuristic-card p-6 border border-gray-800">
          <h3 class="font-black text-xl mb-4">GYM HOURS</h3>
          <p class="text-gray-300">
            <span class="font-bold text-white">Monday - Sunday</span><br>
            Open 7 days a week<br>
            <span class="text-sm text-gray-400">Call for specific hours</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Simple CTA -->
<section class="py-16 px-4 bg-gradient-to-b from-black/90 to-black border-t border-gray-700">
  <div class="container mx-auto max-w-4xl text-center">
    <p class="text-gray-300 mb-2 font-medium">Ready to start?</p>
    <h2 class="text-3xl font-black mb-6 text-white">
      VISIT US <span class="text-gym-red glow-text">TODAY</span>
    </h2>
    <a 
      href="tel:+639269228903"
      class="inline-block px-8 py-3 bg-gym-red text-white font-black uppercase
             hover:bg-red-600 transition-all duration-300 hover:shadow-[0_0_30px_rgba(220,38,38,0.6)]"
    >
      CALL NOW
    </a>
  </div>
</section>

<style>
  .glow-text {
    text-shadow: 0 0 20px rgba(220, 38, 38, 1), 0 0 40px rgba(220, 38, 38, 0.8);
  }
  
  .futuristic-card {
    background: linear-gradient(135deg, rgba(31, 41, 55, 0.3) 0%, rgba(17, 24, 39, 0.4) 100%);
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
  }
  
  @keyframes slide-up {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-slide-up {
    animation: slide-up 0.6s ease-out;
  }
  
  /* Clean focus states with more vibrant color */
  input:focus, select:focus, textarea:focus {
    background-color: rgba(220, 38, 38, 0.05);
    box-shadow: 0 0 0 1px rgba(220, 38, 38, 0.5);
  }
  
  /* Enhanced hover states */
  .futuristic-card:hover {
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.4);
  }
  
  /* Brighter form fields */
  input, select, textarea {
    background-color: rgba(0, 0, 0, 0.8) !important;
    color: #ffffff !important;
  }
  
  input::placeholder, textarea::placeholder {
    color: rgba(156, 163, 175, 0.8) !important;
  }
  
  /* Enhance button colors */
  button[type="submit"] {
    background: linear-gradient(135deg, #DC2626 0%, #B91C1C 100%);
    box-shadow: 0 4px 20px rgba(220, 38, 38, 0.3);
  }
  
  button[type="submit"]:hover {
    background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
    box-shadow: 0 6px 30px rgba(220, 38, 38, 0.5);
  }
  
  /* Map overlay enhancement */
  iframe {
    filter: grayscale(80%) contrast(1.1) brightness(0.9);
  }
</style>