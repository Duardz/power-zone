<script lang="ts">
  import type { Post, ContactMessage } from '$lib/types';
  
  export let posts: Post[] = [];
  export let messages: ContactMessage[] = [];
  
  // Calculate statistics
  $: unreadMessages = messages.filter(m => !m.read);
  $: todayMessages = messages.filter(m => {
    const today = new Date();
    const msgDate = new Date(m.timestamp);
    return msgDate.toDateString() === today.toDateString();
  });
  
  $: messagesByInterest = messages.reduce((acc, msg) => {
    const interest = msg.interest || 'general';
    acc[interest] = (acc[interest] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  $: recentPosts = posts.slice(0, 5);
  
  // Get this week's messages
  $: weekMessages = messages.filter(m => {
    const msgDate = new Date(m.timestamp);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return msgDate >= weekAgo;
  });
  
  // Format interest labels
  function formatInterest(interest: string): string {
    return interest.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }
</script>

<div class="space-y-8">
  <!-- Welcome Section -->
  <div class="text-center py-8">
    <h1 class="text-4xl font-black mb-2">
      WELCOME TO <span class="text-gym-red">COMMAND CENTER</span>
    </h1>
    <p class="text-gray-400">
      {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
    </p>
  </div>
  
  <!-- Activity Overview -->
  <div class="grid md:grid-cols-2 gap-6">
    <!-- Recent Messages Card -->
    <div class="futuristic-card p-6 border border-gray-800">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-xl font-black">RECENT ACTIVITY</h3>
        <span class="px-3 py-1 bg-gym-red/20 border border-gym-red/50 rounded-full text-xs font-bold text-gym-red">
          LIVE
        </span>
      </div>
      
      {#if unreadMessages.length > 0}
        <div class="mb-4 p-4 bg-gym-red/10 border border-gym-red/30 rounded-lg">
          <p class="text-gym-red font-bold">
            🔔 You have {unreadMessages.length} unread message{unreadMessages.length !== 1 ? 's' : ''}
          </p>
        </div>
      {/if}
      
      <div class="space-y-3">
        <div class="flex justify-between items-center py-2 border-b border-gray-800">
          <span class="text-gray-400">Today's Messages</span>
          <span class="font-bold text-white">{todayMessages.length}</span>
        </div>
        <div class="flex justify-between items-center py-2 border-b border-gray-800">
          <span class="text-gray-400">This Week</span>
          <span class="font-bold text-white">{weekMessages.length}</span>
        </div>
        <div class="flex justify-between items-center py-2">
          <span class="text-gray-400">Total Active Posts</span>
          <span class="font-bold text-white">{posts.length}</span>
        </div>
      </div>
    </div>
    
    <!-- Interest Breakdown Card -->
    <div class="futuristic-card p-6 border border-gray-800">
      <h3 class="text-xl font-black mb-4">INTEREST BREAKDOWN</h3>
      
      {#if Object.keys(messagesByInterest).length > 0}
        <div class="space-y-3">
          {#each Object.entries(messagesByInterest).sort((a, b) => b[1] - a[1]) as [interest, count]}
            <div class="relative">
              <div class="flex justify-between items-center mb-1">
                <span class="text-sm font-bold capitalize">{formatInterest(interest)}</span>
                <span class="text-sm text-gray-400">{count} inquiries</span>
              </div>
              <div class="w-full bg-gray-800 rounded-full h-2">
                <div 
                  class="bg-gym-red h-2 rounded-full transition-all duration-500"
                  style="width: {(count / messages.length) * 100}%"
                ></div>
              </div>
            </div>
          {/each}
        </div>
      {:else}
        <p class="text-gray-400 text-center py-8">No messages yet</p>
      {/if}
    </div>
  </div>
  
  <!-- Recent Posts Section -->
  <div class="futuristic-card p-6 border border-gray-800">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-xl font-black">RECENT POSTS</h3>
      <a href="/admin/dashboard?tab=posts" class="text-gym-red hover:text-red-400 text-sm font-bold uppercase">
        View All →
      </a>
    </div>
    
    {#if recentPosts.length > 0}
      <div class="grid gap-4">
        {#each recentPosts as post}
          <div class="flex items-center justify-between p-4 bg-black/50 border border-gray-800 rounded-lg 
                      hover:border-gym-red/50 transition-all duration-300">
            <div class="flex-1">
              <h4 class="font-bold text-white mb-1">{post.title}</h4>
              <p class="text-sm text-gray-400">
                Posted on {new Date(post.date).toLocaleDateString()}
              </p>
            </div>
            {#if post.imageURL}
              <div class="ml-4 w-16 h-16 bg-gray-800 rounded overflow-hidden flex-shrink-0">
                <img src={post.imageURL} alt="" class="w-full h-full object-cover" />
              </div>
            {/if}
          </div>
        {/each}
      </div>
    {:else}
      <p class="text-gray-400 text-center py-8">No posts yet</p>
    {/if}
  </div>
  
  <!-- Quick Actions -->
  <div class="grid md:grid-cols-3 gap-4">
    <a href="/admin/dashboard?tab=posts" 
       class="futuristic-card p-6 border border-gray-800 hover:border-gym-red/50 
              transition-all duration-300 text-center group">
      <div class="text-4xl mb-3">📝</div>
      <h4 class="font-bold text-white mb-1">Create New Post</h4>
      <p class="text-sm text-gray-400">Share updates with members</p>
    </a>
    
    <a href="/admin/dashboard?tab=messages" 
       class="futuristic-card p-6 border border-gray-800 hover:border-gym-red/50 
              transition-all duration-300 text-center group">
      <div class="text-4xl mb-3">💬</div>
      <h4 class="font-bold text-white mb-1">View Messages</h4>
      <p class="text-sm text-gray-400">
        {unreadMessages.length > 0 ? `${unreadMessages.length} unread` : 'All caught up!'}
      </p>
    </a>
    
    <a href="/" target="_blank"
       class="futuristic-card p-6 border border-gray-800 hover:border-gym-red/50 
              transition-all duration-300 text-center group">
      <div class="text-4xl mb-3">🌐</div>
      <h4 class="font-bold text-white mb-1">View Live Site</h4>
      <p class="text-sm text-gray-400">See what visitors see</p>
    </a>
  </div>
</div>

<style>
  .futuristic-card {
    background: linear-gradient(135deg, rgba(31, 41, 55, 0.1) 0%, rgba(17, 24, 39, 0.1) 100%);
    backdrop-filter: blur(10px);
  }
</style>