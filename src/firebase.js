import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Copy your project configs from Firebase and paste to replace everything between the dashed lines

// ----------------------------------------------------
const firebaseConfig = {
  apiKey: YOUR_API_KEY,
  authDomain: YOUR_AUTH_DOMAIN,
  projectId: YOUR_PROJECT_ID,
  storageBucket: YOUR_STORAGE_BUCKET,
  messagingSenderId: YOUR_MESSAGING_SENDER_ID,
  appId: YOUR_APP_ID,
  measurementId: YOUR_MEASUREMENT_ID,
};
// -----------------------------------------------------

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Authentication
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

// Database
export const db = getFirestore(app);
