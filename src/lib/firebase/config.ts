import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCTFO3bUIMq87wk934u4yABRPX51bvvz_0",
  authDomain: "crm-project-96c97.firebaseapp.com",
  projectId: "crm-project-96c97",
  storageBucket: "crm-project-96c97.firebasestorage.app",
  messagingSenderId: "552382244898",
  appId: "1:552382244898:web:088900275632275451c27b",
  measurementId: "G-6KL4YR9H3M"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;