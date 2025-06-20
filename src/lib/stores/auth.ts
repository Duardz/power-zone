// src/lib/stores/auth.ts
import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';
import type { User } from 'firebase/auth';
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { getSecureAuth, isFirebaseReady, securityMonitor } from '$lib/firebase';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  lastActivity: number;
}

const AUTH_TIMEOUT = 30 * 60 * 1000; // 30 minutes

function createAuthStore() {
  const { subscribe, set, update } = writable<AuthState>({
    user: null,
    loading: true,
    error: null,
    lastActivity: Date.now()
  });
  
  let unsubscribe: (() => void) | null = null;
  let activityTimer: NodeJS.Timeout | null = null;
  
  // Monitor user activity
  function updateActivity() {
    update(state => ({ ...state, lastActivity: Date.now() }));
  }
  
  // Check for timeout
  function checkTimeout() {
    update(state => {
      const inactiveTime = Date.now() - state.lastActivity;
      if (state.user && inactiveTime > AUTH_TIMEOUT) {
        // Auto logout on timeout
        signOut();
        return { ...state, error: 'Session timed out for security' };
      }
      return state;
    });
  }
  
  // Initialize auth listener
  async function initialize() {
    if (!browser || !isFirebaseReady()) return;
    
    try {
      const auth = getSecureAuth();
      
      // Set up activity monitoring
      if (browser) {
        ['click', 'keypress', 'mousemove'].forEach(event => {
          document.addEventListener(event, updateActivity, { passive: true });
        });
        
        // Check timeout every minute
        activityTimer = setInterval(checkTimeout, 60000);
      }
      
      unsubscribe = onAuthStateChanged(auth, (user) => {
        // Additional security checks
        if (user) {
          // Verify user email domain for admin
          const allowedDomains = ['powerzone.gym'];
          const emailDomain = user.email?.split('@')[1];
          
          if (!emailDomain || !allowedDomains.includes(emailDomain)) {
            signOut();
            set({
              user: null,
              loading: false,
              error: 'Unauthorized access attempt',
              lastActivity: Date.now()
            });
            return;
          }
        }
        
        set({
          user,
          loading: false,
          error: null,
          lastActivity: Date.now()
        });
        
        securityMonitor.reset();
      }, (error) => {
        console.error('Auth state change error:', error);
        set({
          user: null,
          loading: false,
          error: 'Authentication error',
          lastActivity: Date.now()
        });
      });
    } catch (error) {
      set({
        user: null,
        loading: false,
        error: 'Failed to initialize authentication',
        lastActivity: Date.now()
      });
    }
  }
  
  // Secure sign out
  async function signOut() {
    try {
      const auth = getSecureAuth();
      await firebaseSignOut(auth);
      
      // Clear sensitive data
      if (browser) {
        // Clear any cached data
        sessionStorage.clear();
        
        // Revoke any service worker caches
        if ('caches' in window) {
          const cacheNames = await caches.keys();
          await Promise.all(
            cacheNames.map(name => caches.delete(name))
          );
        }
      }
    } catch (error) {
      console.error('Sign out error:', error);
    }
  }
  
  // Cleanup function
  function cleanup() {
    if (unsubscribe) unsubscribe();
    if (activityTimer) clearInterval(activityTimer);
    
    if (browser) {
      ['click', 'keypress', 'mousemove'].forEach(event => {
        document.removeEventListener(event, updateActivity);
      });
    }
  }
  
  if (browser) {
    initialize();
  }
  
  return {
    subscribe,
    signOut,
    cleanup,
    updateActivity
  };
}

export const authStore = createAuthStore();

// Derived store for authentication status
export const isAuthenticated = derived(
  authStore,
  $authStore => !!$authStore.user && !$authStore.loading
);

// Derived store for admin status
export const isAdmin = derived(
  authStore,
  $authStore => {
    if (!$authStore.user) return false;
    // Add additional admin checks here
    const adminEmails = ['admin@powerzone.gym'];
    return adminEmails.includes($authStore.user.email || '');
  }
);