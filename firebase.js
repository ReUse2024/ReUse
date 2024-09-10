// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-analytics.js';

// Your web app's Firebase configuration
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
