<script lang="ts">
  import type { Post } from '$lib/types';
  
  export let post: Post | null = null;
  export let onSave: (post: Post) => void;
  export let onCancel: () => void;
  
  let formData = {
    title: post?.title || '',
    content: post?.content || '',
    imageURL: post?.imageURL || ''
  };
  
  function handleSubmit(e: Event) {
    e.preventDefault();
    
    const newPost: Post = {
      id: post?.id || Date.now().toString(),
      title: formData.title,
      content: formData.content,
      date: new Date(),
      imageURL: formData.imageURL || undefined
    };
    
    onSave(newPost);
  }
</script>

<form on:submit={handleSubmit} class="bg-gray-900 rounded-lg p-6 border border-gray-800">
  <h3 class="text-xl font-bold mb-4">
    {post ? 'Edit Post' : 'Create New Post'}
  </h3>
  
  <div class="space-y-4">
    <div>
      <label for="title" class="block text-sm font-medium mb-2">Title</label>
      <input
        type="text"
        id="title"
        bind:value={formData.title}
        required
        class="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:border-gym-red focus:outline-none"
      />
    </div>
    
    <div>
      <label for="content" class="block text-sm font-medium mb-2">Content</label>
      <textarea
        id="content"
        bind:value={formData.content}
        required
        rows="4"
        class="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:border-gym-red focus:outline-none resize-none"
      ></textarea>
    </div>
    
    <div>
      <label for="imageURL" class="block text-sm font-medium mb-2">Image URL (optional)</label>
      <input
        type="url"
        id="imageURL"
        bind:value={formData.imageURL}
        class="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:border-gym-red focus:outline-none"
        placeholder="https://example.com/image.jpg"
      />
    </div>
    
    <div class="flex gap-4">
      <button
        type="submit"
        class="px-6 py-3 bg-gym-red hover:bg-red-700 rounded-lg font-bold transition-colors"
      >
        {post ? 'Update Post' : 'Create Post'}
      </button>
      <button
        type="button"
        on:click={onCancel}
        class="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg font-bold transition-colors"
      >
        Cancel
      </button>
    </div>
  </div>
</form>