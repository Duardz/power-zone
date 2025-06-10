<script lang="ts">
  import type { Post, ContactMessage } from '$lib/types';
  
  export let posts: Post[];
  export let messages: ContactMessage[];
  
  const stats = [
    { 
      label: 'Total Posts', 
      value: posts.length, 
      icon: '📝',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30'
    },
    { 
      label: 'New Messages', 
      value: messages.length, 
      icon: '💬',
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30'
    },
    { 
      label: 'System Status', 
      value: 'ACTIVE', 
      icon: '🚀',
      color: 'text-gym-red',
      bgColor: 'bg-gym-red/10',
      borderColor: 'border-gym-red/30'
    }
  ];
</script>

<div class="grid md:grid-cols-3 gap-6 mb-12">
  {#each stats as stat}
    <div class="group relative overflow-hidden">
      <div class="futuristic-card p-6 border border-gray-800 hover:border-gym-red/50 
                  transition-all duration-500">
        <!-- Background gradient on hover -->
        <div class="absolute inset-0 bg-gradient-to-br from-gym-red/5 to-transparent 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div class="relative">
          <div class="flex items-start justify-between mb-4">
            <div class="text-4xl">{stat.icon}</div>
            <div class="px-2 py-1 {stat.bgColor} border {stat.borderColor} rounded">
              <div class="w-2 h-2 {stat.color.replace('text', 'bg')} rounded-full animate-pulse"></div>
            </div>
          </div>
          
          <h3 class="text-sm font-bold uppercase tracking-wider text-gray-400 mb-2">
            {stat.label}
          </h3>
          
          <p class="text-4xl font-black {stat.color}">
            {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
          </p>
        </div>
        
        <!-- Decorative corner -->
        <div class="absolute top-0 right-0 w-16 h-16 border-t border-r {stat.borderColor} 
                    opacity-50"></div>
      </div>
    </div>
  {/each}
</div>

<!-- Activity Feed -->
<div class="futuristic-card p-6 border border-gray-800">
  <h3 class="text-xl font-black mb-4 flex items-center gap-2">
    <span class="text-gym-red">RECENT ACTIVITY</span>
    <div class="w-2 h-2 bg-gym-red rounded-full animate-pulse"></div>
  </h3>
  
  <div class="space-y-3">
    <div class="flex items-center gap-3 p-3 bg-gray-900 rounded-lg">
      <div class="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
        <span class="text-sm">📝</span>
      </div>
      <div class="flex-1">
        <p class="text-sm font-bold">New post published</p>
        <p class="text-xs text-gray-400">2 hours ago</p>
      </div>
    </div>
    
    <div class="flex items-center gap-3 p-3 bg-gray-900 rounded-lg">
      <div class="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
        <span class="text-sm">💬</span>
      </div>
      <div class="flex-1">
        <p class="text-sm font-bold">New contact message received</p>
        <p class="text-xs text-gray-400">5 hours ago</p>
      </div>
    </div>
    
    <div class="flex items-center gap-3 p-3 bg-gray-900 rounded-lg">
      <div class="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
        <span class="text-sm">👤</span>
      </div>
      <div class="flex-1">
        <p class="text-sm font-bold">New member registration</p>
        <p class="text-xs text-gray-400">1 day ago</p>
      </div>
    </div>
    
    <div class="flex items-center gap-3 p-3 bg-gray-900 rounded-lg">
      <div class="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center">
        <span class="text-sm">⚡</span>
      </div>
      <div class="flex-1">
        <p class="text-sm font-bold">System update completed</p>
        <p class="text-xs text-gray-400">2 days ago</p>
      </div>
    </div>
  </div>
  
  <!-- View All Link -->
  <div class="mt-6 pt-4 border-t border-gray-800">
    <button class="w-full py-2 text-center text-sm font-bold uppercase tracking-wider 
                   text-gym-red hover:text-white transition-colors">
      View All Activity →
    </button>
  </div>
</div>

<!-- Quick Actions -->
<div class="grid md:grid-cols-2 gap-6 mt-8">
  <!-- Quick Stats Chart -->
  <div class="futuristic-card p-6 border border-gray-800">
    <h3 class="text-lg font-black mb-4 text-gym-red">PERFORMANCE METRICS</h3>
    
    <!-- Simple bar chart visualization -->
    <div class="space-y-4">
      {#each [
        { label: 'Page Views', value: 85, color: 'bg-blue-500' },
        { label: 'Conversions', value: 65, color: 'bg-green-500' },
        { label: 'Engagement', value: 92, color: 'bg-purple-500' },
        { label: 'Retention', value: 78, color: 'bg-orange-500' }
      ] as metric}
        <div>
          <div class="flex justify-between text-sm mb-1">
            <span class="text-gray-400">{metric.label}</span>
            <span class="font-bold">{metric.value}%</span>
          </div>
          <div class="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div 
              class="{metric.color} h-full rounded-full transition-all duration-1000 ease-out"
              style="width: {metric.value}%"
            ></div>
          </div>
        </div>
      {/each}
    </div>
  </div>
  
  <!-- System Health -->
  <div class="futuristic-card p-6 border border-gray-800">
    <h3 class="text-lg font-black mb-4 text-gym-red">SYSTEM HEALTH</h3>
    
    <div class="space-y-3">
      {#each [
        { component: 'Database', status: 'Operational', statusColor: 'text-green-500' },
        { component: 'API Server', status: 'Operational', statusColor: 'text-green-500' },
        { component: 'CDN', status: 'Operational', statusColor: 'text-green-500' },
        { component: 'Email Service', status: 'Maintenance', statusColor: 'text-yellow-500' }
      ] as item}
        <div class="flex items-center justify-between p-3 bg-gray-900 rounded-lg">
          <span class="text-sm font-medium">{item.component}</span>
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 {item.statusColor.replace('text', 'bg')} rounded-full 
                        {item.status === 'Operational' ? 'animate-pulse' : 'animate-ping'}"></div>
            <span class="text-xs font-bold uppercase tracking-wider {item.statusColor}">
              {item.status}
            </span>
          </div>
        </div>
      {/each}
    </div>
    
    <div class="mt-4 pt-4 border-t border-gray-800">
      <p class="text-xs text-gray-500 text-center">
        Last checked: {new Date().toLocaleTimeString()}
      </p>
    </div>
  </div>
</div>