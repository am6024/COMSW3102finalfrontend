import firebase from "firebase/compat/app";
import "firebase/compat/auth";


const firebaseConfig = {
    apiKey: "AIzaSyCBYySVjhe-NtVqruXYY4Kp6lGvFUw9wrk",
    authDomain: "comsw3102-final.firebaseapp.com",
    projectId: "comsw3102-final",
    storageBucket: "comsw3102-final.appspot.com",
    messagingSenderId: "374148711772",
    appId: "1:374148711772:web:3f0bf56221f9e790f9ad99",
    measurementId: "G-NSPZF6R4N8"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider);
}