import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAYr7GmvZLFNqDpRQprB1qJT3jqD0lHO0c",
  authDomain: "project-management-5f250.firebaseapp.com",
  projectId: "project-management-5f250",
  storageBucket: "project-management-5f250.appspot.com",
  messagingSenderId: "504172795267",
  appId: "1:504172795267:web:25f1ec8362e21e2e96d2b6",
  measurementId: "G-J2LK6MMDWD",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Authentication
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

// Database
export const db = getFirestore(app);
