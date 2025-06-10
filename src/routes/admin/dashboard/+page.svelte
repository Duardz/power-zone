<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { signOut } from 'firebase/auth';
  import { collection, query, getDocs, deleteDoc, doc, addDoc, updateDoc } from 'firebase/firestore';
  import { auth, db } from '$lib/firebase';
  import PostCard from '$lib/components/PostCard.svelte';
  import AdminPostForm from '$lib/components/AdminPostForm.svelte';
  import DashboardOverview from '$lib/components/DashboardOverview.svelte';
  import type { Post, ContactMessage } from '$lib/types';
  
  let posts: Post[] = [];
  let messages: ContactMessage[] = [];
  let isLoading = true;
  let showPostForm = false;
  let editingPost: Post | null = null;
  
  // For demo purposes, using dummy data
  onMount(async () => {
    // Check auth (simulate for now)
    // const user = auth.currentUser;
    // if (!user) {
    //   goto('/admin/login');
    //   return;
    // }
    
    // Load dummy data for demo
    posts = [
      {
        id: '1',
        title: 'New HIIT Classes Starting',
        content: 'Join our high-intensity interval training sessions.',
        date: new Date('2025-01-15'),
      },
      {
        id: '2',
        title: 'Nutrition Workshop',
        content: 'Learn about sports nutrition this weekend.',
        date: new Date('2025-01-10'),
      }
    ];
    
    messages = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Interested in membership',
        timestamp: new Date('2025-01-14')
      }
    ];
    
    isLoading = false;
  });
  
  async function handleLogout() {
    try {
      // await signOut(auth);
      goto('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
  
  async function handleDeletePost(id: string) {
    if (!confirm('Are you sure you want to delete this post?')) return;
    
    try {
      // await deleteDoc(doc(db, 'posts', id));
      posts = posts.filter(p => p.id !== id);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  }
  
  function handleEditPost(post: Post) {
    editingPost = post;
    showPostForm = true;
  }
  
  function handlePostSaved(post: Post) {
    if (editingPost) {
      posts = posts.map(p => p.id === post.id ? post : p);
    } else {
      posts = [post, ...posts];
    }
    showPostForm = false;
    editingPost = null;
  }
</script>

<svelte:head>
  <title>Admin Dashboard - Power Zone Gym</title>
</svelte:head>

<div class="min-h-screen bg-gray-950">
  <!-- Admin Header -->
  <header class="bg-black border-b border-gray-800">
    <div class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold">
          <span class="text-gym-red">POWER ZONE</span> Admin
        </h1>
        <div class="flex items-center gap-4">
          <a href="/" class="text-gray-400 hover:text-white transition-colors">
            View Site
          </a>
          <button
            on:click={handleLogout}
            class="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </header>
  
  <main class="container mx-auto px-4 py-8">
    {#if isLoading}
      <div class="flex justify-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gym-red"></div>
      </div>
    {:else}
      <!-- Overview -->
      <DashboardOverview {posts} {messages} />
      
      <!-- Posts Section -->
      <section class="mt-12">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-3xl font-bold">Posts</h2>
          <button
            on:click={() => { showPostForm = true; editingPost = null; }}
            class="px-6 py-3 bg-gym-red hover:bg-red-700 rounded-lg font-bold transition-colors"
          >
            + New Post
          </button>
        </div>
        
        {#if showPostForm}
          <div class="mb-8">
            <AdminPostForm 
              post={editingPost}
              onSave={handlePostSaved}
              onCancel={() => { showPostForm = false; editingPost = null; }}
            />
          </div>
        {/if}
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {#each posts as post}
            <PostCard 
              {post} 
              showActions={true}
              onDelete={handleDeletePost}
              onEdit={handleEditPost}
            />
          {/each}
        </div>
      </section>
      
      <!-- Messages Section -->
      <section class="mt-12">
        <h2 class="text-3xl font-bold mb-6">Recent Messages</h2>
        <div class="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
          <table class="w-full">
            <thead class="bg-black">
              <tr>
                <th class="px-6 py-3 text-left">Name</th>
                <th class="px-6 py-3 text-left">Email</th>
                <th class="px-6 py-3 text-left">Message</th>
                <th class="px-6 py-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {#each messages as message}
                <tr class="border-t border-gray-800">
                  <td class="px-6 py-4">{message.name}</td>
                  <td class="px-6 py-4">{message.email}</td>
                  <td class="px-6 py-4">{message.message}</td>
                  <td class="px-6 py-4">
                    {new Date(message.timestamp).toLocaleDateString()}
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </section>
    {/if}
  </main>
</div>