<script lang="ts">
  import type { Post, ContactMessage } from '$lib/types';
  
  export let posts: Post[];
  export let messages: ContactMessage[];
</script>

<div class="grid md:grid-cols-3 gap-6 mb-12">
  <div class="bg-gray-900 rounded-lg p-6 border border-gray-800">
    <h3 class="text-gray-400 text-sm font-medium mb-2">Total Posts</h3>
    <p class="text-4xl font-bold text-gym-red">{posts.length}</p>
  </div>
  
  <div class="bg-gray-900 rounded-lg p-6 border border-gray-800">
    <h3 class="text-gray-400 text-sm font-medium mb-2">Messages</h3>
    <p class="text-4xl font-bold text-gym-red">{messages.length}</p>
  </div>
  
  <div class="bg-gray-900 rounded-lg p-6 border border-gray-800">
    <h3 class="text-gray-400 text-sm font-medium mb-2">Last Update</h3>
    <p class="text-xl font-bold">
      {new Date().toLocaleDateString()}
    </p>
  </div>
</div>