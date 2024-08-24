import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAf7L8JKGp7R7bxmQlq7WXT-KFPH8dd81A",
  authDomain: "test-vue-registration.firebaseapp.com",
  projectId: "test-vue-registration",
  storageBucket: "test-vue-registration.appspot.com",
  messagingSenderId: "447436341358",
  appId: "1:447436341358:web:319ddf4ecea6c8bb5f667f",
  measurementId: "G-SW6PWE1WT0"
};

const app = initializeApp(firebaseConfig);

// Export authentication and Firestore services
export const auth = getAuth(app);
export const db = getFirestore(app);
export { GoogleAuthProvider, signInWithPopup, doc, setDoc, getDoc };