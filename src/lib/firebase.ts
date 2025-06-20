// src/lib/firebase.ts
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { browser } from '$app/environment';

// Use VITE_ prefix for environment variables per Vite convention
const firebaseConfig = Object.freeze({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID ?? '',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID ?? ''
});

function validateFirebaseConfig(config: typeof firebaseConfig): boolean {
  const requiredFields = ['apiKey', 'authDomain', 'projectId', 'appId'] as const;
  for (const field of requiredFields) {
    if (!config[field]) {
      console.error(`[Firebase] Missing required config field: ${field}`);
      return false;
    }
  }
  return true;
}

let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let db: Firestore | undefined;

// Security monitoring for failed auth attempts
export const securityMonitor = {
  failedAttempts: 0,
  lastAttemptTime: 0,
  maxAttempts: 5,
  lockoutDuration: 300000, // 5 minutes
  
  recordFailure() {
    this.failedAttempts++;
    this.lastAttemptTime = Date.now();
  },
  
  canAttempt(): boolean {
    if (this.failedAttempts < this.maxAttempts) return true;
    
    const timeSinceLastAttempt = Date.now() - this.lastAttemptTime;
    if (timeSinceLastAttempt > this.lockoutDuration) {
      this.reset();
      return true;
    }
    
    return false;
  },
  
  reset() {
    this.failedAttempts = 0;
    this.lastAttemptTime = 0;
  }
};

if (browser) {
  try {
    if (!validateFirebaseConfig(firebaseConfig)) {
      throw new Error('Invalid Firebase configuration');
    }

    // Use existing app if already initialized to avoid errors
    if (getApps().length === 0) {
      console.log('[Firebase] Initializing app...');
      app = initializeApp(firebaseConfig);
      console.log('[Firebase] App initialized successfully');
    } else {
      app = getApp();
      console.log('[Firebase] Using existing Firebase app instance');
    }

    auth = getAuth(app);
    db = getFirestore(app);
  } catch (error) {
    console.error('[Firebase] Initialization error:', error);
    auth = undefined;
    db = undefined;
  }
}

// Type guards
export function isFirebaseReady(): boolean {
  return browser && auth !== undefined && db !== undefined;
}

export function getFirebaseAuth(): Auth {
  if (!auth) {
    throw new Error('Firebase Auth is not initialized');
  }
  
  // Check security monitor for auth operations
  if (!securityMonitor.canAttempt()) {
    throw new Error('Too many failed attempts. Please try again later.');
  }
  
  return auth;
}

export function getFirebaseDb(): Firestore {
  if (!db) {
    throw new Error('Firebase Firestore is not initialized');
  }
  return db;
}

// Export with type safety
export { auth, db };