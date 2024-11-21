// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, UserCredential, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKKd334a4J3Van6VO59KnwPNyRQO7-coo",
  authDomain: "mystock-management.firebaseapp.com",
  projectId: "mystock-management",
  storageBucket: "mystock-management.appspot.com",
  messagingSenderId: "508070163710",
  appId: "1:508070163710:web:12c9373b7277eb1f7661af",
  measurementId: "G-5ZVSX37KT4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const userAuth = auth.currentUser;
auth.languageCode = 'en';

export const provider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app)