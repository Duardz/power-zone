<script lang="ts">
  import { onMount } from 'svelte';
  import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
  import { isFirebaseReady, getFirebaseDb } from '$lib/firebase';
  import { 
    validateEmail, 
    sanitizeText, 
    validatePhone, 
    checkRateLimit,
    detectXSS 
  } from '$lib/utils/validation';
  
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
  
  // Honeypot field for bot detection
  let honeypot = '';
  
  onMount(() => {
    mounted = true;
    
    // Clear any stored form data on mount for security
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', clearSensitiveData);
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('beforeunload', clearSensitiveData);
      }
    };
  });
  
  function clearSensitiveData() {
    formData = { name: '', email: '', phone: '', message: '', interest: 'general' };
  }
  
  async function handleSubmit(e: Event) {
    e.preventDefault();
    
    // Check honeypot (anti-bot)
    if (honeypot) {
      console.warn('Bot detected');
      return;
    }
    
    // Rate limiting - use a unique key per user/session
    const rateLimitKey = `contact_${new Date().toISOString().split('T')[0]}`; // Daily limit
    if (!checkRateLimit(rateLimitKey, 10, 86400000)) { // 10 submissions per day
      submitMessage = 'You have reached the daily submission limit. Please try again tomorrow.';
      submitStatus = 'error';
      return;
    }
    
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
    
    // Email validation using utility
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.valid) {
      submitMessage = emailValidation.error || 'Invalid email address';
      submitStatus = 'error';
      isSubmitting = false;
      return;
    }
    
    // Phone validation using utility
    const phoneValidation = validatePhone(formData.phone);
    if (!phoneValidation.valid) {
      submitMessage = 'Invalid phone number format';
      submitStatus = 'error';
      isSubmitting = false;
      return;
    }
    
    // Message length validation
    if (formData.message.length < 10) {
      submitMessage = 'Message must be at least 10 characters long.';
      submitStatus = 'error';
      isSubmitting = false;
      return;
    }
    
    if (formData.message.length > 1000) {
      submitMessage = 'Message must be less than 1000 characters.';
      submitStatus = 'error';
      isSubmitting = false;
      return;
    }
    
    // XSS detection
    if (detectXSS(formData.name) || detectXSS(formData.message)) {
      submitMessage = 'Invalid characters detected in your submission.';
      submitStatus = 'error';
      isSubmitting = false;
      return;
    }
    
    try {
      if (!isFirebaseReady()) {
        throw new Error('Service temporarily unavailable. Please try again later.');
      }
      
      const db = getFirebaseDb();
      
      // Sanitize all inputs using utility functions
      const sanitizedData = {
        name: sanitizeText(formData.name, 100),
        email: formData.email.toLowerCase().trim(),
        phone: phoneValidation.sanitized,
        message: sanitizeText(formData.message, 1000),
        interest: ['general', 'membership', 'visit', 'feedback'].includes(formData.interest) 
          ? formData.interest 
          : 'general',
        timestamp: serverTimestamp(),
        read: false,
        // Add security metadata
        submittedAt: new Date().toISOString(),
        formVersion: '1.0',
        // Don't store sensitive data like IP or full user agent
      };
      
      // Final validation
      if (!sanitizedData.name || !sanitizedData.email || !sanitizedData.message) {
        throw new Error('Invalid form data');
      }
      
      await addDoc(collection(db, 'messages'), sanitizedData);
      
      submitMessage = 'Message sent successfully! We\'ll contact you within 24 hours.';
      submitStatus = 'success';
      
      // Clear form and honeypot
      formData = { name: '', email: '', phone: '', message: '', interest: 'general' };
      honeypot = '';
    } catch (error) {
      console.error('Error submitting form:', error);
      
      // Don't expose internal error details to user
      if (error instanceof Error && error.message.includes('Service temporarily unavailable')) {
        submitMessage = error.message;
      } else {
        submitMessage = 'Failed to send message. Please try again or call us directly.';
      }
      submitStatus = 'error';
    } finally {
      isSubmitting = false;
    }
  }
  
  // Prevent paste of rich text in message field
  function handlePaste(e: ClipboardEvent) {
    e.preventDefault();
    const text = e.clipboardData?.getData('text/plain');
    if (text && e.target instanceof HTMLTextAreaElement) {
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newValue = formData.message.substring(0, start) + text + formData.message.substring(end);
      formData.message = newValue.slice(0, 1000);
    }
  }
</script>

<svelte:head>
  <title>Contact PowerZone - Gym in Dingalan, Aurora</title>
  <meta name="description" content="Contact PowerZone Gym in Dingalan, Aurora. Call us at +63 926 922 8903 or send us a message. We're here to help you start your fitness journey.">
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
          
          <form on:submit={handleSubmit} class="space-y-5" novalidate>
            <!-- Honeypot field (hidden from users) -->
            <div style="position: absolute; left: -5000px;" aria-hidden="true">
              <input 
                type="text" 
                name="website" 
                tabindex="-1" 
                autocomplete="off"
                bind:value={honeypot}
              />
            </div>
            
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
                maxlength="100"
                class="w-full px-4 py-3 bg-black/80 border border-gray-800 rounded-lg 
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
                maxlength="254"
                class="w-full px-4 py-3 bg-black/80 border border-gray-800 rounded-lg 
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
                maxlength="20"
                class="w-full px-4 py-3 bg-black/80 border border-gray-800 rounded-lg 
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
                class="w-full px-4 py-3 bg-black/80 text-white border border-gray-800 rounded-lg 
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
                <span class="text-xs font-normal text-gray-600 float-right">
                  {formData.message.length}/1000
                </span>
              </label>
              <textarea
                id="message"
                bind:value={formData.message}
                on:paste={handlePaste}
                required
                disabled={isSubmitting}
                rows="4"
                maxlength="1000"
                class="w-full px-4 py-3 bg-black/80 border border-gray-800 rounded-lg 
                       focus:border-gym-red focus:outline-none transition-all duration-300
                       hover:border-gray-700 resize-none disabled:opacity-50"
                placeholder="How can we help you? (minimum 10 characters)"
              ></textarea>
            </div>
            
            <!-- Submit Button -->
            <button
              type="submit"
              disabled={isSubmitting || formData.message.length < 10}
              class="w-full py-4 bg-gym-red font-black uppercase tracking-wider 
                     transition-all duration-300 hover:bg-red-700
                     disabled:opacity-50 disabled:cursor-not-allowed
                     hover:shadow-[0_0_30px_rgba(220,38,38,0.5)]"
              aria-label="Send message"
            >
              {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
            </button>
            
            {#if submitMessage}
              <div class="p-4 rounded-lg text-center animate-slide-up
                          {submitStatus === 'success' 
                            ? 'bg-green-500/10 text-green-400' 
                            : 'bg-red-500/10 text-red-400'}"
                   role="alert">
                {submitMessage}
              </div>
            {/if}
            
            <!-- Privacy Notice -->
            <p class="text-xs text-gray-500 text-center">
              By submitting this form, you agree to our privacy policy. 
              We'll only use your information to respond to your inquiry.
            </p>
          </form>
        </div>
      </div>
      
      <!-- Contact Info - Simplified -->
      <div class="lg:col-span-2 space-y-6 {mounted ? 'animate-slide-up' : ''}" style="animation-delay: 0.1s">
        <!-- Quick Contact -->
        <div class="futuristic-card p-6 border border-gray-700 hover:border-gym-red/60 transition-all duration-300">
          <h3 class="font-black text-xl mb-4 text-white">QUICK CONTACT</h3>
          
          <div class="space-y-4">
            <!-- Phone -->
            <a href="tel:+639269228903" 
               class="flex items-center gap-3 p-4 bg-black/60 border border-gray-700 rounded-lg
                      hover:border-gym-red hover:bg-gym-red/10 transition-all duration-300 group">
              <span class="text-2xl" aria-hidden="true">📞</span>
              <div>
                <p class="font-bold text-white group-hover:text-gym-red transition-colors">+63 926 922 8903</p>
                <p class="text-xs text-gray-400">Tap to call</p>
              </div>
            </a>
            
            <!-- Email -->
            <a href="mailto:powerzone@gmail.com" 
               class="flex items-center gap-3 p-4 bg-black/60 border border-gray-700 rounded-lg
                      hover:border-gym-red hover:bg-gym-red/10 transition-all duration-300 group">
              <span class="text-2xl" aria-hidden="true">✉️</span>
              <div>
                <p class="font-bold text-white group-hover:text-gym-red transition-colors">powerzone@gmail.com</p>
                <p class="text-xs text-gray-400">Tap to email</p>
              </div>
            </a>
          </div>
        </div>
        
        <!-- Location -->
        <div class="futuristic-card p-6 border border-gray-700 hover:border-gym-red/60 transition-all duration-300">
          <h3 class="font-black text-xl mb-4 text-white">FIND US</h3>
          
          <div class="space-y-3">
            <p class="text-gray-200">
              <span class="font-bold text-white">Purok Mulawin, Paltic</span><br>
              Dingalan, Aurora
            </p>
            
            <!-- Map placeholder -->
            <div class="relative h-48 bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
              <div class="absolute inset-0 flex items-center justify-center bg-gray-900">
                <div class="text-center p-4">
                  <div class="text-4xl mb-2">📍</div>
                  <p class="text-white font-bold">PowerZone Gym</p>
                  <p class="text-sm text-gray-400">Purok Mulawin, Paltic</p>
                  <p class="text-sm text-gray-400">Dingalan, Aurora</p>
                </div>
              </div>
              <div class="absolute inset-0 bg-gym-red/5 pointer-events-none"></div>
            </div>
            
            <a 
              href="https://www.google.com/maps/dir/?api=1&destination=Purok+Mulawin+Paltic+Dingalan+Aurora"
              target="_blank"
              rel="noopener noreferrer"
              class="block w-full py-3 text-center bg-gym-red/20 border border-gym-red text-gym-red
                     font-bold uppercase tracking-wider hover:bg-gym-red hover:text-white
                     transition-all duration-300 hover:shadow-[0_0_20px_rgba(220,38,38,0.5)]"
            >
              Get Directions
            </a>
          </div>
        </div>
        
        <!-- Hours -->
        <div class="futuristic-card p-6 border border-gray-700 hover:border-gym-red/60 transition-all duration-300">
          <h3 class="font-black text-xl mb-4 text-white">GYM HOURS</h3>
          <p class="text-gray-200">
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
  
  button[type="submit"]:hover:not(:disabled) {
    background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
    box-shadow: 0 6px 30px rgba(220, 38, 38, 0.5);
  }
  
  /* Security: Hide honeypot field completely */
  input[name="website"] {
    display: none !important;
  }
</style>