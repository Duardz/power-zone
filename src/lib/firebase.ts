import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { browser } from '$app/environment';

// Use optional chaining and provide defaults for build time
const firebaseConfig = {
  apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY || "dummy-api-key",
  authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN || "dummy-auth-domain",
  projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID || "dummy-project-id",
  storageBucket: import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET || "dummy-storage-bucket",
  messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "dummy-sender-id",
  appId: import.meta.env.PUBLIC_FIREBASE_APP_ID || "dummy-app-id"
};

// Initialize Firebase only in browser
const app = browser ? initializeApp(firebaseConfig) : {};
const auth = browser ? getAuth(app as any) : {};
const db = browser ? getFirestore(app as any) : {};

export { auth, db };