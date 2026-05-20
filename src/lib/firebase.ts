import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCDGEv-IuWAeXkMZEBVGLTiNm1E0kRL9WM",
  authDomain: "wedplanner-timeline.firebaseapp.com",
  projectId: "wedplanner-timeline",
  storageBucket: "wedplanner-timeline.firebasestorage.app",
  messagingSenderId: "170405071637",
  appId: "1:170405071637:web:5244fe1962e2c4bb20371c",
  measurementId: "G-SWJZP9BF5N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
