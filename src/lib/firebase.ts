// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  projectId: "fluentmind-ai-tutor",
  appId: "1:1051421878783:web:23c96fbdbef71dd09e9fca",
  storageBucket: "fluentmind-ai-tutor.firebasestorage.app",
  apiKey: "AIzaSyDRLH6GR3nDBn1En8DWGgW7x9nW6Hc4JCM",
  authDomain: "fluentmind-ai-tutor.firebaseapp.com",
  messagingSenderId: "1051421878783",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
