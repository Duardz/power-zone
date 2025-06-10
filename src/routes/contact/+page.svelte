<script lang="ts">
  import { addDoc, collection } from 'firebase/firestore';
  import { db } from '$lib/firebase';
  
  let formData = {
    name: '',
    email: '',
    message: ''
  };
  
  let isSubmitting = false;
  let submitMessage = '';
  
  async function handleSubmit(e: Event) {
    e.preventDefault();
    isSubmitting = true;
    submitMessage = '';
    
    try {
      // For now, just log the data since Firebase might not be configured
      console.log('Form submission:', formData);
      
      // Uncomment when Firebase is set up
      // await addDoc(collection(db, 'messages'), {
      //   ...formData,
      //   timestamp: new Date()
      // });
      
      submitMessage = 'Thank you for your message! We\'ll get back to you soon.';
      formData = { name: '', email: '', message: '' };
    } catch (error) {
      console.error('Error submitting form:', error);
      submitMessage = 'Sorry, there was an error. Please try again later.';
    } finally {
      isSubmitting = false;
    }
  }
</script>

<svelte:head>
  <title>Contact Us - Power Zone Gym</title>
</svelte:head>

<section class="py-20 px-4">
  <div class="container mx-auto max-w-6xl">
    <h1 class="text-5xl font-black text-center mb-6">
      GET IN <span class="text-gym-red">TOUCH</span>
    </h1>
    <p class="text-xl text-gray-300 text-center mb-12 max-w-2xl mx-auto">
      Ready to start your fitness journey? Have questions? We're here to help!
    </p>
    
    <div class="grid md:grid-cols-2 gap-12">
      <!-- Contact Form -->
      <div>
        <h2 class="text-2xl font-bold mb-6">Send Us a Message</h2>
        <form on:submit={handleSubmit} class="space-y-6">
          <div>
            <label for="name" class="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              id="name"
              bind:value={formData.name}
              required
              class="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:border-gym-red focus:outline-none"
            />
          </div>
          
          <div>
            <label for="email" class="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              bind:value={formData.email}
              required
              class="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:border-gym-red focus:outline-none"
            />
          </div>
          
          <div>
            <label for="message" class="block text-sm font-medium mb-2">Message</label>
            <textarea
              id="message"
              bind:value={formData.message}
              required
              rows="5"
              class="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:border-gym-red focus:outline-none resize-none"
            ></textarea>
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            class="w-full py-3 bg-gym-red hover:bg-red-700 rounded-lg font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
          
          {#if submitMessage}
            <p class="text-center {submitMessage.includes('error') ? 'text-red-500' : 'text-green-500'}">
              {submitMessage}
            </p>
          {/if}
        </form>
      </div>
      
      <!-- Contact Info & Map -->
      <div>
        <h2 class="text-2xl font-bold mb-6">Visit Us</h2>
        
        <div class="bg-gray-900 rounded-lg p-6 border border-gray-800 mb-6">
          <h3 class="font-semibold text-gym-red mb-4">Power Zone Gym</h3>
          <ul class="space-y-3 text-gray-300">
            <li class="flex items-start">
              <span class="mr-3">📍</span>
              <span>123 Fitness Street<br/>Gym City, GC 12345</span>
            </li>
            <li class="flex items-center">
              <span class="mr-3">📞</span>
              <span>(555) 123-4567</span>
            </li>
            <li class="flex items-center">
              <span class="mr-3">✉️</span>
              <span>info@powerzone.gym</span>
            </li>
          </ul>
        </div>
        
        <div class="bg-gray-900 rounded-lg p-6 border border-gray-800 mb-6">
          <h3 class="font-semibold text-gym-red mb-4">Hours of Operation</h3>
          <ul class="space-y-2 text-gray-300">
            <li class="flex justify-between">
              <span>Monday - Friday</span>
              <span>5:00 AM - 11:00 PM</span>
            </li>
            <li class="flex justify-between">
              <span>Saturday</span>
              <span>6:00 AM - 10:00 PM</span>
            </li>
            <li class="flex justify-between">
              <span>Sunday</span>
              <span>7:00 AM - 9:00 PM</span>
            </li>
          </ul>
        </div>
        
        <!-- Map Placeholder -->
        <div class="bg-gray-900 rounded-lg h-64 flex items-center justify-center border border-gray-800">
          <p class="text-gray-500">Map will be embedded here</p>
        </div>
      </div>
    </div>
  </div>
</section>