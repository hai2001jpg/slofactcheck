// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCF-CGrfWVV7zINa9nLwCS77FvX6soE0nw",
  authDomain: "slofactcheck.firebaseapp.com",
  projectId: "slofactcheck",
  storageBucket: "slofactcheck.firebasestorage.app",
  messagingSenderId: "960062162889",
  appId: "1:960062162889:web:58abbf751f29b68b624a18",
  measurementId: "G-1Y6J0SN5L3"
};

// Initialize Firebase
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };