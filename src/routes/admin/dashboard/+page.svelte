<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { signOut } from 'firebase/auth';
  import { collection, query, orderBy, getDocs, deleteDoc, doc, addDoc, updateDoc } from 'firebase/firestore';
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
  let activeTab = 'overview';
  let mounted = false;
  let currentUser: any = null;
  
  onMount(() => {
    mounted = true;
    
    // Check authentication
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        goto('/admin/login');
        return;
      }
      
      currentUser = user;
      await loadData();
    });
    
    return () => unsubscribe();
  });
  
  async function loadData() {
    try {
      // Load posts
      const postsQuery = query(collection(db, 'posts'), orderBy('date', 'desc'));
      const postsSnapshot = await getDocs(postsQuery);
      posts = postsSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title,
          content: data.content,
          imageURL: data.imageURL,
          date: data.date?.toDate ? data.date.toDate() : new Date(data.date)
        } as Post;
      });
      
      // Load messages
      const messagesQuery = query(collection(db, 'messages'), orderBy('timestamp', 'desc'));
      const messagesSnapshot = await getDocs(messagesQuery);
      messages = messagesSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          email: data.email,
          phone: data.phone,
          message: data.message,
          interest: data.interest,
          timestamp: data.timestamp?.toDate ? data.timestamp.toDate() : new Date(data.timestamp),
          read: data.read || false
        } as ContactMessage;
      });
      
      isLoading = false;
    } catch (error) {
      console.error('Error loading data:', error);
      isLoading = false;
    }
  }
  
  async function handleLogout() {
    try {
      await signOut(auth);
      goto('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
  
  async function handleDeletePost(id: string) {
    if (!confirm('Are you sure you want to delete this post?')) return;
    
    try {
      await deleteDoc(doc(db, 'posts', id));
      posts = posts.filter(p => p.id !== id);
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post. Please try again.');
    }
  }
  
  function handleEditPost(post: Post) {
    editingPost = post;
    showPostForm = true;
    activeTab = 'posts';
  }
  
  async function handlePostSaved(post: Post) {
    try {
      if (editingPost && editingPost.id) {
        // Update existing post
        await updateDoc(doc(db, 'posts', editingPost.id), {
          title: post.title,
          content: post.content,
          imageURL: post.imageURL,
          date: post.date
        });
        posts = posts.map(p => p.id === editingPost!.id ? { ...post, id: editingPost!.id } : p);
      } else {
        // Create new post
        const docRef = await addDoc(collection(db, 'posts'), {
          title: post.title,
          content: post.content,
          imageURL: post.imageURL,
          date: post.date
        });
        posts = [{ ...post, id: docRef.id }, ...posts];
      }
      showPostForm = false;
      editingPost = null;
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Failed to save post. Please try again.');
    }
  }
  
  async function markMessageAsRead(messageId: string) {
    try {
      await updateDoc(doc(db, 'messages', messageId), { read: true });
      messages = messages.map(m => m.id === messageId ? { ...m, read: true } : m);
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  }
</script>

<svelte:head>
  <title>Admin Dashboard - PowerZone Control Center</title>
</svelte:head>

<div class="min-h-screen bg-black">
  <!-- Admin Header -->
  <header class="bg-black/50 backdrop-blur-xl border-b border-gray-800 sticky top-0 z-40">
    <div class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-6">
          <h1 class="text-2xl font-black">
            <span class="text-gym-red glow-text">CONTROL</span> CENTER
          </h1>
          
          <!-- Status Indicator -->
          <div class="hidden md:flex items-center gap-2 px-3 py-1 bg-green-500/10 
                      border border-green-500/30 rounded-full">
            <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span class="text-xs font-bold uppercase tracking-wider text-green-500">
              System Online
            </span>
          </div>
        </div>
        
        <div class="flex items-center gap-4">
          {#if currentUser}
            <span class="text-xs text-gray-400 hidden md:block">
              Logged in as: {currentUser.email}
            </span>
          {/if}
          <button
            on:click={() => goto('/')}
            class="px-4 py-2 text-gray-400 hover:text-white transition-colors text-sm font-bold 
                   uppercase tracking-wider"
          >
            Main Site
          </button>
          <button
            on:click={handleLogout}
            class="px-4 py-2 bg-gray-900 hover:bg-gym-red border border-gray-800 
                   hover:border-gym-red rounded text-sm font-bold uppercase tracking-wider 
                   transition-all duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </header>
  
  <main class="container mx-auto px-4 py-8">
    {#if isLoading}
      <div class="flex flex-col items-center justify-center py-32">
        <div class="relative">
          <div class="w-20 h-20 border-4 border-gray-800 rounded-full"></div>
          <div class="absolute top-0 left-0 w-20 h-20 border-4 border-gym-red rounded-full 
                      border-t-transparent animate-spin"></div>
        </div>
        <p class="mt-4 text-gray-400 font-bold uppercase tracking-wider animate-pulse">
          Loading System...
        </p>
      </div>
    {:else}
      <!-- Navigation Tabs -->
      <div class="flex gap-1 p-1 bg-gray-900 rounded-lg border border-gray-800 mb-8 
                  overflow-x-auto {mounted ? 'animate-slide-up' : ''}">
        {#each ['overview', 'posts', 'messages', 'analytics'] as tab}
          <button
            on:click={() => activeTab = tab}
            class="flex-1 min-w-[120px] py-3 px-6 rounded-md font-bold text-sm uppercase 
                   tracking-wider transition-all duration-300
                   {activeTab === tab 
                     ? 'bg-gym-red text-white shadow-[0_0_20px_rgba(220,38,38,0.5)]' 
                     : 'text-gray-400 hover:text-white hover:bg-gray-800'}"
          >
            {tab}
          </button>
        {/each}
      </div>
      
      <!-- Tab Content -->
      <div class="{mounted ? 'animate-slide-up' : ''}" style="animation-delay: 0.1s">
        {#if activeTab === 'overview'}
          <!-- Overview Tab -->
          <DashboardOverview {posts} {messages} />
          
          <!-- Quick Stats Grid -->
          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {#each [
              { label: 'Total Posts', value: posts.length, change: 'Live', icon: '📝' },
              { label: 'New Messages', value: messages.filter(m => !m.read).length, change: 'Unread', icon: '💬' },
              { label: 'Total Messages', value: messages.length, change: 'All Time', icon: '📨' },
              { label: 'Last Update', value: 'Today', change: new Date().toLocaleDateString(), icon: '🕐' }
            ] as stat}
              <div class="futuristic-card p-6 border border-gray-800 hover:border-gym-red/50 
                          transition-all duration-300 group">
                <div class="flex items-start justify-between mb-4">
                  <div class="text-3xl">{stat.icon}</div>
                  <span class="text-xs font-bold text-gray-500 uppercase">{stat.change}</span>
                </div>
                <p class="text-3xl font-black text-white mb-1">{stat.value}</p>
                <p class="text-sm text-gray-400 uppercase tracking-wider">{stat.label}</p>
              </div>
            {/each}
          </div>
          
        {:else if activeTab === 'posts'}
          <!-- Posts Tab -->
          <section>
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-3xl font-black">
                CONTENT <span class="text-gym-red">MANAGEMENT</span>
              </h2>
              <button
                on:click={() => { showPostForm = true; editingPost = null; }}
                class="px-6 py-3 bg-gym-red hover:bg-red-700 font-black uppercase tracking-wider 
                       transition-all duration-300 hover:shadow-[0_0_30px_rgba(220,38,38,0.5)]"
              >
                + Deploy New Post
              </button>
            </div>
            
            {#if showPostForm}
              <div class="mb-8 animate-slide-up">
                <AdminPostForm 
                  post={editingPost}
                  onSave={handlePostSaved}
                  onCancel={() => { showPostForm = false; editingPost = null; }}
                />
              </div>
            {/if}
            
            {#if posts.length === 0}
              <div class="text-center py-20 futuristic-card border border-gray-800">
                <p class="text-gray-400 mb-4">No posts yet</p>
                <button
                  on:click={() => { showPostForm = true; editingPost = null; }}
                  class="px-6 py-3 bg-gym-red/20 border border-gym-red/50 hover:bg-gym-red 
                         hover:border-gym-red rounded font-bold uppercase tracking-wider 
                         transition-all duration-300"
                >
                  Create First Post
                </button>
              </div>
            {:else}
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
            {/if}
          </section>
          
        {:else if activeTab === 'messages'}
          <!-- Messages Tab -->
          <section>
            <h2 class="text-3xl font-black mb-6">
              INCOMING <span class="text-gym-red">TRANSMISSIONS</span>
            </h2>
            
            {#if messages.length === 0}
              <div class="text-center py-20 futuristic-card border border-gray-800">
                <p class="text-gray-400">No messages yet</p>
              </div>
            {:else}
              <div class="space-y-4">
                {#each messages as message}
                  <div class="futuristic-card p-6 border border-gray-800 hover:border-gym-red/50 
                              transition-all duration-300 {!message.read ? 'border-l-4 border-l-gym-red' : ''}">
                    <div class="flex items-start justify-between mb-4">
                      <div>
                        <div class="flex items-center gap-3 mb-1">
                          <h3 class="font-bold text-lg">{message.name}</h3>
                          {#if !message.read}
                            <span class="px-2 py-1 bg-gym-red/20 border border-gym-red/50 rounded-full 
                                         text-xs font-bold text-gym-red uppercase">
                              New
                            </span>
                          {/if}
                        </div>
                        <p class="text-gym-red text-sm">{message.email}</p>
                        {#if message.phone}
                          <p class="text-gray-400 text-sm">{message.phone}</p>
                        {/if}
                      </div>
                      <div class="text-right">
                        <span class="text-xs text-gray-400 uppercase tracking-wider">
                          {new Date(message.timestamp).toLocaleDateString()}
                        </span>
                        <p class="text-xs text-gray-500">
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    
                    <div class="mb-4">
                      <span class="text-xs font-bold text-gray-400 uppercase">Interest: </span>
                      <span class="text-sm text-gray-300">{message.interest}</span>
                    </div>
                    
                    <p class="text-gray-300 mb-4">{message.message}</p>
                    
                    <div class="flex gap-3">
                      {#if !message.read}
                        <button 
                          on:click={() => markMessageAsRead(message.id!)}
                          class="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded text-sm 
                                 font-bold uppercase tracking-wider transition-all duration-300"
                        >
                          Mark as Read
                        </button>
                      {/if}
                      <a 
                        href="mailto:{message.email}"
                        class="px-4 py-2 bg-gym-red/20 hover:bg-gym-red border border-gym-red/50 
                               hover:border-gym-red rounded text-sm font-bold uppercase 
                               tracking-wider transition-all duration-300"
                      >
                        Reply
                      </a>
                    </div>
                  </div>
                {/each}
              </div>
            {/if}
          </section>
          
        {:else if activeTab === 'analytics'}
          <!-- Analytics Tab -->
          <section>
            <h2 class="text-3xl font-black mb-6">
              PERFORMANCE <span class="text-gym-red">METRICS</span>
            </h2>
            
            <div class="futuristic-card p-8 border border-gray-800 text-center">
              <div class="max-w-md mx-auto">
                <div class="text-6xl mb-4">📊</div>
                <h3 class="text-2xl font-bold mb-2">Analytics Module</h3>
                <p class="text-gray-400 mb-6">
                  Advanced analytics and reporting features coming soon. 
                  Track member engagement, revenue metrics, and growth patterns.
                </p>
                <div class="inline-flex items-center gap-2 px-4 py-2 bg-gym-red/20 
                            border border-gym-red/50 rounded-full">
                  <div class="w-2 h-2 bg-gym-red rounded-full animate-pulse"></div>
                  <span class="text-sm font-bold uppercase tracking-wider text-gym-red">
                    In Development
                  </span>
                </div>
              </div>
            </div>
          </section>
        {/if}
      </div>
    {/if}
  </main>
</div>