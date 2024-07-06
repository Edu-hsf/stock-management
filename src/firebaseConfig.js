// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

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

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const userAuth = auth.currentUser;
auth.languageCode = 'en';

export const provider = new GoogleAuthProvider();

export const db = getFirestore(app);

export const signInWithGoogle = async () => {
  let user = null
  await signInWithPopup(auth, provider)
    .then(result => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      user = credential;

    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

    });

  return user
}

export const signUpAuth = (email, password, name) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      updateProfile(user, {
        displayName: name
      })
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

export const signInAuth = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

export const logout = signOut(auth).then(() => {
  return res
}).catch((error) => {

});
