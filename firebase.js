// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBf6721C4LLhYRcmwgOQbdqQgOiDLzDPhk",
  authDomain: "reuse-b676c.firebaseapp.com",
  projectId: "reuse-b676c",
  storageBucket: "reuse-b676c.appspot.com",
  messagingSenderId: "872063001296",
  appId: "1:872063001296:web:5d06ed6e548fa117fe74d5",
  measurementId: "G-0N6NYHQCTG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);