<script lang="ts">
  import type { Post } from '$lib/types';
  
  export let post: Post;
  export let showActions = false;
  export let onDelete: ((id: string) => void) | undefined = undefined;
  export let onEdit: ((post: Post) => void) | undefined = undefined;
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
</script>

<article class="group relative futuristic-card border border-gray-800 overflow-hidden 
                hover:border-gym-red/50 transition-all duration-500">
  <!-- Background gradient on hover -->
  <div class="absolute inset-0 bg-gradient-to-br from-gym-red/10 to-transparent 
              opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
  
  {#if post.imageURL}
    <div class="relative h-48 overflow-hidden">
      <img 
        src={post.imageURL} 
        alt={post.title}
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
      
      <!-- Date badge -->
      <div class="absolute top-4 right-4 px-3 py-1 bg-black/80 backdrop-blur 
                  border border-gym-red/50 rounded text-xs font-bold tracking-wider">
        {formatDate(post.date)}
      </div>
    </div>
  {/if}
  
  <div class="relative p-6 space-y-4">
    {#if !post.imageURL}
      <div class="text-xs font-bold tracking-wider text-gym-red uppercase">
        {formatDate(post.date)}
      </div>
    {/if}
    
    <h3 class="text-xl font-black uppercase group-hover:text-gym-red transition-colors duration-300">
      {post.title}
    </h3>
    
    <p class="text-gray-400 line-clamp-3 text-sm leading-relaxed">
      {post.content}
    </p>
    
    <!-- Read more indicator -->
    <div class="flex items-center gap-2 text-gym-red text-sm font-bold 
                opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <span>Access Intel</span>
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </div>
    
    {#if showActions}
      <div class="flex gap-3 pt-4 border-t border-gray-800">
        <button 
          on:click={() => onEdit?.(post)}
          class="flex-1 px-4 py-2 bg-blue-600/20 border border-blue-600/50 
                 hover:bg-blue-600 hover:border-blue-600 rounded 
                 text-sm font-bold uppercase tracking-wider transition-all duration-300"
        >
          Modify
        </button>
        <button 
          on:click={() => onDelete?.(post.id)}
          class="flex-1 px-4 py-2 bg-red-600/20 border border-red-600/50 
                 hover:bg-red-600 hover:border-red-600 rounded 
                 text-sm font-bold uppercase tracking-wider transition-all duration-300"
        >
          Terminate
        </button>
      </div>
    {/if}
  </div>
  
  <!-- Corner accent -->
  <div class="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-gym-red/30"></div>
</article>