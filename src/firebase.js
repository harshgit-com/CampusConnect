import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'

// Firebase web-app configuration. These values identify the Firebase project;
// access is controlled by Firebase Authentication settings and Security Rules.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyDL6cp2f_1-ihjwUTA4XATcXAYmnIkEb80',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'campusconnect-907f0.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'campusconnect-907f0',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'campusconnect-907f0.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '639172659534',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:639172659534:web:558cb76fc7a1576b4a761f',
}

export const firebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.authDomain && firebaseConfig.projectId && firebaseConfig.appId
)

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig)

export const auth = getAuth(app)
