<script lang="ts">
  import type { Post } from '$lib/types';
  import { onMount } from 'svelte';
  
  export let post: Post | null = null;
  export let onSave: (post: Post) => void;
  export let onCancel: () => void;
  
  let mounted = false;
  let formData = {
    title: post?.title || '',
    content: post?.content || '',
    imageURL: post?.imageURL || ''
  };
  
  let isSubmitting = false;
  
  onMount(() => {
    mounted = true;
  });
  
  async function handleSubmit(e: Event) {
    e.preventDefault();
    isSubmitting = true;
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newPost: Post = {
      id: post?.id || Date.now().toString(),
      title: formData.title,
      content: formData.content,
      date: new Date(),
      imageURL: formData.imageURL || undefined
    };
    
    onSave(newPost);
    isSubmitting = false;
  }
  
  // Character count
  $: titleCharCount = formData.title.length;
  $: contentCharCount = formData.content.length;
</script>

<form on:submit={handleSubmit} class="futuristic-card p-8 border-2 border-gray-800 
                                      hover:border-gym-red/50 transition-all duration-500
                                      {mounted ? 'animate-slide-up' : ''}">
  <div class="flex items-center justify-between mb-6">
    <h3 class="text-2xl font-black">
      {post ? 'MODIFY' : 'CREATE'} <span class="text-gym-red">TRANSMISSION</span>
    </h3>
    
    <!-- Status indicator -->
    <div class="flex items-center gap-2 px-3 py-1 bg-gym-red/10 border border-gym-red/30 rounded-full">
      <div class="w-2 h-2 bg-gym-red rounded-full animate-pulse"></div>
      <span class="text-xs font-bold uppercase tracking-wider text-gym-red">
        {post ? 'Edit Mode' : 'Create Mode'}
      </span>
    </div>
  </div>
  
  <div class="space-y-6">
    <!-- Title Field -->
    <div class="relative">
      <label for="title" class="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-400">
        Post Title <span class="text-gym-red">*</span>
      </label>
      <div class="relative">
        <input
          type="text"
          id="title"
          bind:value={formData.title}
          required
          maxlength="100"
          disabled={isSubmitting}
          class="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg 
                 focus:border-gym-red focus:outline-none transition-all duration-300
                 hover:border-gray-700 pr-16 disabled:opacity-50"
          placeholder="Enter post title..."
        />
        <div class="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
          {titleCharCount}/100
        </div>
      </div>
      <!-- Progress bar -->
      <div class="absolute bottom-0 left-0 h-0.5 bg-gray-800 rounded-full overflow-hidden">
        <div 
          class="h-full bg-gym-red transition-all duration-300"
          style="width: {(titleCharCount / 100) * 100}%"
        ></div>
      </div>
    </div>
    
    <!-- Content Field -->
    <div class="relative">
      <label for="content" class="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-400">
        Content <span class="text-gym-red">*</span>
      </label>
      <div class="relative">
        <textarea
          id="content"
          bind:value={formData.content}
          required
          rows="6"
          maxlength="1000"
          disabled={isSubmitting}
          class="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg 
                 focus:border-gym-red focus:outline-none transition-all duration-300
                 hover:border-gray-700 resize-none disabled:opacity-50"
          placeholder="Enter post content..."
        ></textarea>
        <div class="absolute right-3 bottom-3 text-xs text-gray-500">
          {contentCharCount}/1000
        </div>
      </div>
    </div>
    
    <!-- Image URL Field -->
    <div class="relative">
      <label for="imageURL" class="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-400">
        Image URL <span class="text-gray-600">(Optional)</span>
      </label>
      <div class="relative">
        <input
          type="url"
          id="imageURL"
          bind:value={formData.imageURL}
          disabled={isSubmitting}
          class="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg 
                 focus:border-gym-red focus:outline-none transition-all duration-300
                 hover:border-gray-700 pl-10 disabled:opacity-50"
          placeholder="https://example.com/image.jpg"
        />
        <div class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      </div>
      
      {#if formData.imageURL}
        <div class="mt-3 p-3 bg-gray-900 rounded-lg border border-gray-800">
          <p class="text-xs text-gray-400 mb-2">Preview:</p>
          <img 
            src={formData.imageURL} 
            alt="Preview" 
            class="w-full h-32 object-cover rounded"
            on:error={() => formData.imageURL = ''}
          />
        </div>
      {/if}
    </div>
    
    <!-- Action Buttons -->
    <div class="flex gap-4 pt-4 border-t border-gray-800">
      <button
        type="submit"
        disabled={isSubmitting}
        class="flex-1 relative py-3 bg-gym-red font-black uppercase tracking-wider 
               transition-all duration-300 overflow-hidden group
               hover:shadow-[0_0_30px_rgba(220,38,38,0.5)]
               disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span class="relative z-10">
          {isSubmitting ? 'DEPLOYING...' : post ? 'UPDATE POST' : 'DEPLOY POST'}
        </span>
        <div class="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 
                    translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
        
        {#if isSubmitting}
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        {/if}
      </button>
      
      <button
        type="button"
        on:click={onCancel}
        disabled={isSubmitting}
        class="px-8 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 
               hover:border-gray-600 font-black uppercase tracking-wider 
               transition-all duration-300 disabled:opacity-50"
      >
        ABORT
      </button>
    </div>
  </div>
  
  <!-- Corner decorations -->
  <div class="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gym-red/30"></div>
  <div class="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gym-red/30"></div>
  <div class="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gym-red/30"></div>
  <div class="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gym-red/30"></div>
</form>

<style>
  /* Textarea custom scrollbar */
  textarea::-webkit-scrollbar {
    width: 6px;
  }
  
  textarea::-webkit-scrollbar-track {
    background: rgba(31, 41, 55, 0.5);
    border-radius: 3px;
  }
  
  textarea::-webkit-scrollbar-thumb {
    background: #DC2626;
    border-radius: 3px;
  }
  
  textarea::-webkit-scrollbar-thumb:hover {
    background: #b91c1c;
  }
</style>