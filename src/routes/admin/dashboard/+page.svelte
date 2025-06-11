<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { signOut, onAuthStateChanged, type User } from 'firebase/auth';
  import { 
    collection, 
    query, 
    orderBy, 
    getDocs, 
    deleteDoc, 
    doc, 
    addDoc, 
    updateDoc, 
    serverTimestamp,
    Timestamp,
    type DocumentData 
  } from 'firebase/firestore';
  import { isFirebaseReady, getFirebaseAuth, getFirebaseDb } from '$lib/firebase';
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
  let currentUser: User | null = null;
  let firebaseInitialized = false;
  
  onMount(() => {
    mounted = true;
    
    // Wait for Firebase to be ready
    const checkFirebase = setInterval(() => {
      if (isFirebaseReady()) {
        firebaseInitialized = true;
        clearInterval(checkFirebase);
        initializeAuth();
      }
    }, 100);
    
    // Timeout after 5 seconds
    setTimeout(() => {
      if (!firebaseInitialized) {
        clearInterval(checkFirebase);
        console.error('Firebase initialization timeout');
        goto('/admin/login');
      }
    }, 5000);
    
    return () => {
      if (checkFirebase) clearInterval(checkFirebase);
    };
  });
  
  function initializeAuth() {
    if (!isFirebaseReady()) {
      console.error('Firebase not initialized');
      goto('/admin/login');
      return;
    }
    
    const auth = getFirebaseAuth();
    
    // Check authentication
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        goto('/admin/login');
        return;
      }
      
      currentUser = user;
      await loadData();
    });
    
    return () => unsubscribe();
  }
  
  async function loadData() {
    if (!isFirebaseReady()) {
      isLoading = false;
      return;
    }
    
    try {
      const db = getFirebaseDb();
      
      // Load posts
      const postsQuery = query(collection(db, 'posts'), orderBy('date', 'desc'));
      const postsSnapshot = await getDocs(postsQuery);
      posts = postsSnapshot.docs.map(docSnapshot => {
        const data = docSnapshot.data();
        return {
          id: docSnapshot.id,
          title: data.title || 'Untitled',
          content: data.content || '',
          imageURL: data.imageURL,
          date: convertToDate(data.date)
        } as Post;
      });
      
      // Load messages
      const messagesQuery = query(collection(db, 'messages'), orderBy('timestamp', 'desc'));
      const messagesSnapshot = await getDocs(messagesQuery);
      messages = messagesSnapshot.docs.map(docSnapshot => {
        const data = docSnapshot.data();
        return {
          id: docSnapshot.id,
          name: data.name || 'Anonymous',
          email: data.email || '',
          phone: data.phone,
          message: data.message || '',
          interest: data.interest || 'general',
          timestamp: convertToDate(data.timestamp),
          read: data.read || false
        } as ContactMessage;
      });
      
      isLoading = false;
    } catch (error) {
      console.error('Error loading data:', error);
      isLoading = false;
    }
  }
  
  // Helper function to safely convert Firestore timestamps
  function convertToDate(timestamp: any): Date {
    if (!timestamp) return new Date();
    if (timestamp instanceof Timestamp) {
      return timestamp.toDate();
    }
    if (timestamp.toDate && typeof timestamp.toDate === 'function') {
      return timestamp.toDate();
    }
    if (timestamp instanceof Date) {
      return timestamp;
    }
    return new Date(timestamp);
  }
  
  async function handleLogout() {
    if (!isFirebaseReady()) {
      goto('/admin/login');
      return;
    }
    
    try {
      const auth = getFirebaseAuth();
      await signOut(auth);
      goto('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
      alert('Failed to logout. Please try again.');
    }
  }
  
  async function handleDeletePost(id: string) {
    if (!confirm('Are you sure you want to delete this post?')) return;
    
    if (!isFirebaseReady()) {
      alert('Firebase not initialized');
      return;
    }
    
    try {
      const db = getFirebaseDb();
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
    if (!isFirebaseReady()) {
      alert('Firebase not initialized');
      return;
    }
    
    try {
      const db = getFirebaseDb();
      
      const postData: DocumentData = {
        title: post.title.trim().slice(0, 200),
        content: post.content.trim().slice(0, 5000),
        imageURL: post.imageURL?.trim() || null,
        date: Timestamp.fromDate(post.date),
        updatedAt: serverTimestamp()
      };
      
      if (editingPost && editingPost.id) {
        // Update existing post
        await updateDoc(doc(db, 'posts', editingPost.id), postData);
        posts = posts.map(p => p.id === editingPost!.id ? { ...post, id: editingPost!.id } : p);
      } else {
        // Create new post
        postData.createdAt = serverTimestamp();
        const docRef = await addDoc(collection(db, 'posts'), postData);
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
    if (!isFirebaseReady()) return;
    
    try {
      const db = getFirebaseDb();
      await updateDoc(doc(db, 'messages', messageId), { 
        read: true,
        readAt: serverTimestamp()
      });
      messages = messages.map(m => m.id === messageId ? { ...m, read: true } : m);
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  }
  
  async function handleDeleteMessage(messageId: string) {
    if (!confirm('Are you sure you want to delete this message?')) return;
    
    if (!isFirebaseReady()) return;
    
    try {
      const db = getFirebaseDb();
      await deleteDoc(doc(db, 'messages', messageId));
      messages = messages.filter(m => m.id !== messageId);
    } catch (error) {
      console.error('Error deleting message:', error);
      alert('Failed to delete message. Please try again.');
    }
  }
  
  // Refresh data
  async function refreshData() {
    isLoading = true;
    await loadData();
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
          <!-- svelte-ignore a11y_consider_explicit_label -->
          <button
            on:click={refreshData}
            disabled={isLoading}
            class="px-4 py-2 text-gray-400 hover:text-white transition-colors text-sm font-bold 
                   uppercase tracking-wider disabled:opacity-50"
            title="Refresh data"
          >
            <svg class="w-5 h-5 {isLoading ? 'animate-spin' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
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
    {#if isLoading && !posts.length && !messages.length}
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
            {#if tab === 'messages' && messages.filter(m => !m.read).length > 0}
              <span class="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                {messages.filter(m => !m.read).length}
              </span>
            {/if}
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
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-3xl font-black">
                INCOMING <span class="text-gym-red">TRANSMISSIONS</span>
              </h2>
              <div class="flex items-center gap-4">
                <span class="text-sm text-gray-400">
                  {messages.filter(m => !m.read).length} unread of {messages.length} total
                </span>
              </div>
            </div>
            
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
                                         text-xs font-bold text-gym-red uppercase animate-pulse">
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
                      <span class="text-sm text-gray-300 capitalize">{(message.interest || 'general').replace('_', ' ')}</span>
                    </div>
                    
                    <p class="text-gray-300 mb-4 whitespace-pre-wrap">{message.message}</p>
                    
                    <div class="flex gap-3">
                      {#if !message.read}
                        <button 
                          on:click={() => message.id && markMessageAsRead(message.id)}
                          class="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded text-sm 
                                 font-bold uppercase tracking-wider transition-all duration-300"
                        >
                          Mark as Read
                        </button>
                      {/if}
                      <a 
                        href="mailto:{message.email}?subject=Re: PowerZone Inquiry - {message.interest}"
                        class="px-4 py-2 bg-gym-red/20 hover:bg-gym-red border border-gym-red/50 
                               hover:border-gym-red rounded text-sm font-bold uppercase 
                               tracking-wider transition-all duration-300"
                      >
                        Reply
                      </a>
                      <button 
                        on:click={() => message.id && handleDeleteMessage(message.id)}
                        class="px-4 py-2 bg-red-900/20 hover:bg-red-900/40 border border-red-900/50 
                               hover:border-red-700 rounded text-sm font-bold uppercase 
                               tracking-wider transition-all duration-300 ml-auto"
                      >
                        Delete
                      </button>
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
            
            <!-- Time Period Stats -->
            <div class="grid md:grid-cols-3 gap-6 mb-8">
              {#each [
                { 
                  label: 'Messages This Month', 
                  value: messages.filter(m => {
                    const msgDate = new Date(m.timestamp);
                    const now = new Date();
                    return msgDate.getMonth() === now.getMonth() && msgDate.getFullYear() === now.getFullYear();
                  }).length,
                  icon: '📅'
                },
                { 
                  label: 'Response Rate', 
                  value: messages.length > 0 ? `${Math.round((messages.filter(m => m.read).length / messages.length) * 100)}%` : '0%',
                  icon: '📊'
                },
                { 
                  label: 'Avg Daily Messages', 
                  value: messages.length > 0 ? (messages.length / 30).toFixed(1) : '0',
                  icon: '📈'
                }
              ] as stat}
                <div class="futuristic-card p-6 border border-gray-800">
                  <div class="text-3xl mb-3">{stat.icon}</div>
                  <p class="text-2xl font-black text-white mb-1">{stat.value}</p>
                  <p class="text-sm text-gray-400 uppercase tracking-wider">{stat.label}</p>
                </div>
              {/each}
            </div>
            
            <!-- Interest Trends -->
            <div class="futuristic-card p-6 border border-gray-800 mb-8">
              <h3 class="text-xl font-black mb-4">POPULAR INTERESTS</h3>
              <div class="space-y-4">
                {#each Object.entries(
                  messages.reduce((acc, msg) => {
                    const interest = msg.interest || 'general';
                    acc[interest] = (acc[interest] || 0) + 1;
                    return acc;
                  }, {} as Record<string, number>)
                ).sort((a, b) => b[1] - a[1]).slice(0, 5) as [interest, count]}
                  <div>
                    <div class="flex justify-between mb-2">
                      <span class="font-bold capitalize">{interest.replace(/_/g, ' ')}</span>
                      <span class="text-gym-red">{count} inquiries</span>
                    </div>
                    <div class="w-full bg-gray-800 rounded-full h-3">
                      <div 
                        class="bg-gradient-to-r from-gym-red to-red-600 h-3 rounded-full transition-all duration-500"
                        style="width: {(count / messages.length) * 100}%"
                      ></div>
                    </div>
                  </div>
                {/each}
              </div>
            </div>
            
            <!-- Content Performance -->
            <div class="futuristic-card p-6 border border-gray-800">
              <h3 class="text-xl font-black mb-4">CONTENT INSIGHTS</h3>
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 class="font-bold text-gray-400 mb-3">POST FREQUENCY</h4>
                  <div class="space-y-2">
                    <div class="flex justify-between">
                      <span>Total Posts</span>
                      <span class="font-bold">{posts.length}</span>
                    </div>
                    <div class="flex justify-between">
                      <span>This Month</span>
                      <span class="font-bold">
                        {posts.filter(p => {
                          const postDate = new Date(p.date);
                          const now = new Date();
                          return postDate.getMonth() === now.getMonth() && postDate.getFullYear() === now.getFullYear();
                        }).length}
                      </span>
                    </div>
                    <div class="flex justify-between">
                      <span>With Images</span>
                      <span class="font-bold">{posts.filter(p => p.imageURL).length}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 class="font-bold text-gray-400 mb-3">ENGAGEMENT TIPS</h4>
                  <ul class="space-y-2 text-sm">
                    <li class="flex items-start gap-2">
                      <span class="text-gym-red">•</span>
                      <span>Post 2-3 times per week for best engagement</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="text-gym-red">•</span>
                      <span>Include images to increase visibility</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="text-gym-red">•</span>
                      <span>Respond to messages within 24 hours</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        {/if}
      </div>
    {/if}
  </main>
</div>

<style>
  .glow-text {
    text-shadow: 0 0 10px rgba(220, 38, 38, 0.8);
  }
  
  .futuristic-card {
    background: linear-gradient(135deg, rgba(31, 41, 55, 0.1) 0%, rgba(17, 24, 39, 0.1) 100%);
    backdrop-filter: blur(10px);
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
  
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  
  .animate-spin {
    animation: spin 1s linear infinite;
  }
</style>